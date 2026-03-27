import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, RotateCcw, Info, CheckCheck, Zap, Shield, Wrench, Package, MapPin, CreditCard, Clock, Sun, Moon, FileText, Play, Volume2, Download, Smartphone } from 'lucide-react';
import { CHAT_SCRIPT, ChatMessage, QuickReply } from '../../services/chatScript';
import { identifyIntent, getResponseForIntent } from '../../services/chatbotLogic';

// ─── Constants ─────────────────────────────────────────────────────────────────

const STORAGE_KEY        = 'lk_chatbot_history';
const SESSION_KEY        = 'lk_chatbot_session_id';
const SESSION_MS         = 30 * 60 * 1000;
const MIN_DELAY_MS       = 700;
const MAX_DELAY_MS       = 2000;
const MAX_INPUT          = 500;
const INPUT_THROTTLE_MS  = 2000;
const MAX_HISTORY        = 20;

// Drag threshold in px — movement below this is treated as a tap, not a drag
const DRAG_THRESHOLD_PX  = 8;
// Min velocity (px/ms) to trigger inertia scroll
const MIN_INERTIA_VEL    = 0.3;

const IconMap: Record<string, React.ElementType> = {
  Wrench, Package, MapPin, CreditCard, Clock, Shield, Zap, FileText, RotateCcw, Smartphone, Download,
};

// ─── Session & Logging ──────────────────────────────────────────────────────────

const getSessionId = (): string => {
  let sid = localStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
};

const chatLog = (action: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const sessionId = getSessionId();
  console.log(`[${timestamp}] [${sessionId}] CHATBOT: ${action}`, data || '');
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

const uid    = () => `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
const clamp  = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const typeMs = (t: string) => clamp(t.length * 11, MIN_DELAY_MS, MAX_DELAY_MS);
const fmt    = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const build = (msg: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage => ({
  ...msg, id: uid(), timestamp: new Date(),
});

const loadHistory = (): ChatMessage[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const history = JSON.parse(stored) as ChatMessage[];
    chatLog('history_loaded', { count: history.length });
    return history;
  } catch (err) {
    chatLog('history_load_error', err instanceof Error ? err.message : String(err));
    return null;
  }
};

const persist = (msgs: ChatMessage[]) => {
  try {
    const toStore = msgs.slice(-MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    chatLog('history_saved', { count: toStore.length });
  } catch (err) {
    chatLog('history_save_error', err instanceof Error ? err.message : String(err));
  }
};

const validateInput = (text: string): { valid: boolean; reason?: string } => {
  if (!text || !text.trim()) return { valid: false, reason: 'empty' };
  if (text.length > MAX_INPUT) return { valid: false, reason: 'too_long' };
  return { valid: true };
};

// ─── Typing dots ───────────────────────────────────────────────────────────────

const TypingDots = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    className="flex items-end gap-2 sm:gap-3"
  >
    <div className="lk-avatar" style={{ width: '24px', height: '24px', minWidth: '24px' }}>
      <Bot size={12} className="text-black" />
    </div>
    <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-4 rounded-2xl rounded-tl-sm lk-bubble-bot" style={{ background: 'rgba(255,255,255,0.08)' }}>
      {[0, 0.15, 0.3].map((d, i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
          style={{ background: 'var(--lk-green)' }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1, delay: d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  </motion.div>
));
TypingDots.displayName = 'TypingDots';

// ─── Notice pill ───────────────────────────────────────────────────────────────

const Notice = memo(({ text }: { text: string }) => (
  <div className="flex justify-center my-0.5 sm:my-1">
    <div className="lk-notice">
      <Info size={8} className="sm:size-[9px]" style={{ color: 'var(--lk-muted)' }} />
      <span style={{ color: 'var(--lk-muted)' }} className="text-[7px] sm:text-[9px] uppercase tracking-[0.18em] font-semibold">{text}</span>
    </div>
  </div>
));
Notice.displayName = 'Notice';

// ─── Inline table ──────────────────────────────────────────────────────────────

const MsgTable = memo(({ table }: { table: NonNullable<ChatMessage['table']> }) => (
  <div className="mt-2 sm:mt-3 rounded-xl overflow-hidden lk-table-wrap">
    <table className="w-full text-[9px] sm:text-[11px] border-collapse">
      <thead>
        <tr className="lk-table-head">
          {table.headers.map((h, i) => (
            <th key={i} className="py-1.5 sm:py-2 px-2 sm:px-3 text-left font-bold uppercase tracking-widest lk-table-th text-[7px] sm:text-[9px]">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, i) => (
          <tr key={i} className={i < table.rows.length - 1 ? 'lk-table-row' : ''}>
            {row.map((cell, j) => (
              <td key={j} className="py-1.5 sm:py-2.5 px-2 sm:px-3 font-medium lk-table-td text-[7px] sm:text-[9px]">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));
MsgTable.displayName = 'MsgTable';

// ─── Bubble ────────────────────────────────────────────────────────────────────

const Bubble = memo(({ msg, onFormSubmit, onMediaLoad }: { msg: ChatMessage; onFormSubmit?: (data: any) => void; onMediaLoad?: () => void }) => {
  const isUser = msg.type === 'user';

  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, li) => {
      if (line.trim().startsWith('- ')) {
        return (
          <div key={li} className="flex gap-2 ml-1 my-1">
            <span className="text-[#00e5a0] mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--lk-green)' }} />
            <span>{renderLine(line.slice(2))}</span>
          </div>
        );
      }
      return <div key={li}>{renderLine(line)}</div>;
    });
  };

  const renderLine = (line: string) => {
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        return <em key={i} className="italic opacity-90">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-[12px] font-mono opacity-90">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={`flex items-end gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && (
        <div className="lk-avatar" style={{ width: 32, height: 32 }}>
          <Bot size={15} className="text-black" />
        </div>
      )}

      <div className={`flex flex-col max-w-[82%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={isUser ? 'lk-bubble-user' : 'lk-bubble-bot'} style={{
          padding: 'clamp(10px, 2vw, 14px) clamp(12px, 3vw, 18px)',
          boxShadow: isUser ? '0 10px 25px -5px rgba(0,229,160,0.3)' : '0 10px 25px -5px rgba(0,0,0,0.2)'
        }}>
          <div className="whitespace-pre-wrap break-words text-[13px] sm:text-[14px] leading-[1.6] font-medium">
            {renderContent(msg.content)}
          </div>

          {msg.image && (
            <div className="mt-4 rounded-xl overflow-hidden border border-white/5 shadow-lg">
              <img src={msg.image} alt="Anexo" loading="lazy" className="w-full h-auto" referrerPolicy="no-referrer" onLoad={onMediaLoad} />
            </div>
          )}

          {msg.video && (
            <div className="mt-4 rounded-xl overflow-hidden border border-white/5 bg-black/40 aspect-video flex items-center justify-center relative group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Play size={20} fill="white" className="ml-1" />
                </div>
              </div>
              <video src={msg.video} className="w-full h-full object-cover" />
            </div>
          )}

          {msg.audio && (
            <div className="mt-4 p-3 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00e5a0]/20 flex items-center justify-center">
                <Volume2 size={18} className="text-[#00e5a0]" />
              </div>
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#00e5a0]" />
              </div>
              <span className="text-[10px] font-bold opacity-40">0:42</span>
            </div>
          )}

          {msg.file && (
            <div className="mt-4 p-3 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between gap-3 group hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <FileText size={18} className="text-white/60" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-white/90">{msg.file.name}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">{msg.file.size}</p>
                </div>
              </div>
              <Download size={16} className="text-white/20 group-hover:text-[#00e5a0] transition-colors" />
            </div>
          )}

          {msg.table && <MsgTable table={msg.table} />}

          {msg.form && (
            <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/5 space-y-3">
              {msg.form.fields.map((f, i) => (
                <div key={i} className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder="..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#00e5a0]/50 transition-colors"
                  />
                </div>
              ))}
              <button
                onClick={() => onFormSubmit?.({})}
                className="w-full py-2.5 rounded-lg bg-[#00e5a0] text-black font-bold text-[12px] uppercase tracking-widest hover:brightness-110 transition-all active:scale-[0.98]"
              >
                {msg.form.submitLabel}
              </button>
            </div>
          )}
        </div>

        <div className={`flex items-center gap-1.5 mt-2 lk-ts ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-[9px] font-bold uppercase tracking-wider">{fmt(new Date(msg.timestamp))}</span>
          {isUser ? <CheckCheck size={10} className="text-[#00e5a0]" /> : <CheckCheck size={10} />}
        </div>
      </div>
    </motion.div>
  );
});
Bubble.displayName = 'Bubble';

// ─── Chips ─────────────────────────────────────────────────────────────────────
// FIX: Separamos completamente a lógica de drag do track da lógica de clique
// dos botões. O drag fica no track wrapper, os botões têm seus próprios handlers
// e verificam se houve drag antes de disparar onSelect.

const Chips = memo(({ replies, onSelect }: { replies: QuickReply[]; onSelect: (r: QuickReply) => void }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Estado de drag armazenado em ref para evitar re-renders
  const ds = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    lastX: 0,
    lastTime: 0,
    velocities: [] as number[],
    didDrag: false,       // FIX: flag consultada pelos botões antes de disparar onSelect
    rafId: null as number | null,
  });

  const cancelMomentum = useCallback(() => {
    if (ds.current.rafId !== null) {
      cancelAnimationFrame(ds.current.rafId);
      ds.current.rafId = null;
    }
    ds.current.velocities = [];
  }, []);

  const applyInertia = useCallback((avgVel: number) => {
    if (Math.abs(avgVel) < MIN_INERTIA_VEL) return;
    cancelMomentum();

    const duration = 650;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const vel = avgVel * (1 - eased);

      if (Math.abs(vel) > 0.04 && trackRef.current) {
        trackRef.current.scrollLeft -= vel;
        ds.current.rafId = requestAnimationFrame(step);
      } else {
        ds.current.rafId = null;
      }
    };

    ds.current.rafId = requestAnimationFrame(step);
  }, [cancelMomentum]);

  // FIX: handlers no track wrapper (não nos botões)
  const onTrackPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Ignora cliques com botão direito do mouse
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const track = trackRef.current;
    if (!track) return;

    cancelMomentum();

    const s = ds.current;
    s.active = true;
    s.startX = e.clientX;
    s.lastX = e.clientX;
    s.lastTime = performance.now();
    s.startScrollLeft = track.scrollLeft;
    s.velocities = [];
    s.didDrag = false; // FIX: reset a cada novo gesto

    // FIX: NÃO capturamos o pointer no track — deixamos os botões receberem seus eventos
  }, [cancelMomentum]);

  const onTrackPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = ds.current;
    const track = trackRef.current;
    if (!s.active || !track) return;

    const now = performance.now();
    const dt = Math.max(now - s.lastTime, 1);
    const totalDx = e.clientX - s.startX;
    const frameDx = e.clientX - s.lastX;

    // Só considera drag se passou do threshold
    if (!s.didDrag && Math.abs(totalDx) > DRAG_THRESHOLD_PX) {
      s.didDrag = true;
    }

    if (s.didDrag) {
      // FIX: preventDefault só quando realmente arrastando, para não bloquear tap em mobile
      e.preventDefault();
      track.scrollLeft = s.startScrollLeft - totalDx;

      s.velocities.push(frameDx / dt);
      if (s.velocities.length > 7) s.velocities.shift();
    }

    s.lastX = e.clientX;
    s.lastTime = now;
  }, []);

  const onTrackPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = ds.current;
    if (!s.active) return;

    if (s.didDrag && s.velocities.length > 0) {
      const recent = s.velocities.slice(-5);
      const avgVel = recent.reduce((a, b) => a + b, 0) / recent.length;
      applyInertia(avgVel);
    }

    s.active = false;
    // FIX: NÃO resetamos didDrag aqui — o botão ainda precisa checar no seu onClick
    // O reset acontece no próximo pointerDown
  }, [applyInertia]);

  // FIX: handler de clique nos botões verifica didDrag antes de disparar
  const handleChipClick = useCallback((e: React.MouseEvent, r: QuickReply) => {
    if (ds.current.didDrag) {
      // Era um drag, não um tap — ignora o clique
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onSelect(r);
  }, [onSelect]);

  return (
    <div
      className="flex flex-col items-start w-full lk-chips-wrap py-2 select-none"
      role="group"
      aria-label="Opções rápidas"
      // FIX: handlers no wrapper externo para capturar movimento antes dos botões
      onPointerDown={onTrackPointerDown}
      onPointerMove={onTrackPointerMove}
      onPointerUp={onTrackPointerUp}
      onPointerCancel={onTrackPointerUp}
    >
      <div
        ref={trackRef}
        className="flex gap-2 w-full overflow-x-auto px-2 py-1.5 lk-chips-track"
        style={{
          WebkitOverflowScrolling: 'touch',
          userSelect: 'none',
          // FIX: 'pan-x' permite scroll horizontal nativo E ainda deixa o tap funcionar.
          // Não usamos 'manipulation' pois pode suprimir o scroll customizado.
          touchAction: 'pan-x',
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
        }}
      >
        {replies.map((r) => {
          const Icon = r.icon ? IconMap[r.icon] : null;
          const isPrimary = r.action === 'link' || r.icon === 'Zap';

          return (
            <motion.button
              key={r.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              // FIX: onClick verifica didDrag internamente
              onClick={(e) => handleChipClick(e, r)}
              className={`lk-chip flex-none flex flex-col items-center justify-center gap-1 p-2 text-center ${isPrimary ? 'lk-chip-primary' : ''}`}
              style={{
                minWidth: 'clamp(60px, 14vw, 114px)',
                maxWidth: '114px',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                // FIX: 'auto' aqui garante que o botão receba o clique normalmente
                touchAction: 'auto',
                WebkitTapHighlightColor: 'transparent',
              }}
              draggable={false}
            >
              {Icon && <Icon size={14} strokeWidth={isPrimary ? 2.5 : 2} className="flex-shrink-0" />}
              <span className="font-semibold text-[clamp(8px,2vw,9.5px)] leading-tight break-words w-full line-clamp-2">
                {r.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});
Chips.displayName = 'Chips';

// ─── Toggle button ─────────────────────────────────────────────────────────────

const Toggle = memo(({ isOpen, hasNew, onClick }: {
  isOpen: boolean; hasNew: boolean; onClick: () => void;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      return;
    }
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, [isOpen]);

  return (
    <div className="relative flex items-center justify-end">
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute right-[calc(100%+16px)] whitespace-nowrap bg-white text-black px-4 py-3 rounded-2xl rounded-br-sm shadow-2xl font-medium text-sm flex items-center gap-3 cursor-pointer border border-black/5"
            onClick={onClick}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-display font-bold tracking-tight">Posso ajudar?</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onClick}
        onMouseEnter={() => !isOpen && setShowTooltip(true)}
        onMouseLeave={() => !isOpen && setShowTooltip(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? 'Fechar chat' : 'Abrir suporte'}
        className={`lk-toggle ${isOpen ? 'is-open' : ''}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? 'x' : 'z'}
            initial={{ opacity: 0, rotate: isOpen ? -90 : 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: isOpen ? 90 : -90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {isOpen
              ? <span className="text-white/60 text-xl font-light leading-none">✕</span>
              : <Zap size={24} className="text-black" fill="currentColor" />
            }
          </motion.div>
        </AnimatePresence>

        {hasNew && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="lk-notif-dot"
          />
        )}
      </motion.button>
    </div>
  );
});
Toggle.displayName = 'Toggle';

// ─── Main component ────────────────────────────────────────────────────────────

export const Chatbot = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [theme,    setTheme]    = useState<'dark' | 'light'>('dark');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input,    setInput]    = useState('');
  const scrollRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);
  const initialized             = useRef(false);
  const lastMessageTime         = useRef<number>(0);

  const scrollDown = useCallback((b: ScrollBehavior = 'auto') => {
    if (!scrollRef.current) return;
    const { scrollHeight, clientHeight } = scrollRef.current;
    scrollRef.current.scrollTo({ top: scrollHeight - clientHeight, behavior: b });
  }, []);

  useEffect(() => {
    scrollDown('auto');
    const t = setTimeout(() => scrollDown('smooth'), 100);
    return () => clearTimeout(t);
  }, [messages, isTyping, scrollDown]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (window.innerWidth > 768) inputRef.current?.focus();
        scrollDown('auto');
      }, 320);
    }
  }, [isOpen, scrollDown]);

  const push = useCallback((msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    setMessages(p => [...p, build(msg)]);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const botReply = useCallback(async (stepId: string) => {
    try {
      chatLog('bot_reply_start', { stepId });
      setIsTyping(true);
      const step = CHAT_SCRIPT[stepId] ?? CHAT_SCRIPT['start'];
      await new Promise(r => setTimeout(r, typeMs(step.message)));
      setIsTyping(false);
      push({
        type:         'bot',
        content:      step.message,
        image:        step.image,
        video:        step.video,
        audio:        step.audio,
        file:         step.file,
        quickReplies: step.quickReplies,
        table:        step.table,
        form:         step.form,
      });
      chatLog('bot_reply_done', { stepId });
    } catch (err) {
      chatLog('bot_reply_error', err instanceof Error ? err.message : String(err));
      setIsTyping(false);
      push({
        type:         'bot',
        content:      'Oops, algo deu errado 😅 Tenta denovo!',
        quickReplies: CHAT_SCRIPT['start'].quickReplies,
      });
    }
  }, [push]);

  const reset = useCallback(() => {
    setMessages([]);
    botReply('start');
  }, [botReply]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const history = loadHistory();
    if (history && history.length > 0) {
      setMessages(history);
      chatLog('history_restored', { count: history.length });
    } else {
      reset();
    }
  }, [reset]);

  useEffect(() => {
    if (messages.length > 0) persist(messages);
  }, [messages]);

  // FIX: ordem correta — push do usuário SEMPRE primeiro, depois ação do bot
  const onChip = useCallback((r: QuickReply) => {
    chatLog('quick_reply_selected', { action: r.action, id: r.id, analytics: r.analytics });
    lastMessageTime.current = Date.now();

    // 1. Mensagem do usuário aparece primeiro, sempre
    push({ type: 'user', content: r.label });

    // 2. Depois processamos a ação
    switch (r.action) {
      case 'message':
        botReply(r.value);
        break;
      case 'form':
        // FIX: form também usa botReply normalmente após push do usuário
        botReply(r.value);
        break;
      case 'link':
        window.open(r.value, '_blank', 'noopener,noreferrer');
        push({ type: 'system', content: `Abrindo ${r.label}…` });
        break;
      case 'phone':
        window.location.href = `tel:${r.value}`;
        push({ type: 'system', content: `Chamando ${r.label}…` });
        break;
      case 'email':
        window.location.href = `mailto:${r.value}`;
        push({ type: 'system', content: `Abrindo cliente de e-mail…` });
        break;
      case 'reset':
        reset();
        break;
      default:
        botReply('start');
    }
  }, [push, botReply, reset]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();

    const validation = validateInput(text);
    if (!validation.valid) {
      if (validation.reason === 'empty') return;
      if (validation.reason === 'too_long') {
        chatLog('input_validation_failed', { reason: 'too_long', length: text.length });
        return;
      }
    }

    const now = Date.now();
    if (now - lastMessageTime.current < INPUT_THROTTLE_MS) {
      chatLog('input_throttled', { gap_ms: now - lastMessageTime.current });
      return;
    }
    lastMessageTime.current = now;

    if (isTyping) return;

    push({ type: 'user', content: text });
    chatLog('message_sent', { length: text.length });
    setInput('');

    const intent = identifyIntent(text);
    chatLog('intent_identified', { intent });

    if (intent) {
      botReply(getResponseForIntent(intent));
    } else {
      setTimeout(() => push({
        type:         'bot',
        content:      'Não entendi bem 🤔 Escolhe uma opção abaixo!',
        quickReplies: CHAT_SCRIPT['start'].quickReplies,
      }), 380);
      chatLog('fallback_triggered', { reason: 'no_intent' });
    }
  }, [input, isTyping, push, botReply]);

  const onClear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    chatLog('history_cleared', {});
    reset();
  }, [reset]);

  const lastReplies = (() => {
    if (isTyping) return null;
    const last = messages[messages.length - 1];
    if (last?.type !== 'bot' || !last?.quickReplies?.length) return null;

    let replies = [...last.quickReplies];

    const isMainMenu = last.content?.includes('Como podemos ajudar você hoje') ||
                       last.content?.includes('Sistema Inteligente de Atendimento');

    if (!isMainMenu) {
      const hasBack = replies.some(r => r.id?.includes('menu') ||
                                       r.label?.toLowerCase().includes('menu') ||
                                       r.label?.toLowerCase().includes('inicial'));

      if (!hasBack) {
        replies.push({
          id: 'qr_menu_auto',
          label: '🏠 Menu Inicial',
          action: 'message',
          value: 'start',
          analytics: 'smart_back_menu',
        });
      }
    }

    return replies.length > 0 ? replies : null;
  })();

  const lastMessage = messages[messages.length - 1];
  const hasForm = lastMessage?.type === 'bot' && !!lastMessage.form;
  const isInputDisabled = isTyping || hasForm;

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --lk-green:     #00e5a0;
          --lk-green-dk:  #009e6e;
          --lk-bg:        rgba(11,11,14,0.98);
          --lk-surface:   rgba(255,255,255,0.055);
          --lk-border:    rgba(255,255,255,0.07);
          --lk-muted:     rgba(255,255,255,0.25);
          --lk-text:      rgba(255,255,255,0.88);
        }

        .lk-light {
          --lk-bg:        #f8f9fa;
          --lk-surface:   rgba(0,0,0,0.03);
          --lk-border:    rgba(0,0,0,0.06);
          --lk-muted:     rgba(0,0,0,0.4);
          --lk-text:      #1a1a1a;
        }

        .lk-light .lk-bubble-bot {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.05);
          color: #1a1a1a;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03) !important;
        }

        .lk-light .lk-bubble-bot strong { color: #000; }
        .lk-light .lk-ts               { color: rgba(0,0,0,0.3); }
        .lk-light .lk-header-btn       { color: rgba(0,0,0,0.4); }
        .lk-light .lk-header-btn:hover { background: rgba(0,0,0,0.05); color: #000; }
        .lk-light .lk-chips-wrap       { border-top: 1px solid rgba(0,0,0,0.04); background: rgba(0,0,0,0.01); }
        .lk-light .lk-chip             { background: #fff; border-color: rgba(0,0,0,0.08); color: #1a1a1a; }
        .lk-light .lk-chip:hover       { background: #f0f0f0; border-color: rgba(0,0,0,0.15); }
        .lk-light input                { color: #1a1a1a !important; }
        .lk-light input::placeholder   { color: rgba(0,0,0,0.3); }
        .lk-light form                 { border-top-color: rgba(0,0,0,0.05) !important; }

        .lk-root              { font-family: 'DM Sans', sans-serif; }
        .lk-syne              { font-family: 'Syne', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide       { -ms-overflow-style: none; scrollbar-width: none; }

        /* Toggle */
        @keyframes lk-pulse-glow {
          0%   { box-shadow: 0 0 0 0   rgba(0,229,160,0.4); }
          70%  { box-shadow: 0 0 0 15px rgba(0,229,160,0); }
          100% { box-shadow: 0 0 0 0   rgba(0,229,160,0); }
        }
        .lk-toggle {
          position: relative;
          width: 60px; height: 60px;
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(145deg, var(--lk-green) 0%, var(--lk-green-dk) 100%);
          box-shadow: 0 12px 38px rgba(0,229,160,0.45), 0 0 0 1px rgba(0,229,160,0.2);
          border: none; cursor: pointer; outline: none;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          animation: lk-pulse-glow 2.5s infinite;
        }
        @media (min-width: 640px) {
          .lk-toggle { width: 74px; height: 74px; border-radius: 24px; }
        }
        .lk-toggle:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 40px rgba(0,229,160,0.5), 0 0 0 1px rgba(0,229,160,0.3);
          animation: none;
        }
        .lk-toggle.is-open {
          background: rgba(255,255,255,0.06);
          box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
          animation: none;
          border-radius: 50%;
        }
        .lk-notif-dot {
          position: absolute; top: 6px; right: 6px;
          width: 10px; height: 10px; border-radius: 50%;
          background: white;
          border: 2px solid var(--lk-green-dk);
        }

        /* Avatars */
        .lk-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, var(--lk-green) 0%, var(--lk-green-dk) 100%);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0,229,160,0.25);
        }

        /* Bubbles */
        .lk-bubble-bot {
          padding: 12px 16px;
          background: var(--lk-surface);
          border: 1px solid var(--lk-border);
          border-radius: 18px; border-top-left-radius: 5px;
          color: var(--lk-text);
          backdrop-filter: blur(20px);
        }
        .lk-bubble-user {
          padding: 12px 16px;
          background: linear-gradient(135deg, var(--lk-green) 0%, var(--lk-green-dk) 100%);
          border-radius: 18px; border-bottom-right-radius: 5px;
          color: #000;
          box-shadow: 0 6px 20px rgba(0,229,160,0.25);
        }

        .lk-ts     { opacity: 0.22; color: white; }
        .lk-notice {
          display: flex; align-items: center; gap: 6px;
          padding: 4px 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 999px;
        }

        /* Table */
        .lk-table-wrap { border: 1px solid var(--lk-border); background: rgba(0,0,0,0.3); }
        .lk-table-head { border-bottom: 1px solid var(--lk-border); background: rgba(255,255,255,0.03); }
        .lk-table-th   { color: var(--lk-muted); }
        .lk-table-row  { border-bottom: 1px solid rgba(255,255,255,0.04); }
        .lk-table-td   { color: var(--lk-text); }

        /* Chips */
        .lk-chips-wrap {
          border-top: 1px solid var(--lk-border);
          background: rgba(0,0,0,0.2);
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .lk-chips-track {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
          overscroll-behavior-x: contain;
          will-change: scroll-position;
          transform: translateZ(0);
        }
        .lk-chips-track::-webkit-scrollbar       { height: 3px; }
        .lk-chips-track::-webkit-scrollbar-track { background: transparent; }
        .lk-chips-track::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
        }

        .lk-chip {
          padding: 8px 12px;
          border-radius: 12px;
          font-size: clamp(8px, 2vw, 9.5px);
          font-weight: 700;
          color: var(--lk-text);
          border: 1px solid var(--lk-border);
          background: rgba(255,255,255,0.05);
          white-space: normal;
          cursor: pointer;
          outline: none;
          transition: all 0.15s ease;
          font-family: 'DM Sans', sans-serif;
          backdrop-filter: blur(12px);
          min-width: clamp(60px, 14vw, 114px);
          max-width: 114px;
          justify-content: center;
          user-select: none;
          -webkit-user-select: none;
          text-transform: capitalize;
          letter-spacing: 0.03em;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: auto;
          pointer-events: auto;
        }
        .lk-chip:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.35);
          color: #fff;
          box-shadow: 0 8px 20px -4px rgba(255,255,255,0.1);
        }
        .lk-chip:active { transform: scale(0.96); }

        .lk-chip-primary {
          background: linear-gradient(135deg, rgba(0,229,160,0.15) 0%, rgba(0,229,160,0.08) 100%);
          border-color: rgba(0,229,160,0.4);
          color: var(--lk-green);
          font-weight: 800;
        }
        .lk-chip-primary:hover {
          background: linear-gradient(135deg, rgba(0,229,160,0.22) 0%, rgba(0,229,160,0.14) 100%);
          border-color: rgba(0,229,160,0.6);
          box-shadow: 0 10px 24px -4px rgba(0,229,160,0.3);
        }

        @media (max-width: 480px) {
          .lk-chip { padding: 6px 10px; gap: 3px; }
          .lk-chips-track::-webkit-scrollbar { height: 2px; }
        }
      `}</style>

      <div className={`fixed bottom-4 right-4 z-[220] lk-root ${theme === 'light' ? 'lk-light' : ''}`}>

        <Toggle isOpen={isOpen} hasNew={messages.length === 0} onClick={() => setIsOpen(p => !p)} />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="dialog"
              aria-label="Suporte LK Imports"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              style={{
                position:        'absolute',
                bottom:          '70px',
                right:           0,
                width:           'min(390px, calc(100vw - 2rem))',
                height:          'min(610px, 83vh)',
                display:         'flex',
                flexDirection:   'column',
                background:      theme === 'light' ? '#f8f9fa' : 'linear-gradient(160deg, rgba(14,14,18,0.97) 0%, rgba(9,9,12,0.99) 100%)',
                border:          theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius:    '22px',
                boxShadow:       theme === 'light' ? '0 28px 70px -8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,1)' : '0 28px 70px -8px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.07)',
                backdropFilter:  'blur(48px)',
                overflow:        'hidden',
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 12px 12px 14px',
                borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
                gap: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: 'linear-gradient(135deg, #00e5a0 0%, #009e6e 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 18px rgba(0,229,160,0.3)',
                    }}>
                      <Zap size={16} style={{ color: '#000' }} fill="#000" />
                    </div>
                    <span style={{
                      position: 'absolute', bottom: -2, right: -2,
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: '#00e5a0', border: theme === 'light' ? '2px solid #fff' : '2px solid #0d0d11',
                    }} />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <p className="lk-syne" style={{ color: theme === 'light' ? '#111' : 'white', fontSize: '12px', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.01em' }}>
                      LK Imports
                    </p>
                    <p style={{ color: '#00e5a0', fontSize: '8px', fontWeight: 600, marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1 }}>
                      Online
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                  <button
                    onClick={toggleTheme}
                    title="Alternar Tema"
                    style={{
                      width: '28px', height: '28px', borderRadius: '6px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.2)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = theme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = theme === 'light' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.6)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.2)'; }}
                  >
                    {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
                  </button>

                  <button
                    onClick={onClear}
                    title="Reiniciar conversa"
                    style={{
                      width: '28px', height: '28px', borderRadius: '6px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: 'rgba(255,255,255,0.2)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.2)'; }}
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={scrollRef}
                className="scrollbar-hide"
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  overscrollBehavior: 'contain'
                }}
              >
                {messages.length === 0 && !isTyping && (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.12 }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={18} style={{ color: 'white' }} />
                    </div>
                    <p className="lk-syne" style={{ color: 'white', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Iniciando…</p>
                  </div>
                )}

                {messages.map(msg =>
                  msg.type === 'system'
                    ? <Notice key={msg.id} text={msg.content} />
                    : <Bubble key={msg.id} msg={msg} onFormSubmit={() => botReply('agradecimento_feedback')} onMediaLoad={() => scrollDown('smooth')} />
                )}

                <AnimatePresence>
                  {isTyping && <TypingDots />}
                </AnimatePresence>
              </div>

              {/* Quick Replies */}
              <AnimatePresence>
                {lastReplies && (
                  <motion.div
                    key="chips"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Chips replies={lastReplies} onSelect={onChip} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Area */}
              <div style={{
                flexShrink: 0,
                padding: '10px 12px 12px',
                borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.06)',
                background: theme === 'light' ? '#f8f9fa' : 'transparent',
              }}>
                <form onSubmit={onSubmit} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: theme === 'light' ? '#fff' : 'rgba(255,255,255,0.05)',
                  border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '5px 5px 5px 12px',
                  opacity: isInputDisabled ? 0.6 : 1,
                  transition: 'all 0.2s',
                  boxShadow: theme === 'light' ? '0 2px 6px rgba(0,0,0,0.02)' : 'none',
                  cursor: isInputDisabled ? 'not-allowed' : 'text',
                  minHeight: '40px',
                }}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={isInputDisabled}
                    placeholder={isTyping ? "Aguarde..." : hasForm ? "Form acima..." : "Mensagem..."}
                    aria-label="Mensagem"
                    style={{
                      flex: 1, minWidth: 0,
                      background: 'transparent',
                      border: 'none', outline: 'none',
                      color: theme === 'light' ? '#1a1a1a' : 'rgba(255,255,255,0.88)',
                      fontSize: '12px', fontWeight: 500,
                      fontFamily: 'DM Sans, sans-serif',
                      caretColor: '#00e5a0',
                      pointerEvents: isInputDisabled ? 'none' : 'auto',
                    }}
                  />

                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isInputDisabled}
                    whileTap={{ scale: 0.88 }}
                    aria-label="Enviar"
                    style={{
                      flexShrink: 0,
                      width: '32px', height: '32px', borderRadius: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: 'none',
                      cursor: input.trim() && !isInputDisabled ? 'pointer' : 'not-allowed',
                      background: input.trim() && !isInputDisabled
                        ? 'linear-gradient(135deg, #00e5a0 0%, #009e6e 100%)'
                        : (theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'),
                      boxShadow: input.trim() && !isInputDisabled ? '0 4px 14px rgba(0,229,160,0.4)' : 'none',
                      color: input.trim() && !isInputDisabled ? '#000' : (theme === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'),
                    }}
                  >
                    <Send size={14} />
                  </motion.button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '8px', opacity: 0.3 }}>
                  <Shield size={8} style={{ color: theme === 'light' ? '#000' : 'white' }} />
                  <span className="lk-syne" style={{ color: theme === 'light' ? '#000' : 'white', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Seguro</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
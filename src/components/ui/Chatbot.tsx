import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, RotateCcw, Info, CheckCheck, Zap, Shield, Wrench, Package, MapPin, CreditCard, Clock, Sun, Moon, FileText, Play, Volume2, Download } from 'lucide-react';
import { CHAT_SCRIPT, ChatMessage, QuickReply } from '../../services/chatScript';
import { identifyIntent, getResponseForIntent } from '../../services/chatbotLogic';

// ─── Constants ─────────────────────────────────────────────────────────────────

const STORAGE_KEY  = 'lk_chatbot_history';
const SESSION_MS   = 30 * 60 * 1000;
const MIN_DELAY_MS = 700;
const MAX_DELAY_MS = 2000;

const IconMap: Record<string, React.ElementType> = {
  Wrench, Package, MapPin, CreditCard, Clock, Shield, Zap,
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

const uid    = () => `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
const clamp  = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const typeMs = (t: string) => clamp(t.length * 11, MIN_DELAY_MS, MAX_DELAY_MS);
const fmt    = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const build = (msg: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage => ({
  ...msg, id: uid(), timestamp: new Date(),
});

const loadHistory = (): ChatMessage[] | null => null;

const persist = (msgs: ChatMessage[]) => {};

// ─── Typing dots ───────────────────────────────────────────────────────────────

const TypingDots = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    className="flex items-end gap-3"
  >
    <div className="lk-avatar" style={{ width: 32, height: 32 }}>
      <Bot size={15} className="text-black" />
    </div>
    <div className="flex items-center gap-2 px-5 py-4 rounded-2xl rounded-tl-sm lk-bubble-bot" style={{ background: 'rgba(255,255,255,0.08)' }}>
      {[0, 0.15, 0.3].map((d, i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full"
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
  <div className="flex justify-center my-1">
    <div className="lk-notice">
      <Info size={9} style={{ color: 'var(--lk-muted)' }} />
      <span style={{ color: 'var(--lk-muted)' }} className="text-[9px] uppercase tracking-[0.18em] font-semibold">{text}</span>
    </div>
  </div>
));
Notice.displayName = 'Notice';

// ─── Inline table ──────────────────────────────────────────────────────────────

const MsgTable = memo(({ table }: { table: NonNullable<ChatMessage['table']> }) => (
  <div className="mt-3 rounded-xl overflow-hidden lk-table-wrap">
    <table className="w-full text-[11px] border-collapse">
      <thead>
        <tr className="lk-table-head">
          {table.headers.map((h, i) => (
            <th key={i} className="py-2 px-3 text-left font-bold uppercase tracking-widest lk-table-th">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, i) => (
          <tr key={i} className={i < table.rows.length - 1 ? 'lk-table-row' : ''}>
            {row.map((cell, j) => (
              <td key={j} className="py-2.5 px-3 font-medium lk-table-td">{cell}</td>
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
  
  // Rich text support: **bold**, *italic*, - list
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, li) => {
      // Handle lists
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
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic opacity-90">{part.slice(1, -1)}</em>;
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
          padding: '14px 18px',
          boxShadow: isUser ? '0 10px 25px -5px rgba(0,229,160,0.3)' : '0 10px 25px -5px rgba(0,0,0,0.2)'
        }}>
          <div className="whitespace-pre-wrap break-words text-[14px] leading-[1.6] font-medium">
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

const Chips = memo(({ replies, onSelect }: { replies: QuickReply[]; onSelect: (r: QuickReply) => void }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const dragging = useRef(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    dragging.current = true;
    dragStartX.current = event.clientX;
    scrollStartX.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(event.pointerId);
    trackRef.current.style.cursor = 'grabbing';
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !trackRef.current) return;
    const dx = event.clientX - dragStartX.current;
    trackRef.current.scrollLeft = scrollStartX.current - dx;
  };

  const endDrag = () => {
    if (!trackRef.current) return;
    dragging.current = false;
    trackRef.current.style.cursor = 'grab';
  };

  return (
    <div className="flex flex-col items-start w-full lk-chips-wrap py-3">
      <div
        ref={trackRef}
        className="flex gap-2.5 w-full overflow-x-auto no-scrollbar px-3 py-2 cursor-grab"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {replies.map((r) => {
          const Icon = r.icon ? IconMap[r.icon] : null;
          const isPrimary = r.action === 'link' || r.icon === 'Zap';

          return (
            <motion.button
              key={r.id}
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(r)}
              className={`lk-chip flex-none flex flex-col items-center justify-center gap-1 p-2 text-center ${isPrimary ? 'lk-chip-primary' : ''}`}
              style={{ minWidth: '115px', maxWidth: '170px', minHeight: '58px' }}
            >
              {Icon && <Icon size={16} strokeWidth={isPrimary ? 2.5 : 2} />}
              <span className="font-semibold text-[11px] leading-tight">{r.label}</span>
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

  const scrollDown = useCallback((b: ScrollBehavior = 'auto') => {
    if (!scrollRef.current) return;
    const { scrollHeight, clientHeight } = scrollRef.current;
    scrollRef.current.scrollTo({ top: scrollHeight - clientHeight, behavior: b });
  }, []);

  // Immediate scroll on message change
  useEffect(() => {
    scrollDown('auto');
    // Second scroll after a tiny delay to catch any layout shifts (images, etc)
    const t = setTimeout(() => scrollDown('smooth'), 100);
    return () => clearTimeout(t);
  }, [messages, isTyping, scrollDown]);

  useEffect(() => { 
    if (isOpen) {
      setTimeout(() => {
        if (window.innerWidth > 768) {
          inputRef.current?.focus();
        }
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
    setIsTyping(true);
    const step = CHAT_SCRIPT[stepId] ?? CHAT_SCRIPT['start'];
    await new Promise(r => setTimeout(r, typeMs(step.message)));
    setIsTyping(false);
    push({ 
      type: 'bot', 
      content: step.message, 
      image: step.image, 
      video: step.video,
      audio: step.audio,
      file: step.file,
      quickReplies: step.quickReplies, 
      table: step.table,
      form: step.form
    });
  }, [push]);

  const reset = useCallback(() => { setMessages([]); botReply('start'); }, [botReply]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    reset();
  }, [reset]);

  // No longer persisting history
  // useEffect(() => { if (messages.length) persist(messages); }, [messages]);

  const onChip = useCallback((r: QuickReply) => {
    if (r.action === 'form') {
      botReply(r.value);
      return;
    }
    push({ type: 'user', content: r.label });
    if (r.action === 'message')     botReply(r.value);
    else if (r.action === 'link') { window.open(r.value, '_blank', 'noopener,noreferrer'); push({ type: 'system', content: `Abrindo ${r.label}…` }); }
    else if (r.action === 'reset')  reset();
    else                            botReply('start');
  }, [push, botReply, reset]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;
    push({ type: 'user', content: text });
    setInput('');
    const intent = identifyIntent(text);
    if (intent) botReply(getResponseForIntent(intent));
    else setTimeout(() => push({
      type: 'bot',
      content: 'Não entendi bem 🤔 Escolhe uma opção abaixo!',
      quickReplies: CHAT_SCRIPT['start'].quickReplies,
    }), 380);
  }, [input, isTyping, push, botReply]);

  const onClear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    reset();
  }, [reset]);

  const lastReplies = (() => {
    if (isTyping) return null;
    const last = messages[messages.length - 1];
    return last?.type === 'bot' && last.quickReplies?.length ? last.quickReplies : null;
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
        .lk-light .lk-ts { color: rgba(0,0,0,0.3); }
        .lk-light .lk-header-btn { color: rgba(0,0,0,0.4); }
        .lk-light .lk-header-btn:hover { background: rgba(0,0,0,0.05); color: #000; }
        .lk-light .lk-chips-wrap { border-top: 1px solid rgba(0,0,0,0.04); background: rgba(0,0,0,0.01); }
        .lk-light .lk-chip { background: #fff; border-color: rgba(0,0,0,0.08); color: #1a1a1a; }
        .lk-light .lk-chip:hover { background: #f0f0f0; border-color: rgba(0,0,0,0.15); }
        .lk-light input { color: #1a1a1a !important; }
        .lk-light input::placeholder { color: rgba(0,0,0,0.3); }
        .lk-light form { border-top-color: rgba(0,0,0,0.05) !important; }

        .lk-root          { font-family: 'DM Sans', sans-serif; }
        .lk-syne          { font-family: 'Syne', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide   { -ms-overflow-style: none; scrollbar-width: none; }

        /* Toggle button */
        @keyframes lk-pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(0,229,160,0.4); }
          70% { box-shadow: 0 0 0 15px rgba(0,229,160,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,229,160,0); }
        }
        .lk-toggle {
          position: relative;
          width: 74px; height: 74px;
          border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(145deg, var(--lk-green) 0%, var(--lk-green-dk) 100%);
          box-shadow: 0 12px 38px rgba(0,229,160,0.45), 0 0 0 1px rgba(0,229,160,0.2);
          border: none; cursor: pointer; outline: none;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          animation: lk-pulse-glow 2.5s infinite;
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
        .lk-toggle[aria-label="Fechar chat"] {
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

        /* Timestamp */
        .lk-ts { opacity: 0.22; color: white; }

        /* Notice */
        .lk-notice {
          display: flex; align-items: center; gap: 6px;
          padding: 4px 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 999px;
        }

        /* Table */
        .lk-table-wrap  { border: 1px solid var(--lk-border); background: rgba(0,0,0,0.3); }
        .lk-table-head  { border-bottom: 1px solid var(--lk-border); background: rgba(255,255,255,0.03); }
        .lk-table-th    { color: var(--lk-muted); }
        .lk-table-row   { border-bottom: 1px solid rgba(255,255,255,0.04); }
        .lk-table-td    { color: var(--lk-text); }

        /* Chips */
        .lk-chips-wrap {
          border-top: 1px solid var(--lk-border);
          background: rgba(0,0,0,0.15);
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }
        .lk-chips-wrap .no-scrollbar::-webkit-scrollbar { display: none; }
        .lk-chips-wrap .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .lk-chip {
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 11px; font-weight: 600;
          color: var(--lk-text);
          border: 1px solid var(--lk-border);
          background: rgba(255,255,255,0.04);
          white-space: normal;
          cursor: pointer; outline: none;
          transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
          font-family: 'DM Sans', sans-serif;
          backdrop-filter: blur(10px);
          min-width: 115px;
          max-width: 170px;
          min-height: 56px;
          justify-content: center;
        }
        .lk-chip:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          color: white;
        }
        .lk-chip-primary {
          background: rgba(0,229,160,0.08);
          border-color: rgba(0,229,160,0.25);
          color: var(--lk-green);
        }
        .lk-chip-primary:hover {
          background: rgba(0,229,160,0.15);
          border-color: var(--lk-green);
          box-shadow: 0 8px 20px -5px rgba(0,229,160,0.25);
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
                position: 'absolute',
                bottom: '70px',
                right: 0,
                width: 'min(390px, calc(100vw - 2rem))',
                height: 'min(610px, 83vh)',
                display: 'flex',
                flexDirection: 'column',
                background: theme === 'light' ? '#f8f9fa' : 'linear-gradient(160deg, rgba(14,14,18,0.97) 0%, rgba(9,9,12,0.99) 100%)',
                border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '22px',
                boxShadow: theme === 'light' ? '0 28px 70px -8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,1)' : '0 28px 70px -8px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.07)',
                backdropFilter: 'blur(48px)',
                overflow: 'hidden',
                transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
              }}
            >

              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 18px',
                borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Logomark */}
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: 'linear-gradient(135deg, #00e5a0 0%, #009e6e 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 18px rgba(0,229,160,0.3)',
                    }}>
                      <Zap size={18} style={{ color: '#000' }} fill="#000" />
                    </div>
                    <span style={{
                      position: 'absolute', bottom: -2, right: -2,
                      width: 11, height: 11, borderRadius: '50%',
                      background: '#00e5a0', border: theme === 'light' ? '2px solid #fff' : '2px solid #0d0d11',
                    }} />
                  </div>

                  <div>
                    <p className="lk-syne" style={{ color: theme === 'light' ? '#111' : 'white', fontSize: 15, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.01em' }}>
                      LK Imports
                    </p>
                    <p style={{ color: '#00e5a0', fontSize: 10, fontWeight: 600, marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.15em', lineHeight: 1 }}>
                      Assistente Técnico • Online
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={toggleTheme}
                    title="Alternar Tema"
                    style={{
                      width: 32, height: 32, borderRadius: 9,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.2)', transition: 'all 0.18s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = theme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)', e.currentTarget.style.color = theme === 'light' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.6)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.2)')}
                  >
                    {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                  </button>

                  <button
                    onClick={onClear}
                  title="Reiniciar conversa"
                  style={{
                    width: 32, height: 32, borderRadius: 9,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.2)', transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)', e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="scrollbar-hide"
                style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, overscrollBehavior: 'contain' }}
              >
                {messages.length === 0 && !isTyping && (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: 0.12 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={24} style={{ color: 'white' }} />
                    </div>
                    <p className="lk-syne" style={{ color: 'white', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.3em' }}>Iniciando…</p>
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

              {/* Quick replies */}
              <AnimatePresence>
                {lastReplies && <Chips replies={lastReplies} onSelect={onChip} />}
              </AnimatePresence>

              {/* Input */}
              <div style={{
                flexShrink: 0,
                padding: '12px 16px 14px',
                borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.06)',
                background: theme === 'light' ? '#f8f9fa' : 'transparent',
              }}>
                <form onSubmit={onSubmit} style={{ 
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: theme === 'light' ? '#fff' : 'rgba(255,255,255,0.05)',
                  border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '24px',
                  padding: '6px 6px 6px 16px',
                  opacity: isInputDisabled ? 0.6 : 1,
                  transition: 'all 0.2s',
                  boxShadow: theme === 'light' ? '0 2px 6px rgba(0,0,0,0.02)' : 'none',
                  cursor: isInputDisabled ? 'not-allowed' : 'text'
                }}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={isInputDisabled}
                    placeholder={isTyping ? "Aguarde..." : hasForm ? "Preencha o formulário acima..." : "Digite sua mensagem..."}
                    aria-label="Mensagem"
                    style={{
                      flex: 1, minWidth: 0,
                      background: 'transparent',
                      border: 'none', outline: 'none',
                      color: theme === 'light' ? '#1a1a1a' : 'rgba(255,255,255,0.88)',
                      fontSize: 14, fontWeight: 500,
                      fontFamily: 'DM Sans, sans-serif',
                      caretColor: '#00e5a0',
                      pointerEvents: isInputDisabled ? 'none' : 'auto'
                    }}
                  />

                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isInputDisabled}
                    whileTap={{ scale: 0.88 }}
                    aria-label="Enviar"
                    style={{
                      flexShrink: 0,
                      width: 36, height: 36, borderRadius: '18px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: 'none', 
                      cursor: input.trim() && !isInputDisabled ? 'pointer' : 'not-allowed',
                      background: input.trim() && !isInputDisabled
                        ? 'linear-gradient(135deg, #00e5a0 0%, #009e6e 100%)'
                        : (theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'),
                      boxShadow: input.trim() && !isInputDisabled ? '0 4px 14px rgba(0,229,160,0.4)' : 'none',
                      transition: 'all 0.2s',
                      color: input.trim() && !isInputDisabled ? '#000' : (theme === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'),
                    }}
                  >
                    <Send size={16} />
                  </motion.button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, opacity: 0.3 }}>
                  <Shield size={10} style={{ color: theme === 'light' ? '#000' : 'white' }} />
                  <span className="lk-syne" style={{ color: theme === 'light' ? '#000' : 'white', fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600 }}>Atendimento Seguro</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
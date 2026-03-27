import { CHAT_SCRIPT } from './chatScript';
import knowledge from '../data/knowledge.json';

/**
 * Chatbot Logic Service
 *
 * Deterministic rule engine for:
 * - stronger normalization/tokenization
 * - intent ranking with multi-signal scoring
 * - service / FAQ / urgency / greeting / gratitude / handoff detection
 * - mapping richer detections back to existing CHAT_SCRIPT step ids
 */

type NullableIntent = string | null;

type KnowledgeIntentMap = Record<string, string[]>;
type KnowledgeFaq = {
  id: string;
  keywords?: string[];
  answer?: string;
};
type KnowledgeService = {
  id: string;
  nome?: string;
  emoji?: string;
  prioridade?: string;
  keywords?: string[];
  urgente?: boolean;
};
type KnowledgeQuickReply = {
  id?: string;
  label?: string;
  keywords?: string[];
};
type KnowledgeResponse = {
  id?: string;
  keywords?: string[];
};
type KnowledgeFile = {
  intents?: KnowledgeIntentMap;
  faqs?: KnowledgeFaq[];
  services?: KnowledgeService[];
  quickReplies?: KnowledgeQuickReply[] | Record<string, string[] | KnowledgeQuickReply>;
  respostas?: KnowledgeResponse[] | Record<string, string[] | KnowledgeResponse>;
};

type DetectionCategory =
  | 'step'
  | 'service'
  | 'faq'
  | 'intent'
  | 'brand'
  | 'repair_type'
  | 'urgency'
  | 'entity';

export interface DetectionResult {
  intent: NullableIntent;
  score: number;
  category: DetectionCategory | 'none';
  reasons: string[];
}

const kb = knowledge as KnowledgeFile;

// ─── Intent Cache ─────────────────────────────────────────────

const intentCache = new Map<string, DetectionResult>();
const MAX_CACHE_SIZE = 100;

const addToCache = (normalized: string, result: DetectionResult) => {
  if (intentCache.size >= MAX_CACHE_SIZE) {
    const entriesToDelete = Math.floor(MAX_CACHE_SIZE * 0.5);
    let deleted = 0;
    for (const key of intentCache.keys()) {
      intentCache.delete(key);
      deleted++;
      if (deleted >= entriesToDelete) break;
    }
  }
  intentCache.set(normalized, result);
};

// ─── Normalization helpers ───────────────────────────────────

const STOP_WORDS = new Set([
  'a',
  'o',
  'os',
  'as',
  'um',
  'uma',
  'uns',
  'umas',
  'de',
  'da',
  'do',
  'das',
  'dos',
  'em',
  'no',
  'na',
  'nos',
  'nas',
  'para',
  'pra',
  'pro',
  'por',
  'com',
  'sem',
  'me',
  'te',
  'se',
  'que',
  'e',
  'ou',
  'eu',
  'vocês',
  'voces',
  'você',
  'voce',
  'meu',
  'minha',
  'meus',
  'minhas',
  'tem',
  'tenho',
  'preciso',
  'queria',
  'gostaria',
  'sobre',
  'mais',
  'muito',
  'ta',
  'tá',
  'to',
  'tô',
  'seria',
  'como',
  'qual',
  'quais',
  'onde',
  'quando'
]);

const TOKEN_SYNONYMS: Record<string, string> = {
  oled: 'tela',
  amoled: 'tela',
  lcd: 'tela',
  display: 'tela',
  touch: 'tela',
  vidro: 'tela',
  visor: 'tela',
  bateria: 'bateria',
  carrega: 'carregamento',
  carregador: 'carregamento',
  carga: 'carregamento',
  conector: 'carregamento',
  dock: 'carregamento',
  entrada: 'carregamento',
  usb: 'carregamento',
  lightning: 'carregamento',
  usbc: 'carregamento',
  usbcporta: 'carregamento',
  placa: 'placa',
  microsoldagem: 'placa',
  curto: 'placa',
  molhou: 'liquido',
  agua: 'liquido',
  liquido: 'liquido',
  umidade: 'liquido',
  oxidacao: 'liquido',
  desoxidacao: 'liquido',
  capinha: 'acessorio',
  pelicula: 'acessorio',
  cabo: 'acessorio',
  fone: 'acessorio',
  acessorio: 'acessorio',
  acessorios: 'acessorio',
  orcamento: 'orcamento',
  avaliacao: 'orcamento',
  orçamento: 'orcamento',
  endereco: 'localizacao',
  localização: 'localizacao',
  localizacao: 'localizacao',
  loja: 'localizacao',
  mapa: 'localizacao',
  horario: 'horario',
  funcionamento: 'horario',
  garantia: 'garantia',
  pix: 'pagamento',
  cartao: 'pagamento',
  crédito: 'pagamento',
  credito: 'pagamento',
  débito: 'pagamento',
  debito: 'pagamento',
  parcela: 'pagamento',
  parcelamento: 'pagamento',
  whatsapp: 'humano',
  atendente: 'humano',
  humano: 'humano',
  tecnico: 'humano',
  urgente: 'urgencia',
  urgencia: 'urgencia',
  emergencia: 'urgencia'
};

export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const tokenizeText = (text: string): string[] => {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  return normalized.split(' ').filter(Boolean);
};

export const normalizeToken = (token: string): string => {
  const base = normalizeText(token).replace(/\s+/g, '');
  return TOKEN_SYNONYMS[base] ?? base;
};

export const getTokenVariants = (token: string): string[] => {
  const normalized = normalizeText(token);
  const compact = normalized.replace(/\s+/g, '');
  const canonical = normalizeToken(token);
  return Array.from(new Set([normalized, compact, canonical].filter(Boolean)));
};

export const extractKeyTokens = (text: string): string[] => {
  return tokenizeText(text)
    .map((token) => normalizeToken(token))
    .filter((token) => token && !STOP_WORDS.has(token));
};

const toTokenSet = (text: string): Set<string> => new Set(extractKeyTokens(text));

const normalizedIncludes = (haystack: string, needle: string): boolean => {
  const h = ` ${normalizeText(haystack)} `;
  const n = ` ${normalizeText(needle)} `;
  return h.includes(n);
};

const phraseHasStrongBoundaryMatch = (message: string, phrase: string): boolean => {
  const normalizedMessage = normalizeText(message);
  const normalizedPhrase = normalizeText(phrase);
  if (!normalizedMessage || !normalizedPhrase) return false;
  return (` ${normalizedMessage} `).includes(` ${normalizedPhrase} `);
};

const hasAllCanonicalTokens = (messageTokens: Set<string>, phrase: string): boolean => {
  const phraseTokens = extractKeyTokens(phrase);
  return phraseTokens.length > 0 && phraseTokens.every((token) => messageTokens.has(token));
};

const countCanonicalOverlap = (messageTokens: Set<string>, phrase: string): number => {
  return extractKeyTokens(phrase).filter((token) => messageTokens.has(token)).length;
};

const isShortMessage = (tokens: string[]) => tokens.length <= 3;

// ─── Domain maps ──────────────────────────────────────────────

const DIRECT_STEP_KEYWORDS: Record<string, string[]> = {
  start: ['menu', 'inicio', 'menu inicial', 'comecar', 'reiniciar', 'resetar', 'ola', 'oi'],
  reparos: ['reparo', 'reparos', 'conserto', 'consertar', 'assistencia tecnica', 'manutencao', 'arrumar celular'],
  acessorios: ['acessorio', 'acessorios', 'peca', 'pecas', 'capinha', 'pelicula', 'carregador', 'cabo', 'fone'],
  localizacao: ['localizacao', 'endereco', 'onde fica', 'loja', 'como chegar', 'maps', 'google maps'],
  form_cadastro: ['cadastro', 'cadastrar', 'registrar', 'formulario'],
  horario: ['horario', 'horarios', 'funcionamento', 'abre', 'fecha', 'aberto', 'fechado'],
  garantia: ['garantia', 'garantias', 'cobertura'],
  pagamento: ['pagamento', 'pagamentos', 'pix', 'cartao', 'credito', 'debito', 'parcelar', 'parcelamento'],
  humano_handoff: ['atendente', 'humano', 'pessoa', 'especialista', 'consultor', 'whatsapp', 'falar com alguem'],
  agradecimento_feedback: ['obrigado', 'obrigada', 'valeu', 'agradeco', 'show', 'top'],
  faq: ['duvida', 'duvidas', 'faq', 'pergunta', 'perguntas'],
  faq_orcamento: ['orcamento gratis', 'avaliacao gratuita', 'orcamento', 'preco', 'valor'],
  faq_dados: ['dados', 'backup', 'perco meus dados', 'apaga meus dados', 'formatar'],
  faq_correios: ['correios', 'sedex', 'enviar', 'envio', 'transportadora', 'moro longe'],
  faq_tela: ['tela original', 'tela premium', 'qualidade da tela', 'oled', 'amoled', 'lcd'],
  faq_privacidade: ['privacidade', 'sigilo', 'confidencialidade', 'senha temporaria'],
  prazos: ['prazo', 'prazos', 'quanto tempo', 'fica pronto', 'demora', 'tempo de reparo'],
  reparo_tela: ['tela quebrada', 'vidro quebrado', 'touch', 'display', 'sem imagem', 'linha na tela', 'mancha na tela'],
  reparo_bateria: ['bateria', 'descarrega rapido', 'inchada', 'estufada', 'saude da bateria'],
  reparo_conector: ['nao carrega', 'conector', 'porta de carga', 'entrada do carregador', 'dock', 'carregamento lento'],
  reparo_placa: ['placa', 'nao liga', 'curto', 'microsoldagem', 'placa logica'],
  reparo_molhou: ['molhou', 'agua', 'liquido', 'caiu na agua', 'oxidou'],
  reparo_outro: ['camera', 'microfone', 'alto falante', 'botao', 'biometria', 'wifi', 'bluetooth', 'superaquecimento', 'esquentando'],
  marca_apple: ['iphone', 'apple', 'ios'],
  marca_samsung: ['samsung', 'galaxy'],
  marca_xiaomi: ['xiaomi', 'redmi', 'poco'],
  marca_motorola: ['motorola', 'moto g', 'edge', 'razr'],
  marca_outra: ['lg', 'realme', 'asus', 'outra marca', 'outra']
};

const BRAND_STEP_KEYWORDS: Record<string, string[]> = {
  marca_apple: ['iphone', 'apple', 'ios'],
  marca_samsung: ['samsung', 'galaxy'],
  marca_xiaomi: ['xiaomi', 'redmi', 'poco'],
  marca_motorola: ['motorola', 'moto', 'edge', 'razr'],
  marca_outra: ['lg', 'realme', 'asus', 'huawei', 'infinix', 'outra marca']
};

const SERVICE_TO_STEP: Record<string, string> = {
  troca_tela: 'reparo_tela',
  troca_bateria: 'reparo_bateria',
  troca_conector: 'reparo_conector',
  reparo_placa: 'reparo_placa',
  limpeza_desoxidacao: 'reparo_molhou',
  troca_tampa: 'reparo_outro',
  desbloqueio: 'reparo_outro',
  troca_camera: 'reparo_outro',
  troca_audio: 'reparo_outro',
  troca_microfone: 'reparo_outro',
  troca_botoes: 'reparo_outro',
  troca_vibra: 'reparo_outro',
  troca_slot: 'reparo_outro',
  troca_antena: 'reparo_outro',
  reparo_biometria: 'reparo_outro',
  carregamento_lento: 'reparo_conector',
  superaquecimento: 'reparo_outro',
  formatacao: 'reparo_outro',
  recuperacao_sistema: 'reparo_outro'
};

const FAQ_TO_STEP: Record<string, string> = {
  endereco: 'localizacao',
  garantia: 'garantia',
  prazo: 'prazos',
  pagamento: 'pagamento',
  orcamento_gratis: 'faq_orcamento',
  envio_aparelho: 'faq_correios',
  fora_brasilia: 'faq_correios',
  tela_original: 'faq_tela',
  aparelho_molhado: 'reparo_molhou',
  acessorios: 'acessorios',
  agendamento: 'humano_handoff',
  marca_compativel: 'reparos',
  dados: 'faq_dados',
  privacidade: 'faq_privacidade'
};

const INTENT_TO_STEP: Record<string, string> = {
  saudacao: 'start',
  agradecimento: 'agradecimento_feedback',
  despedida: 'agradecimento_feedback',
  urgencia: 'humano_handoff',
  orcamento: 'faq_orcamento',
  pagamento: 'pagamento',
  tempo: 'prazos',
  endereco: 'localizacao',
  garantia: 'garantia',
  acessorios: 'acessorios',
  humano: 'humano_handoff',
  horario: 'horario'
};

const HUMAN_HANDOFF_TERMS = [
  'atendente',
  'humano',
  'pessoa',
  'pessoa real',
  'especialista',
  'consultor',
  'tecnico',
  'whatsapp',
  'falar com alguem',
  'atendimento humano',
  'vendedor',
  'suporte'
];

const URGENCY_TERMS = [
  'urgente',
  'urgencia',
  'agora',
  'imediatamente',
  'o quanto antes',
  'pra ontem',
  'para ontem',
  'emergencia',
  'socorro',
  'rapido',
  'rápido'
];

const GRATITUDE_TERMS = ['obrigado', 'obrigada', 'valeu', 'agradeco', 'show', 'top', 'perfeito'];

const GREETING_ONLY_TERMS = new Set(['oi', 'ola', 'opa', 'eai', 'fala', 'hello', 'hi', 'salve', 'bomdia', 'boatarde', 'boanoite']);

const NEGATIVE_URGENCY_CONTEXT = ['quanto', 'valor', 'preco', 'preço', 'orçamento', 'orcamento'];

const VALID_STEP_IDS = new Set(Object.keys(CHAT_SCRIPT));

// ─── Knowledge extraction helpers ─────────────────────────────

const normalizeKnowledgeEntries = (
  source?: KnowledgeQuickReply[] | Record<string, string[] | KnowledgeQuickReply> | KnowledgeResponse[] | Record<string, string[] | KnowledgeResponse>
): { id: string; keywords: string[] }[] => {
  if (!source) return [];

  if (Array.isArray(source)) {
    return source
      .map((item, index) => {
        if (!item || typeof item !== 'object') return null;
        return {
          id: item.id ?? `entry_${index}`,
          keywords: item.keywords ?? []
        };
      })
      .filter((item): item is { id: string; keywords: string[] } => Boolean(item));
  }

  return Object.entries(source).map(([id, value]) => {
    if (Array.isArray(value)) {
      return { id, keywords: value };
    }

    return {
      id: value.id ?? id,
      keywords: value.keywords ?? []
    };
  });
};

const KNOWLEDGE_ENTITY_STEP_MAP: Record<string, string> = {
  start: 'start',
  reparos: 'reparos',
  acessorios: 'acessorios',
  localizacao: 'localizacao',
  cadastro: 'form_cadastro',
  horario: 'horario',
  garantia: 'garantia',
  pagamento: 'pagamento',
  humano_handoff: 'humano_handoff',
  faq: 'faq',
  faq_orcamento: 'faq_orcamento',
  faq_dados: 'faq_dados',
  faq_correios: 'faq_correios',
  faq_tela: 'faq_tela',
  faq_privacidade: 'faq_privacidade',
  prazos: 'prazos',
  tela: 'reparo_tela',
  bateria: 'reparo_bateria',
  conector: 'reparo_conector',
  placa: 'reparo_placa',
  molhou: 'reparo_molhou',
  apple: 'marca_apple',
  samsung: 'marca_samsung',
  xiaomi: 'marca_xiaomi',
  motorola: 'marca_motorola'
};

const KNOWLEDGE_ENTITIES = [
  ...normalizeKnowledgeEntries(kb.quickReplies),
  ...normalizeKnowledgeEntries(kb.respostas)
];

// ─── Scoring ──────────────────────────────────────────────────

const scoreKeywordGroup = (message: string, tokens: string[], phrases: string[]): { score: number; reasons: string[] } => {
  const canonicalTokens = new Set(tokens.map((token) => normalizeToken(token)));
  let score = 0;
  const reasons: string[] = [];

  for (const phrase of phrases) {
    const normalizedPhrase = normalizeText(phrase);
    if (!normalizedPhrase) continue;

    const phraseCanonicalTokens = extractKeyTokens(normalizedPhrase);
    const tokenCount = phraseCanonicalTokens.length || tokenizeText(normalizedPhrase).length || 1;

    if (phraseHasStrongBoundaryMatch(message, normalizedPhrase)) {
      score += tokenCount >= 2 ? 10 : 5;
      reasons.push(`exact:${normalizedPhrase}`);
      continue;
    }

    if (hasAllCanonicalTokens(canonicalTokens, normalizedPhrase)) {
      score += tokenCount >= 2 ? 7 : 4;
      reasons.push(`tokens:${normalizedPhrase}`);
      continue;
    }

    const overlap = countCanonicalOverlap(canonicalTokens, normalizedPhrase);
    if (overlap >= 2) {
      score += 3 + overlap;
      reasons.push(`partial:${normalizedPhrase}`);
      continue;
    }

    if (overlap === 1 && tokenCount === 1 && canonicalTokens.has(phraseCanonicalTokens[0])) {
      score += 2;
      reasons.push(`single:${normalizedPhrase}`);
    }
  }

  return { score, reasons };
};

const makeResult = (
  intent: NullableIntent,
  score: number,
  category: DetectionCategory | 'none',
  reasons: string[]
): DetectionResult => ({
  intent,
  score,
  category,
  reasons
});

const chooseBestResult = (results: DetectionResult[]): DetectionResult => {
  const sorted = [...results].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;

    const categoryPriority: Record<string, number> = {
      step: 8,
      service: 7,
      faq: 6,
      urgency: 5,
      brand: 4,
      repair_type: 4,
      entity: 3,
      intent: 2,
      none: 1
    };

    return (categoryPriority[b.category] || 0) - (categoryPriority[a.category] || 0);
  });

  return sorted[0] ?? makeResult(null, 0, 'none', []);
};

const containsAnyPhrase = (message: string, phrases: string[]): boolean => {
  return phrases.some((phrase) => phraseHasStrongBoundaryMatch(message, phrase) || hasAllCanonicalTokens(toTokenSet(message), phrase));
};

// ─── Detection engine ────────────────────────────────────────

export const detectIntent = (message: string): DetectionResult => {
  const normalized = normalizeText(message);
  const tokens = tokenizeText(message);

  if (!normalized) {
    return makeResult(null, 0, 'none', ['empty']);
  }

  if (intentCache.has(normalized)) {
    return intentCache.get(normalized) as DetectionResult;
  }

  const results: DetectionResult[] = [];
  const canonicalTokenSet = new Set(tokens.map((token) => normalizeToken(token)));

  // 1) Direct exact step id trigger
  if (VALID_STEP_IDS.has(normalized)) {
    results.push(makeResult(normalized, 100, 'step', ['exact-step-id']));
  }

  // 2) Direct step keyword mapping
  for (const [stepId, phrases] of Object.entries(DIRECT_STEP_KEYWORDS)) {
    const { score, reasons } = scoreKeywordGroup(normalized, tokens, phrases);
    if (score > 0 && VALID_STEP_IDS.has(stepId)) {
      const weightedScore =
        stepId.startsWith('reparo_') || stepId.startsWith('faq_') || stepId.startsWith('marca_')
          ? score + 8
          : score + 5;

      results.push(makeResult(stepId, weightedScore, 'step', reasons.map((reason) => `${stepId}:${reason}`)));
    }
  }

  // 3) Knowledge services with contextual repair boost
  for (const service of kb.services ?? []) {
    const phrases = [service.nome ?? '', ...(service.keywords ?? [])].filter(Boolean);
    const { score, reasons } = scoreKeywordGroup(normalized, tokens, phrases);
    if (score <= 0) continue;

    const mappedStep = SERVICE_TO_STEP[service.id] ?? 'reparos';
    let weightedScore = score + 10;

    if (service.urgente) weightedScore += 3;
    if ((service.prioridade ?? '').toLowerCase() === 'alta') weightedScore += 2;
    if (containsAnyPhrase(normalized, ['iphone', 'samsung', 'xiaomi', 'motorola'])) weightedScore += 1;

    if (VALID_STEP_IDS.has(mappedStep)) {
      results.push(makeResult(mappedStep, weightedScore, 'service', [`service:${service.id}`, ...reasons]));
    }
  }

  // 4) Knowledge FAQs
  for (const faq of kb.faqs ?? []) {
    const phrases = [...(faq.keywords ?? []), faq.answer ?? ''].filter(Boolean);
    const { score, reasons } = scoreKeywordGroup(normalized, tokens, phrases);
    if (score <= 0) continue;

    const mappedStep = FAQ_TO_STEP[faq.id] ?? 'faq';
    if (VALID_STEP_IDS.has(mappedStep)) {
      results.push(makeResult(mappedStep, score + 8, 'faq', [`faq:${faq.id}`, ...reasons]));
    }
  }

  // 5) Knowledge intents
  for (const [intentName, phrases] of Object.entries(kb.intents ?? {})) {
    const { score, reasons } = scoreKeywordGroup(normalized, tokens, phrases);
    if (score <= 0) continue;

    const mappedStep = INTENT_TO_STEP[intentName] ?? null;
    if (mappedStep && VALID_STEP_IDS.has(mappedStep)) {
      let weightedScore = score + 6;

      if (intentName === 'saudacao' && !isShortMessage(tokens)) {
        weightedScore -= 2;
      }

      if (intentName === 'urgencia') {
        weightedScore += 5;
      }

      results.push(
        makeResult(
          mappedStep,
          weightedScore,
          intentName === 'urgencia' ? 'urgency' : 'intent',
          [`intent:${intentName}`, ...reasons]
        )
      );
    }
  }

  // 6) Knowledge quick reply / response entities
  for (const entity of KNOWLEDGE_ENTITIES) {
    const mappedStep = KNOWLEDGE_ENTITY_STEP_MAP[entity.id];
    if (!mappedStep || !VALID_STEP_IDS.has(mappedStep)) continue;

    const { score, reasons } = scoreKeywordGroup(normalized, tokens, entity.keywords);
    if (score > 0) {
      results.push(makeResult(mappedStep, score + 4, 'entity', [`entity:${entity.id}`, ...reasons]));
    }
  }

  // 7) Explicit human handoff
  const handoffScore = scoreKeywordGroup(normalized, tokens, HUMAN_HANDOFF_TERMS);
  if (handoffScore.score > 0) {
    results.push(
      makeResult('humano_handoff', handoffScore.score + 12, 'intent', ['handoff', ...handoffScore.reasons])
    );
  }

  // 8) Explicit gratitude / closure
  const gratitudeScore = scoreKeywordGroup(normalized, tokens, GRATITUDE_TERMS);
  if (gratitudeScore.score > 0) {
    results.push(
      makeResult(
        'agradecimento_feedback',
        gratitudeScore.score + 8,
        'intent',
        ['gratitude', ...gratitudeScore.reasons]
      )
    );
  }

  // 9) Explicit urgency escalation with critical-repair routing
  const urgencyScore = scoreKeywordGroup(normalized, tokens, URGENCY_TERMS);
  const hasNegativeUrgencyContext = containsAnyPhrase(normalized, NEGATIVE_URGENCY_CONTEXT);

  if (urgencyScore.score > 0 && !hasNegativeUrgencyContext) {
    const isLiquid = containsAnyPhrase(normalized, ['molhou', 'agua', 'liquido', 'oxidacao']);
    const isPower = containsAnyPhrase(normalized, ['nao liga', 'curto', 'placa']);
    const isBatteryRisk = containsAnyPhrase(normalized, ['estufada', 'inchada', 'bateria']);

    const target = isLiquid ? 'reparo_molhou' : isBatteryRisk ? 'reparo_bateria' : isPower ? 'reparo_placa' : 'humano_handoff';

    results.push(makeResult(target, urgencyScore.score + 14, 'urgency', ['urgency', ...urgencyScore.reasons]));
  }

  // 10) Brand detection
  for (const [stepId, phrases] of Object.entries(BRAND_STEP_KEYWORDS)) {
    const { score, reasons } = scoreKeywordGroup(normalized, tokens, phrases);
    if (score > 0 && VALID_STEP_IDS.has(stepId)) {
      const contextualBoost =
        containsAnyPhrase(normalized, ['tela', 'bateria', 'carrega', 'reparo', 'conserto', 'placa', 'camera']) ? 6 : 2;

      results.push(makeResult(stepId, score + contextualBoost, 'brand', reasons.map((reason) => `brand:${reason}`)));
    }
  }

  // 11) Greeting-only safety
  if (
    tokens.every((token) => GREETING_ONLY_TERMS.has(normalizeToken(token))) ||
    (tokens.length <= 2 && tokens.some((token) => GREETING_ONLY_TERMS.has(normalizeToken(token))))
  ) {
    results.push(makeResult('start', 10, 'intent', ['greeting-only']));
  }

  // 12) Generic repair context
  const repairContextTerms = [
    'arrumar',
    'consertar',
    'reparo',
    'conserto',
    'defeito',
    'problema',
    'assistencia tecnica',
    'manutencao'
  ];
  const repairContext = scoreKeywordGroup(normalized, tokens, repairContextTerms);
  if (repairContext.score > 0) {
    results.push(makeResult('reparos', repairContext.score + 4, 'repair_type', ['repair-context', ...repairContext.reasons]));
  }

  // 13) Generic accessory context
  const accessoryTerms = ['comprar', 'vende', 'tem capinha', 'tem pelicula', 'tem carregador', 'acessorio', 'pecas', 'fone'];
  const accessoryContext = scoreKeywordGroup(normalized, tokens, accessoryTerms);
  if (accessoryContext.score > 0) {
    results.push(makeResult('acessorios', accessoryContext.score + 4, 'intent', ['accessory-context', ...accessoryContext.reasons]));
  }

  // 14) Generic FAQ routing
  const faqTerms = ['quanto custa', 'qual valor', 'como funciona', 'tem garantia', 'faz envio', 'prazo'];
  const faqContext = scoreKeywordGroup(normalized, tokens, faqTerms);
  if (faqContext.score > 0) {
    results.push(makeResult('faq', faqContext.score + 3, 'faq', ['faq-context', ...faqContext.reasons]));
  }

  // 15) Safe fallback for direct canonical token entities
  if (canonicalTokenSet.has('pagamento')) {
    results.push(makeResult('pagamento', 7, 'entity', ['canonical:pagamento']));
  }
  if (canonicalTokenSet.has('garantia')) {
    results.push(makeResult('garantia', 7, 'entity', ['canonical:garantia']));
  }
  if (canonicalTokenSet.has('localizacao')) {
    results.push(makeResult('localizacao', 7, 'entity', ['canonical:localizacao']));
  }
  if (canonicalTokenSet.has('horario')) {
    results.push(makeResult('horario', 7, 'entity', ['canonical:horario']));
  }

  const best = chooseBestResult(results);
  const finalResult =
    best.intent && best.score >= 6
      ? best
      : makeResult(null, 0, 'none', best.reasons.length ? best.reasons : ['no-confident-match']);

  addToCache(normalized, finalResult);
  return finalResult;
};

export const identifyIntent = (message: string): string | null => {
  try {
    return detectIntent(message).intent;
  } catch (err) {
    console.error('[CHATBOT] identifyIntent error:', err instanceof Error ? err.message : String(err));
    return null;
  }
};

export const getResponseForIntent = (intent: string): string => {
  if (!intent) return 'start';

  if (VALID_STEP_IDS.has(intent)) {
    return intent;
  }

  if (INTENT_TO_STEP[intent] && VALID_STEP_IDS.has(INTENT_TO_STEP[intent])) {
    return INTENT_TO_STEP[intent];
  }

  if (SERVICE_TO_STEP[intent] && VALID_STEP_IDS.has(SERVICE_TO_STEP[intent])) {
    return SERVICE_TO_STEP[intent];
  }

  if (FAQ_TO_STEP[intent] && VALID_STEP_IDS.has(FAQ_TO_STEP[intent])) {
    return FAQ_TO_STEP[intent];
  }

  if (KNOWLEDGE_ENTITY_STEP_MAP[intent] && VALID_STEP_IDS.has(KNOWLEDGE_ENTITY_STEP_MAP[intent])) {
    return KNOWLEDGE_ENTITY_STEP_MAP[intent];
  }

  switch (intent) {
    case 'produtos':
      return 'acessorios';
    case 'cadastro':
      return 'form_cadastro';
    case 'humano':
      return 'humano_handoff';
    case 'localizacao':
      return 'localizacao';
    case 'horario':
      return 'horario';
    case 'garantia':
      return 'garantia';
    case 'pagamento':
      return 'pagamento';
    case 'reparos':
      return 'reparos';
    case 'saudacao':
      return 'start';
    case 'agradecimento':
    case 'despedida':
      return 'agradecimento_feedback';
    default:
      return 'start';
  }
};
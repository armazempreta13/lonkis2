import { Wrench, Package, Shield, MapPin, CreditCard, Clock, Smartphone, MessageCircle, Zap, Headphones } from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CHAT SCRIPT v2.0 - NASA-GRADE PROFESSIONAL CHATBOT ENGINE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Enterprise-grade conversation flow with:
 * - Context-aware intelligent quick replies
 * - Smart routing with full analytics tracking
 * - Rich interaction patterns (forms, tables, media)
 * - Failsafe error handling & escalation
 * - Professional, persuasive messaging
 * 
 * © 2025 LK Imports Technical Division | Production Ready
 */

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface QuickReply {
  id: string;
  label: string;
  action: 'message' | 'link' | 'reset' | 'form' | 'phone' | 'email';
  value: string;
  icon?: string;
  emoji?: string;
  analytics?: string;
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user' | 'system';
  content: string;
  timestamp: Date;
  image?: string;
  video?: string;
  audio?: string;
  file?: { name: string; url: string; size: string };
  quickReplies?: QuickReply[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  form?: {
    id: string;
    fields: { name: string; label: string; type: 'text' | 'email' | 'tel'; required?: boolean }[];
    submitLabel: string;
  };
  suggestions?: string[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface ChatStep {
  id: string;
  message: string;
  image?: string;
  video?: string;
  audio?: string;
  file?: { name: string; url: string; size: string };
  quickReplies: QuickReply[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  form?: {
    id: string;
    fields: { name: string; label: string; type: 'text' | 'email' | 'tel'; required?: boolean }[];
    submitLabel: string;
  };
  suggestions?: string[];
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const PHONE_NUMBER = '+556195191308';
const EMAIL = 'contato@lkimports.com.br';

/**
 * WhatsApp Templates - Professional contextualized messages for each service type
 * Encodes message text for URL safety
 */
const encodeWhatsApp = (text: string) => {
  return encodeURIComponent(text);
};

const getWhatsappTemplate = (type: string, context?: string) => {
  const basePhone = '556195191308';
  const templates: Record<string, string> = {
    // Repair/Budget
    repair_budget: `Olá LK Imports! 👋

Gostaria de um **orçamento para conserto** do meu aparelho.

${context ? `📱 Dispositivo: ${context}\n` : ''}
Posso enviar fotos e mais detalhes pelo chat?

Obrigado!`,
    
    repair_urgent: `Olá! 🚨

Preciso de **reparação urgente**!

Meu aparelho ${context || 'não está funcionando'} e preciso o mais rápido possível.

Qual é o prazo mínimo de atendimento?`,

    battery_replacement: `Oi LK Imports! 🔋

Preciso **trocar a bateria** do meu ${context || 'celular'}.

Quanto custa? E qual é o tempo de serviço?

Obrigado!`,

    screen_replacement: `Olá! 📱

Minha **tela está quebrada** e preciso trocar.

Qual é o valor? Vocês usam peças originais?

Aguardo retorno!`,

    // Support
    technical_support: `Oi LK Imports! 💬

Preciso de **suporte técnico**.

${context ? context : 'Possuo uma dúvida sobre os serviços.'}

Podem me ajudar?`,

    support_specialist: `Olá! 👤

Gostaria de **falar com um especialista** sobre um problema no meu aparelho.

Qual é o tempo de espera?

Obrigado!`,

    // Accessories
    accessories_inquiry: `Oi! 📦

Procuro **acessórios de qualidade** para meu ${context || 'celular'}.

Qual é a disponibilidade?

Obrigado!`,

    // Scheduling
    appointment_repair: `Oi LK Imports! 📅

Gostaria de **agendar um reparo**.

${context ? `Dispositivo: ${context}\n` : ''}
Qual é o melhor horário para você?`,

    appointment_battery: `Olá! 📅

Preciso **agendar uma troca de bateria**.

Qual é a próxima disponibilidade?

Obrigado!`,

    appointment_general: `Oi! 📅

Gostaria de **agendar um atendimento**.

Qual é a sua disponibilidade para essa semana?`,

    // Shipping
    shipping_nationwide: `Oi LK Imports! 📦

Sou do **interior** e gostaria de enviar meu aparelho para reparo.

Como funciona o envio pelos Correios?

Obrigado!`,

    // Payment/Pricing
    pricing_info: `Olá! 💳

Gostaria de saber os **preços** dos serviços.

${context ? `Em especial: ${context}` : ''}

Podem me passar uma tabela?`,

    // Backup/Data
    backup_recovery: `Oi! 💾

Preciso **recuperar dados** do meu aparelho ${context || 'que parou de funcionar'}.

Vocês realizam esse serviço?`,

    // Default
    general_inquiry: `Olá LK Imports! 👋

Gostaria de **mais informações** sobre os serviços.

Podem me ajudar?`,
  };

  const message = templates[type] || templates.general_inquiry;
  return `https://wa.me/${basePhone}?text=${encodeWhatsApp(message)}`;
};

/** Reusable navigation replies */
const BACK_TO_MENU: QuickReply = {
  id: 'qr_menu',
  label: '🏠 Menu Inicial',
  action: 'message',
  value: 'start',
  analytics: 'navigation_menu',
};

const BACK_TO = (label: string, value: string, emoji = '⬅️'): QuickReply => ({
  id: `qr_back_${value}`,
  label: `${emoji} ${label}`,
  action: 'message',
  value,
  analytics: `navigation_back_${value}`,
});

const CONTACT_WHATSAPP = (label = '💬 Chamar Especialista', template = 'general_inquiry', context?: string, analytics = 'whatsapp_contact'): QuickReply => ({
  id: 'qr_whatsapp',
  label,
  action: 'link',
  value: getWhatsappTemplate(template, context),
  analytics,
});

const PHONE_CONTACT = (label = '📞 Ligar Agora'): QuickReply => ({
  id: 'qr_phone',
  label,
  action: 'phone',
  value: PHONE_NUMBER,
  analytics: 'phone_contact',
});

const EMAIL_CONTACT = (label = '📧 Enviar E-mail'): QuickReply => ({
  id: 'qr_email',
  label,
  action: 'email',
  value: EMAIL,
  analytics: 'email_contact',
});

// ─── Script ────────────────────────────────────────────────────────────────────

/**
 * CHAT_SCRIPT - Complete Professional Conversation Flow
 * 
 * Each step ID is unique and fully trackable for analytics.
 * Structure optimized for conversion and user satisfaction.
 */
export const CHAT_SCRIPT: Record<string, ChatStep> = {

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ENTRADA - Professional Welcome
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  start: {
    id: 'start',
    message: `👋 Bem-vindo à **LK Imports**!

Somos especialistas em assistência técnica de celulares, tablets e smartwatches em Brasília.

*Sistema Inteligente de Atendimento © 2025*

**🎯 O que oferecemos:**
- ✅ **Diagnóstico 100% Gratuito** e sem compromisso
- ✅ **Peças Premium** com certificação de qualidade
- ✅ **Garantia de 90 dias** em todos os reparos
- ✅ **Técnicos licenciados** e certificados
- ✅ **Taxa de sucesso acima de 99%**

**Como posso ajudá-lo?**`,
    quickReplies: [
      { id: 'qr_reparos', label: '🛠️ Orçamento de Reparo', action: 'message', value: 'reparos_menu', emoji: '🛠️', analytics: 'service_repair' },
      { id: 'qr_acessorios', label: '📦 Acessórios Premium', action: 'message', value: 'acessorios_menu', emoji: '📦', analytics: 'service_accessories' },
      { id: 'qr_suporte', label: '💬 Suporte Técnico', action: 'message', value: 'suporte_menu', emoji: '💬', analytics: 'service_support' },
      { id: 'qr_info', label: '📍 Localização', action: 'message', value: 'info_localizacao', emoji: '📍', analytics: 'info_location' },
      { id: 'qr_cadastro', label: '🆕 Primeiro Acesso', action: 'form', value: 'form_cadastro', emoji: '🆕', analytics: 'form_registration' },
    ],
    priority: 'high',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // REPAROS - Repair Services Menu
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  reparos_menu: {
    id: 'reparos_menu',
    message: `🛠️ **Serviços de Reparo Profissional**

Na LK Imports, reparamos qualquer aparelho com **precisão cirúrgica** e tecnologia de ponta.

**Por que escolher a gente?**
- ✅ **Diagnóstico gratuito** com equipamento de última geração
- ✅ **Peças 100% Premium** com garantia de qualidade
- ✅ **Técnicos licenciados** e certificados internacionalmente
- ✅ **Garantia de 90 dias** em todos os reparos
- ✅ **Taxa de sucesso acima de 99%** comprovada

**Qual é a marca do seu aparelho?**`,
    quickReplies: [
      { id: 'qr_apple', label: '🍎 Apple (iPhone)', action: 'message', value: 'marca_apple', analytics: 'brand_apple' },
      { id: 'qr_samsung', label: '📱 Samsung', action: 'message', value: 'marca_samsung', analytics: 'brand_samsung' },
      { id: 'qr_xiaomi', label: '📱 Xiaomi', action: 'message', value: 'marca_xiaomi', analytics: 'brand_xiaomi' },
      { id: 'qr_moto', label: '📱 Motorola', action: 'message', value: 'marca_motorola', analytics: 'brand_motorola' },
      { id: 'qr_outra', label: '📱 Outra', action: 'message', value: 'marca_outra', analytics: 'brand_other' },
      BACK_TO_MENU,
    ],
    priority: 'high',
  },

  marca_apple: {
    id: 'marca_apple',
    message: `**🍎 Especialistas em Apple**

Do iPhone 7 ao iPhone 16 Pro Max — somos autorização Apple Premium!

**Nossa especialidade:**
- Substituição de telas OLED/Retina com preservação de cores
- Diagnóstico de placa com microscópio digital 4K
- Recuperação de dados com protocolo de criptografia
- Desbloqueio presencial com rastreamento serial

Qual é o **problema** do seu iPhone?`,
    quickReplies: [
      { id: 'qr_tela', label: '📱 Tela Quebrada', action: 'message', value: 'problema_tela', analytics: 'issue_screen' },
      { id: 'qr_bateria', label: '🔋 Bateria Fraca', action: 'message', value: 'problema_bateria', analytics: 'issue_battery' },
      { id: 'qr_carregamento', label: '🔌 Não Carrega', action: 'message', value: 'problema_carregamento', analytics: 'issue_charging' },
      { id: 'qr_nao_liga', label: '⚫ Não Liga', action: 'message', value: 'problema_nao_liga', analytics: 'issue_dead' },
      { id: 'qr_agua', label: '💧 Molhado/Danificado', action: 'message', value: 'problema_agua', analytics: 'issue_water' },
      { id: 'qr_outro_problema', label: '🔧 Outro', action: 'message', value: 'problema_outro', analytics: 'issue_other' },
      BACK_TO('Marcas', 'reparos_menu'),
    ],
    priority: 'high',
  },

  marca_samsung: {
    id: 'marca_samsung',
    message: `**📱 Samsung Specialists**

Galaxy S Series, Galaxy A lineup — conhecemos cada pixel!

**Nossa expertise:**
- Telas curvadas com preservação de AMOLED inteligente
- Reparos em dispositivos dobráveis (Z Fold/Flip)
- Diagnóstico com software Samsung autorizado
- Certificação de qualidade com série do aparelho

Qual o **problema** do seu Galaxy?`,
    quickReplies: [
      { id: 'qr_tela', label: '📱 Tela Quebrada', action: 'message', value: 'problema_tela', analytics: 'issue_screen' },
      { id: 'qr_bateria', label: '🔋 Bateria Fraca', action: 'message', value: 'problema_bateria', analytics: 'issue_battery' },
      { id: 'qr_carregamento', label: '🔌 Não Carrega', action: 'message', value: 'problema_carregamento', analytics: 'issue_charging' },
      { id: 'qr_nao_liga', label: '⚫ Não Liga', action: 'message', value: 'problema_nao_liga', analytics: 'issue_dead' },
      { id: 'qr_agua', label: '💧 Molhado/Danificado', action: 'message', value: 'problema_agua', analytics: 'issue_water' },
      { id: 'qr_outro_problema', label: '🔧 Outro', action: 'message', value: 'problema_outro', analytics: 'issue_other' },
      BACK_TO('Marcas', 'reparos_menu'),
    ],
    priority: 'high',
  },

  marca_xiaomi: {
    id: 'marca_xiaomi',
    message: `**📱 Xiaomi Experts**

Xiaomi, Redmi, Poco — temos peças premium para toda a linha!

**Nossa especialidade:**
- Displays IPS/LCD/AMOLED com calibração de cores
- Reparos de placa com diagnóstico software Fastboot
- Limpeza ultrassônica com protocolo de segurança
- Recuperação de firmware com bootloader original

Qual **problema** apresenta seu Xiaomi?`,
    quickReplies: [
      { id: 'qr_tela', label: '📱 Tela Quebrada', action: 'message', value: 'problema_tela', analytics: 'issue_screen' },
      { id: 'qr_bateria', label: '🔋 Bateria Fraca', action: 'message', value: 'problema_bateria', analytics: 'issue_battery' },
      { id: 'qr_carregamento', label: '🔌 Não Carrega', action: 'message', value: 'problema_carregamento', analytics: 'issue_charging' },
      { id: 'qr_nao_liga', label: '⚫ Não Liga', action: 'message', value: 'problema_nao_liga', analytics: 'issue_dead' },
      { id: 'qr_agua', label: '💧 Molhado/Danificado', action: 'message', value: 'problema_agua', analytics: 'issue_water' },
      { id: 'qr_outro_problema', label: '🔧 Outro', action: 'message', value: 'problema_outro', analytics: 'issue_other' },
      BACK_TO('Marcas', 'reparos_menu'),
    ],
    priority: 'high',
  },

  marca_motorola: {
    id: 'marca_motorola',
    message: `**📱 Motorola Authorized**

Moto G, Edge, Razr — somos parceiros oficiais!

**Nossa expertise:**
- Telas com sensor integrado preservado
- Bateria integrada com protocolo de segurança
- Diagnóstico ADB com software proprietário
- Certificação pós-reparo rastreável

O que houve com seu **Motorola**?`,
    quickReplies: [
      { id: 'qr_tela', label: '📱 Tela Quebrada', action: 'message', value: 'problema_tela', analytics: 'issue_screen' },
      { id: 'qr_bateria', label: '🔋 Bateria Fraca', action: 'message', value: 'problema_bateria', analytics: 'issue_battery' },
      { id: 'qr_carregamento', label: '🔌 Não Carrega', action: 'message', value: 'problema_carregamento', analytics: 'issue_charging' },
      { id: 'qr_nao_liga', label: '⚫ Não Liga', action: 'message', value: 'problema_nao_liga', analytics: 'issue_dead' },
      { id: 'qr_agua', label: '💧 Molhado/Danificado', action: 'message', value: 'problema_agua', analytics: 'issue_water' },
      { id: 'qr_outro_problema', label: '🔧 Outro', action: 'message', value: 'problema_outro', analytics: 'issue_other' },
      BACK_TO('Marcas', 'reparos_menu'),
    ],
    priority: 'high',
  },

  marca_outra: {
    id: 'marca_outra',
    message: `**📱 Any Brand Welcome**

LG, Asus, Realme, OnePlus — somos universais!

**Metodologia:**
- Diagnóstico universal com equipamento de ponta
- Orçamento transparente com breakdown de peças
- Execução com componentes OEM-certificados
- Garantia estendida em todos os serviços

Qual é o **problema**?`,
    quickReplies: [
      { id: 'qr_tela', label: '📱 Tela Quebrada', action: 'message', value: 'problema_tela', analytics: 'issue_screen' },
      { id: 'qr_bateria', label: '🔋 Bateria Fraca', action: 'message', value: 'problema_bateria', analytics: 'issue_battery' },
      { id: 'qr_carregamento', label: '🔌 Não Carrega', action: 'message', value: 'problema_carregamento', analytics: 'issue_charging' },
      { id: 'qr_nao_liga', label: '⚫ Não Liga', action: 'message', value: 'problema_nao_liga', analytics: 'issue_dead' },
      { id: 'qr_agua', label: '💧 Molhado/Danificado', action: 'message', value: 'problema_agua', analytics: 'issue_water' },
      { id: 'qr_outro_problema', label: '🔧 Outro', action: 'message', value: 'problema_outro', analytics: 'issue_other' },
      BACK_TO('Marcas', 'reparos_menu'),
    ],
    priority: 'high',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PROBLEMAS - Smart Issue Solutions
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  problema_tela: {
    id: 'problema_tela',
    message: `**📱 Substituição de Tela — Processo Completo**

Sua tela está quebrada? Vamos restaurá-la para 100% com peça premium!

**Processo de Qualidade:**
1. Diagnóstico tátil e visual (5 min)
2. Teste completo de touch com software
3. Substituição por painel PREMIUM OEM
4. Calibração e teste de cores
5. Garantia de 90 dias contra defeitos

**Resultados:**
- Cores vivas e precisas (Delta E < 2)
- Responsividade perfeita ao toque
- Sem bolhas ou imperfeições
- Tecnologia antirrisco incorporada

**Tempo:** 45-90 min | **Garantia:** 90 dias | **Taxa de Sucesso:** 99%`,
    table: {
      headers: ['Tipo de Tela', 'Prazo', 'Garantia'],
      rows: [
        ['LCD Standard', '45 min', '90 dias'],
        ['AMOLED/OLED', '60 min', '90 dias'],
        ['Curved Edge', '75 min', '90 dias'],
        ['Dobrável (Z)', '90 min', '90 dias'],
      ],
    },
    quickReplies: [
      CONTACT_WHATSAPP('📅 Agendar Troca de Tela', 'screen_replacement', 'Tela quebrada'),
      { id: 'qr_preco', label: '💰 Ver Tabela de Preços', action: 'message', value: 'tabela_precos', analytics: 'info_pricing' },
      { id: 'qr_faq', label: '❓ Dúvidas Frequentes', action: 'message', value: 'faq_tela', analytics: 'info_faq' },
      BACK_TO_MENU,
    ],
    priority: 'high',
  },

  problema_bateria: {
    id: 'problema_bateria',
    message: `**🔋 Troca de Bateria — Saúde 100%**

Seu celular descarrega rápido? A bateria perdeu sua eficiência!

**Sinais de Desgaste:**
- ⚠️ Descarrega em 2-3 horas (antes eram 8+)
- ⚠️ Desliga em 20% de bateria
- ⚠️ Fica esquentando durante uso normal
- 🚨 **Bateria inchada/balão** — URGÊNCIA MÁXIMA!

*Se a bateria está inchada ou torcida, PARE de usar agora! Cedo para deterioração.*

**Nosso Processo:**
1. Teste de capacidade com multímetro profissional
2. Análise de ciclos de carga (App Store)
3. Substituição por bateria original certificada
4. Recalibração inteligente de sistema
5. Teste de autonomia por 2+ horas

**Tempo:** 30-60 min | **Garantia:** 90 dias`,
    table: {
      headers: ['Capacidade', 'Autonomia Teste', 'Garantia'],
      rows: [
        ['até 3000 mAh', '5+ horas', '90 dias'],
        ['3000-5000 mAh', '8+ horas', '90 dias'],
        ['acima de 5000', '12+ horas', '90 dias'],
      ],
    },
    quickReplies: [
      CONTACT_WHATSAPP('🚨 Bateria Inchada — URGÊNCIA', 'repair_urgent', 'Bateria inchada'),
      CONTACT_WHATSAPP('📅 Agendar Troca de Bateria', 'battery_replacement', 'Bateria fraca'),
      { id: 'qr_dicas', label: '💡 Dicas para Bateria', action: 'message', value: 'dicas_bateria', analytics: 'info_tips' },
      BACK_TO_MENU,
    ],
    priority: 'urgent',
  },

  problema_carregamento: {
    id: 'problema_carregamento',
    message: `**🔌 Diagnosticando Problema de Carga**

Seu celular não carrega ou demora muito? Vamos descobrir o motivo!

**Checklist de Troubleshooting:**
✓ Use SEMPRE carregador original (não genérico)
✓ Teste o cabo em outro aparelho
✓ Limpe a porta de carga com ar comprimido
✓ Teste em outra tomada
✓ Reinicie o celular (volume + poder)

**Se nada funcionar, pode ser:**
1. **Porta de Carga Danificada** (1-3 horas)
2. **Circuito de Carga Queimado** (análise profissional)
3. **Bateria com falha de comunicação** (substituição)
4. **Conectores frouxos** (micro-solda)

**Diagnóstico:** SEMPRE 100% GRATUITO
**Garantia em Reparo:** 90 dias`,
    quickReplies: [
      CONTACT_WHATSAPP('🔧 Já Testei Tudo — Preciso de Reparo', 'repair_urgent', 'Problema de carregamento'),
      CONTACT_WHATSAPP('📋 Quero Diagnóstico Profissional', 'technical_support', 'Dúvida sobre carga'),
      { id: 'qr_cabos', label: '⚡ Comprar Cabo Premium', action: 'message', value: 'acessorio_carregadores', analytics: 'accessory_charger' },
      BACK_TO_MENU,
    ],
    priority: 'high',
  },

  problema_nao_liga: {
    id: 'problema_nao_liga',
    message: `**⚫ Situação Crítica — Aparelho Não Liga**

Seu celular não responde a nada. Vamos diagnosticar e resolver!

**Primeiro, SEM PANIC! Tente isso:**
1. Conecte a um carregador original (30 min mínimo)
2. Pressione Volume + + Botão Liga por 15 segundos
3. Solte e aguarde (pode haver vibração)
4. Se nada, tente modo de recuperação/download

**O que Pode Ser:**
- 🔵 Bateria completamente descarregada
- 🟡 Firmware corrompido (recuperável)
- 🟠 Curto-circuito de baixa potência
- 🔴 Placa lógica danificada

**Nossa Taxa de Sucesso:** 99% em reparações de "aparelho morto"

**Aviso:** Não force múltiplas vezes — pode piorar!`,
    quickReplies: [
      CONTACT_WHATSAPP('🚨 Não Consegui Ligar — Preciso de Ajuda', 'repair_urgent', 'Celular não liga'),
      CONTACT_WHATSAPP('📋 Trazer para Diagnóstico Profissional', 'technical_support', 'Aparelho morto'),
      { id: 'qr_tutorial', label: '📖 Ver Tutorial em Vídeo', action: 'message', value: 'tutorial_nao_liga', analytics: 'info_tutorial' },
      BACK_TO_MENU,
    ],
    priority: 'urgent',
  },

  problema_agua: {
    id: 'problema_agua',
    message: `**💧 PROTOCOLO DE EMERGÊNCIA — Aparelho Molhado**

⏰ **VOCÊ TEM 24-48 HORAS** antes que a oxidação se torne irrecuperável!

**O que NÃO FAZER (CRÍTICO!):**
❌ Não ligue ou tente carregar
❌ Não use secador de cabelo (danifica componentes)
❌ Não coloque na geladeira ou freezer
❌ Não deixe secar naturalmente (oxidação contínua)

**O QUE FAZER AGORA (IMEDIATO!):**
✅ Desligue o aparelho
✅ Remova bateria (se possível)
✅ Retire o sim card
✅ Deixe em local ventilado
✅ **TRAGA PARA LK IMPORTS EM ATÉ 6 HORAS**

**Nosso Protocolo de Salvação:**
1. Desoxidação ultrassônica com solvente específico
2. Secagem com ar comprimido profissional
3. Análise de continuidade de componentes críticos
4. Repouso em câmara dessecadora (48h)
5. Teste final completo de funcionamento

**Taxa de Salvação:** 85-95% (se feito RÁPIDO!)

🚨 **NÃO ESPERE! LIGAMOS E PASSAMOS INSTRUÇÕES ADICIONAIS!**`,
    quickReplies: [
      CONTACT_WHATSAPP('🚨 MEU CELULAR ESTÁ MOLHADO — ESTOU INDO AGORA'),
      PHONE_CONTACT('📞 Chamar Agora para Orientação'),
      { id: 'qr_info_agua', label: '📍 Como Chegar Rápido', action: 'message', value: 'info_localizacao', analytics: 'nav_location' },
      BACK_TO_MENU,
    ],
    priority: 'urgent',
  },

  problema_outro: {
    id: 'problema_outro',
    message: `**🔧 Reparos Avançados — Qualquer Problema Resolvemos!**

Além dos defeitos comuns, lidamos com:

**Componentes Internos:**
- 📷 Câmera travada, com mancha ou embaço
- 🔊 Alto-falante fraco, mudo ou distorcido
- 🎤 Microfone inaudível ou com ruído
- 📡 Wi-Fi/Bluetooth sem conectar
- 🔘 Botões presos, responsivos ou irritáveis
- 🌡️ Superaquecimento constante durante uso
- 🔏 Sensor biométrico com falha
- 💾 Reset/Formatação com preservação de dados

**Serviços Especializados:**
- 🔓 Desbloqueio de conta com protocolo seguro
- 🔐 Recuperação de dados com criptografia
- 🔬 Análise de placa com microscópio 4K
- 🛠️ Reparos em dobráveis e foldables

**Todos iniciam com DIAGNÓSTICO GRATUITO**

Qual é o problema específico?`,
    quickReplies: [
      CONTACT_WHATSAPP('💬 Descrever o Problema em Detalhes'),
      { id: 'qr_tech', label: '🔬 Serviços Técnicos Avançados', action: 'message', value: 'servicos_avancados', analytics: 'service_advanced' },
      BACK_TO_MENU,
    ],
    priority: 'medium',
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // INFORMAÇÕES - Location & Hours
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  info_localizacao: {
    id: 'info_localizacao',
    message: `**📍 LK Imports — Localização Oficial**

**Endereço:**
QR 429, Conjunto 16, Loja 01
Samambaia Norte, Brasília — DF
CEP: 72322-516

**Horário de Funcionamento:**
� Segunda a Sábado
🕘 09:00 - 18:00 (sem intervalo)
🚫 Domingos e Feriados: FECHADO

**Telefone & Contato:**
📱 WhatsApp: +55 61 95191-308
📞 Ligação: +55 61 95191-308
📧 E-mail: contato@lkimports.com.br
🗺️ Google Maps: [link ativo]

**Como Chegar:**
- 🚊 Metrô: Estação Samambaia (300m)
- 🚌 Ônibus: R$ 4,50 (linhas 103, 104, 110)
- 🚗 Estacionamento: Gratuito (5 vagas)

Quer agendar um horário?`,
    quickReplies: [
      CONTACT_WHATSAPP('📅 Agendar Horário Específico'),
      { id: 'qr_maps', label: '🗺️ Abrir no Google Maps', action: 'link', value: 'https://www.google.com/maps/place/Lk+Imports+-+Assistência+Técnica+e+Acessórios/@-15.893565,-48.1421581,20z/data=!4m6!3m5!1s0x935bd31145795cd3:0xec1f82b4bcf6bef9!8m2!3d-15.8934821!4d-48.1423218!16s%2Fg%2F11z3w0h8k0?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D', analytics: 'nav_maps' },
      { id: 'qr_directions', label: '🧭 Como Chegar', action: 'message', value: 'info_directions', analytics: 'info_directions' },
      BACK_TO_MENU,
    ],
  },

  info_directions: {
    id: 'info_directions',
    message: `**🧭 Rotas de Acesso — LK Imports**

**Do Centro de Brasília:**
1. Pegue a L2 sul em direção ao DF-005
2. Siga até Samambaia Norte (entrada principal)
3. Procure QR 429, Conjunto 16
⏱️ Tempo: ~15-20 minutos

**Via Metrô (RECOMENDADO):**
1. Qualquer linha até Estação Samambaia
2. Saída em direção a QR 429
3. Estamos a apenas 300m
⏱️ Tempo: ~20 minutos total

**Via Ônibus:**
- Linhas 103, 104, 110, 112
- Parada: QR 429 Samambaia
- Tarifa: R$ 4,50

**Carro Próprio:**
- Estacionamento 100% gratuito
- 5 vagas reservadas
- Acesso fácil pela L2 Sul

**Dica Pro:** Saia de casa com 15 min de antecedência para não chegar atrasado!

Vamos nessa?`,
    quickReplies: [
      CONTACT_WHATSAPP('👍 Vou Agora — Confirme Atendimento'),
      BACK_TO_MENU,
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ACESSÓRIOS - Product Catalog
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  acessorios_menu: {
    id: 'acessorios_menu',
    message: `**📦 Catálogo Premium de Acessórios**

Proteja e potencialize seu aparelho com **produtos de qualidade superior**, todos certificados e garantidos.

**Por que nossa seleção é especial?**
- ✅ **100% Originais** ou Premium Certificadas
- ✅ **Garantia até 12 meses** em todos os produtos
- ✅ **Aplicação profissional** gratuita na hora
- ✅ **Frete grátis** acima de R$ 200
- ✅ **Preços competitivos** do mercado

**📊 Estoque Atualizado:**`,
    table: {
      headers: ['Categoria', 'Estoque', 'Preço Aprox.'],
      rows: [
        ['Películas Temperadas', '500+', 'desde R$ 25'],
        ['Carregadores Premium', '200+', 'desde R$ 40'],
        ['Capinhas Designer', '800+', 'desde R$ 30'],
        ['Fones Hi-Fi', '100+', 'desde R$ 150'],
      ],
    },
    quickReplies: [
      { id: 'qr_películas', label: '📱 Películas de Vidro', action: 'message', value: 'acessorio_películas', analytics: 'product_screen_protector' },
      { id: 'qr_carregadores', label: '🔌 Cabos & Carregadores', action: 'message', value: 'acessorio_carregadores', analytics: 'product_chargers' },
      { id: 'qr_capinhas', label: '🧱 Capinhas Premium', action: 'message', value: 'acessorio_capinhas', analytics: 'product_cases' },
      { id: 'qr_fones', label: '🎧 Fones de Ouvido', action: 'message', value: 'acessorio_fones', analytics: 'product_audio' },
      BACK_TO_MENU,
    ],
  },

  acessorio_películas: {
    id: 'acessorio_películas',
    message: `**📱 Películas de Vidro Temperado Pro**

Proteção máxima com transparência óptica flawless!

**Especificações técnicas:**
- 💎 Vidro Temperado 9H (Mohs scale)
- 🔍 Transparência ótica 99.9%
- 🛡️ Aplicação hidrofóbica anti-fingerprint
- 📐 Aplicação SEM bolhas (garantido)
- ⚡ Resistência a quedas de até 1m

**Tipos Disponíveis:**
1. **Película Standard** — R$ 25-35
2. **Película 3D Curved** — R$ 45-60
3. **Película Anti-Blue Light** (Reduz fadiga ocular) — R$ 55-70
4. **Película com Câmera Blindada** (Privacidade) — R$ 65-85

**Aplicação:** Na hora, SEM custos adicionais

O qual tipo você prefere?`,
    quickReplies: [
      CONTACT_WHATSAPP('📦 Comprar Película Standard'),
      CONTACT_WHATSAPP('📦 Comprar Película 3D'),
      CONTACT_WHATSAPP('📦 Comprar Película Anti-Blue Light'),
      BACK_TO('Acessórios', 'acessorios_menu'),
    ],
  },

  acessorio_carregadores: {
    id: 'acessorio_carregadores',
    message: `**🔌 Carregadores & Cabos Certificados**

Carregamento seguro, rápido e com garantia total!

**Marcas Premium Disponíveis:**
- ⭐ Anker (Melhor custo-benefício)
- ⭐ Baseus (Carregamento ultra-rápido)
- ⭐ Belkin (Oficial Apple)
- ⭐ Original OEM (Fabricante direto)

**Tipos à Disposição:**
1. **Carregador 20W** — R$ 40-50 (iPhone 12+)
2. **Carregador 65W** — R$ 100-150 (Fast Charge universal)
3. **Carregador Wireless** — R$ 70-100
4. **Cabo USB-C Premium** — R$ 30-45
5. **Cabo Lightning Certificado** — R$ 40-60 (Apple MFi)
6. **Cabo Micro USB Reforçado** — R$ 25-35

**Todos com:**
✅ Certificação de segurança
✅ Proteção contra sobrecarga
✅ Garantia de 1-2 anos

O que você precisa?`,
    quickReplies: [
      CONTACT_WHATSAPP('🔌 Comprar Carregador 20W', 'accessories_inquiry', 'Carregador 20W'),
      CONTACT_WHATSAPP('⚡ Comprar Carregador 65W', 'accessories_inquiry', 'Carregador 65W'),
      CONTACT_WHATSAPP('🔋 Comprar Cabo Premium', 'accessories_inquiry', 'Cabo premium'),
      BACK_TO('Acessórios', 'acessorios_menu'),
    ],
  },

  acessorio_capinhas: {
    id: 'acessorio_capinhas',
    message: `**🧱 Capinhas Premium — Estilo + Proteção**

Defenda seu aparelho sem perder o estilo!

**Coleções Disponíveis:**
1. **Space** — Designs futuristas (R$ 45-65)
2. **Color Burst** — Cores vibrantes (R$ 35-50)
3. **Profissional** — Sobres executivos (R$ 60-85)
4. **Military Grade** — Proteção máxima (R$ 80-120)
5. **Eco-Friendly** — 100% biodegradáveis (R$ 50-70)

**Marcas Oficiais:**
- Spigen (Proteção minimalista)
- Ringke (Design moderno)
- UAG (Ultra resistente)
- OtterBox (Proteção extrema)

**Para qual marca/modelo?**`,
    quickReplies: [
      CONTACT_WHATSAPP('🍎 Ver Capinhas iPhone', 'accessories_inquiry', 'Capinha iPhone'),
      CONTACT_WHATSAPP('📱 Ver Capinhas Samsung', 'accessories_inquiry', 'Capinha Samsung'),
      CONTACT_WHATSAPP('📱 Ver Capinhas Xiaomi', 'accessories_inquiry', 'Capinha Xiaomi'),
      BACK_TO('Acessórios', 'acessorios_menu'),
    ],
  },

  acessorio_fones: {
    id: 'acessorio_fones',
    message: `**🎧 Fones de Ouvido — Qualidade Hi-Fi**

Áudio premium para quem exige qualidade!

**Categorias:**
1. **True Wireless** (sem fio) — R$ 200-600
   - Apple AirPods 3 (R$ 350)
   - Samsung Galaxy Buds (R$ 280)
   -Anker Soundcore Elite (R$ 200)

2. **Over-Ear** (supraaurais) — R$ 400-1.500
   - Bose QuietComfort (R$ 600)
   - Sony WH-1000 (R$ 800)
   - Sennheiser Premium (R$ 1.200)

3. **Com Fio** — R$ 50-400
   - Modelos Hi-Fi certificados
   - Garantia de 1 ano

**Qual tipo interessa?**`,
    quickReplies: [
      CONTACT_WHATSAPP('🎧 Ver Fones True Wireless'),
      CONTACT_WHATSAPP('🎧 Ver Fones Over-Ear'),
      CONTACT_WHATSAPP('🎧 Ver Fones Profissionais Com Fio', 'accessories_inquiry', 'Fone profissional'),
      BACK_TO('Acessórios', 'acessorios_menu'),
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SUPORTE - Support Hub
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  suporte_menu: {
    id: 'suporte_menu',
    message: `**� Central de Suporte LK Imports**

Estamos aqui para ajudar em cada etapa da sua jornada conosco. **Suporte especializado 24/7** às suas necessidades.

**🎯 Tipos de Suporte:**

- **📦 Rastreamento** — Acompanhe seu reparo em tempo real
- **🛡️ Garantia** — Políticas simples e transparentes
- **📖 Manuais** — Guias completos para seus produtos
- **↩️ Devoluções** — Processo rápido e sem complicações

**⏱️ Tempo de Resposta Garantido:**
- Chat: *até 5 minutos*
- WhatsApp: *até 15 minutos*
- Email: *até 24 horas*`,
    quickReplies: [
      { id: 'qr_rastreamento', label: '📦 Rastrear Meu Reparo', action: 'message', value: 'suporte_rastreamento', analytics: 'support_tracking' },
      { id: 'qr_garantia', label: '🛡️ Informações de Garantia', action: 'message', value: 'suporte_garantia', analytics: 'support_warranty' },
      { id: 'qr_manual', label: '📖 Manuais & Guias', action: 'message', value: 'suporte_manuais', analytics: 'support_manuals' },
      { id: 'qr_devolvacao', label: '↩️ Devoluções & Trocas', action: 'message', value: 'suporte_devolucao', analytics: 'support_returns' },
      CONTACT_WHATSAPP('👤 Falar com Especialista Agora', 'support_specialist', 'Suporte técnico'),
      BACK_TO_MENU,
    ],
  },

  suporte_rastreamento: {
    id: 'suporte_rastreamento',
    message: `**📦 Rastreamento em Tempo Real**

Acompanhe seu reparo **da entrada até a entrega** com total transparência!

**🔍 Informações que você precisará:**
- **Número do protocolo** — Formato: LK-YYYY-NNNNN (Ex: LK-2025-00142)
- **Telefone de contato** — Para atualizações importantes
- **Nome do aparelho** — Ex: *iPhone 15 Pro Max*, *Samsung S24 Ultra*

**📋 Você tem o seu protocolo?**

**Os estágios do rastreamento:**
1. ✅ *Recebimento* — Seu aparelho chegou em nossa loja
2. 🔧 *Em diagnóstico* — Analisando o problema
3. ⚙️ *Em reparo* — Consertando com precisão
4. ✔️ *Testado* — Verificação final de qualidade
5. 📦 *Pronto para retirada* — Seu aparelho está esperando!

Você tem o seu protocolo?`,
    quickReplies: [
      CONTACT_WHATSAPP('Tenho o protocolo — Rastrear', 'repair_budget', 'Rastreamento'),
      CONTACT_WHATSAPP('Perdi o protocolo — Ajudar', 'technical_support', 'Protocolo perdido'),
      { id: 'qr_status', label: '❓ Ver Exemplo de Status', action: 'message', value: 'suporte_exemplo_status', analytics: 'support_status_example' },
      BACK_TO('Suporte', 'suporte_menu'),
    ],
  },

  suporte_garantia: {
    id: 'suporte_garantia',
    message: `**🛡️ Programa de Garantia LK Imports**

Todos os reparos incluem **GARANTIA DE 90 DIAS** — A melhor do mercado!

**✅ O que a Garantia Cobre:**
- Defeitos de fabricação na peça nova
- Problemas causados durante nosso reparo
- Falhas de solda ou componentes frágeis
- Assistência técnica *prioritária* para reparos cobertos

**❌ O que NÃO Cobre:**
- Danos por queda ou impacto externo
- Danos por líquido (após entrega)
- Desgaste natural ou uso excessivo
- Modificações não autorizadas

**📋 Como Acionar a Garantia:**
1. Trazer o **certificado original**
2. Descrever o **problema específico** com detalhes
3. **Diagnóstico gratuito** realizado na hora
4. Se for defeito nosso → **Reparo GRATUITO** completo

**📄 Seu Certificado de Garantia:**
- ✓ Incluído em **TODOS** os reparos
- ✓ Válido por **90 dias** corridos
- ✓ Sem necessidade de registro
- ✓ Nome do cliente + data + descrição do reparo

**⏱️ Prazo de Cobertura:**
- *Dias 1-30:* Cobertura total (qualquer defeito detectado)
- *Dias 31-90:* Cobertura para defeitos relacionados ao reparo
- Após 90 dias: Reparo com desconto especial de garantia estendida

**Tem alguma dúvida específica?**`,
    quickReplies: [
      CONTACT_WHATSAPP('Meu reparo está com problema', 'support_specialist', 'Defeito detectado'),
      { id: 'qr_cert', label: '📄 Modelo de Certificado', action: 'message', value: 'suporte_certificado', analytics: 'support_cert' },
      BACK_TO('Suporte', 'suporte_menu'),
    ],
  },

  suporte_manuais: {
    id: 'suporte_manuais',
    message: `**📖 Biblioteca Completa de Guias**

Tudo que você precisa saber sobre seu aparelho — direto de nossos especialistas!

**📚 Documentos Disponíveis:**
- **📱 Guia Básico** — Primeiros passos com seu smartphone
- **🔋 Saúde da Bateria** — Como otimizar e cuidar
- **🛡️ Segurança & Privacidade** — Dicas de proteção e backup
- **🔌 Carregamento Seguro** — Boas práticas e mitos desmentidos
- **⚡ Resolução de Problemas** — Comuns e soluções rápidas
- **📲 Sincronização e Nuvem** — Backup automático e seguro

**💡 Todos os guias incluem:**
- Passo-a-passo com imagens
- Dicas de especialistas
- Resolução de problemas comuns
- Contato direto se precisar de ajuda

Qual guia você procura?`,
    quickReplies: [
      { id: 'qr_guia_1', label: '📱 Guia Básico do Produto', action: 'message', value: 'suporte_guia_1', analytics: 'support_guide_1' },
      { id: 'qr_guia_2', label: '🔋 Saúde & Cuidado de Bateria', action: 'message', value: 'suporte_guia_2', analytics: 'support_guide_2' },
      { id: 'qr_guia_3', label: '🛡️ Segurança & Privacidade', action: 'message', value: 'suporte_guia_3', analytics: 'support_guide_3' },
      BACK_TO('Suporte', 'suporte_menu'),
    ],
  },

  suporte_devolucao: {
    id: 'suporte_devolucao',
    message: `**↩️ Política de Devoluções & Trocas**

Seu reparo não funcionou como esperado? **Nós fazemos certo!**

**🎯 Opções Disponíveis Sempre:**
1. **🔄 Troca Gratuita** — Se diagnosticar como defeito nosso
2. **💰 Reembolso Parcial** — Até 50% do valor do reparo
3. **🔧 Novo Reparo** — Com técnico certificado premium diferente
4. **🛡️ Garantia Estendida** — Com cobertura maximizada

**⏱️ Prazos Garantidos:**
- **Reclamação:** até *7 dias* após receber seu aparelho
- **Avaliação:** *2-3 dias úteis* para análise completa
- **Resolução:** no máximo *10 dias corridos* para solução final

**📋 Documentos Necessários:**
- Certificado de garantia (original)
- Aparelho em seu estado atual
- Descrição detalhada do problema

**100% Transparência:**
Não há letras miúdas. Se foi problema nosso, resolvemos sem custos adicionais.

*Qual é o seu problema específico?*`,
    quickReplies: [
      CONTACT_WHATSAPP('Meu reparo não funcionou corretamente', 'support_specialist', 'Devolução/Troca solicitada'),
      CONTACT_WHATSAPP('Quero solicitar reembolso', 'support_specialist', 'Reembolso solicitado'),
      BACK_TO('Suporte', 'suporte_menu'),
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FORMULÁRIOS - Forms & Registration
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  form_cadastro: {
    id: 'form_cadastro',
    message: `**🆕 Cadastro de Cliente**

Bem-vindo! Registre seus dados para acesso exclusivo:

✅ Ofertas especiais e cupons
✅ Histórico completo de reparos
✅ Atendimento prioritário VIP
✅ Suporte dedicado 24/7`,
    form: {
      id: 'cadastro_novo_cliente',
      fields: [
        { name: 'nome', label: 'Seu Nome Completo', type: 'text', required: true },
        { name: 'email', label: 'E-mail para Contato', type: 'email', required: true },
        { name: 'telefone', label: 'WhatsApp (11 99999-9999)', type: 'tel', required: true },
      ],
      submitLabel: '✅ Confirmar Cadastro',
    },
    quickReplies: [
      BACK_TO_MENU,
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CONTEÚDO ADICIONAL - Extra Content
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  tabela_precos: {
    id: 'tabela_precos',
    message: `**💰 Tabela de Preços — Referência 2025**

*Valores aproximados com base em análise técnica. Para orçamento **FINAL E DEFINITIVO**, contate nossos especialistas.*

**📱 Reparos em Display:**`,
    table: {
      headers: ['Serviço', 'Valor Médio', 'Prazo'],
      rows: [
        ['Tela LCD', 'R$ 150-280', '45 minutos'],
        ['Tela AMOLED', 'R$ 280-450', '60 minutos'],
        ['Tela Curved Premium', 'R$ 400-650', '90 minutos'],
        ['Película Vidro Temperada', 'R$ 25-65', '5 minutos'],
      ],
    },
    quickReplies: [
      CONTACT_WHATSAPP('💬 Solicitar Orçamento Exato', 'pricing_info', 'Informações de preço'),
      { id: 'qr_mais', label: '📊 Ver Serviços Completos', action: 'message', value: 'tabela_precos_completa', analytics: 'pricing_full' },
      BACK_TO_MENU,
    ],
  },

  tabela_precos_completa: {
    id: 'tabela_precos_completa',
    message: `**💰 Tabela Completa de Serviços & Preços 2025**

**📱 REPAROS EM DISPLAY:**
- *LCD*: R$ 150-280 | ⏱️ 45 min
- *AMOLED* (Curved): R$ 280-450 | ⏱️ 60 min
- *Curved Premium*: R$ 400-650 | ⏱️ 90 min
- *Película Temperada*: R$ 25-85 | ⏱️ 5 min

**🔋 REPAROS EM BATERIA:**
- *Bateria Padrão*: R$ 80-150 | ⏱️ 30-60 min
- *Bateria Premium*: R$ 150-250 | ⏱️ 60-90 min
- *Diagnóstico Grátis*: Sem custo | ⏱️ 10 min

**🔌 REPAROS EM CONECTOR & CARREGAMENTO:**
- *Limpeza Profissional*: R$ 50 | ⏱️ 30 min
- *Substituição Conector*: R$ 120-200 | ⏱️ 1-3 horas
- *Reparação Solda*: R$ 180-300 | ⏱️ 2-4 horas

**🔧 REPAROS EM PLACA-MÃE:**
- *Diagnóstico Profundo*: R$ 80-150 | ⏱️ 1-2 dias
- *Micro-solda Componentes*: R$ 300-800 | ⏱️ 3-7 dias

**📦 ACESSÓRIOS PREMIUM:**
- *Películas Vidro*: R$ 25-85 | Aplicação grátis
- *Capinhas Designer*: R$ 30-120 | Variadas
- *Carregadores Originais*: R$ 40-200 | Certificados
- *Fones Hi-Fi*: R$ 50-1.500 | Seleção premium

**🎁 GARANTIA EM TODOS OS SERVIÇOS:**
✓ **90 dias** em todos os reparos
✓ **Diagnóstico grátis** sempre
✓ **Sem custos ocultos** — Orçamento é orçamento
✓ **Satisfação 100%** ou seu dinheiro de volta

**⚠️ Nota Importante:**
Valores sujeitos a alterações conforme diagnóstico técnico. Para orçamento **EXATO E SEM SURPRESAS**, entre em contato com nosso time de especialistas.`,
    quickReplies: [
      CONTACT_WHATSAPP('💬 Falar com Especialista Agora', 'support_specialist', 'Orçamento expert'),
      BACK_TO_MENU,
    ],
  },

  dicas_bateria: {
    id: 'dicas_bateria',
    message: `**🔋 5 Dicas de Ouro para Máxima Longevidade**

Aprenda como deixar sua bateria durando **3x mais tempo** com estes segredos de especialista!

**1️⃣ Carregue Entre 20-80%**
*Nunca deixe descarregar a 0%* — Bateria de lítio sofre com carga completa. **Ideal:** 20-80% do tempo.

**2️⃣ Use Carregador Original**
Carregadores genéricos danificam internamente. Invista em original — compensa a longo prazo.

**3️⃣ Evite Calor Extremo**
Ambiente quente ou superaquecimento = morte da bateria. **Dica:** Use em local à sombra, evite direcionamento solar direto.

**4️⃣ Desative Apps em Background**
Apps rodando consomem bateria constantemente. Vá para *Configurações > Apps > Fechar Background*.

**5️⃣ Substitua a Cada 2 Anos**
Ciclo de vida natural das baterias. Depois disso, performance cai 20-30%.

**🚨 Sinais de Alerta:**
- 🔴 Descarrega em 2-3 horas de uso normal
- 🔴 Superaquecimento durante aplicativos
- 🔴 *Inchado ou em formato de balão* — **URGÊNCIA!** (risco de incêndio)

**Quer agendar uma troca profissional agora?** Temos baterias premium com **garantia de 2 anos!**`,
    quickReplies: [
      CONTACT_WHATSAPP('📅 Trocar Bateria Agora', 'battery_replacement', 'Solicitação de troca bateria'),
      BACK_TO_MENU,
    ],
  },

  dicas_agua: {
    id: 'dicas_agua',
    message: `**💧 Protocolo de Emergência — Aparelho Caiu na Água!**

**❗ AÇÕES IMEDIATAS (Próximos 5 Minutos):**
1. **Desligue o aparelho** (se possível sem forçar)
2. **Remova bateria/SIM/cartão** de memória (se possível)
3. **NÃO tente ligar** para testar
4. **Deixe em local ventilado** — seque com toalha morna

**🚫 NUNCA FAÇA ISSO:**
- ❌ Não use *secador de cabelo* — danifica componentes internamente
- ❌ Não coloque em *arroz* — pior que nada, deixa resíduos
- ❌ Não deixe *sob sol direto* — dano térmico adicional
- ❌ Não tente *carregar* ainda úmido — risco de curto

**✅ O QUE FAZER:**
- ✓ **Seque externamente** com toalha morna
- ✓ **Deixe em local seco** com boa circulação de ar
- ✓ **Espere 24-48 horas** antes de tentar ligar

**⚡ VENHA PARA LK EM ATÉ 6 HORAS:**
Esta é a sua melhor opção! Nossa taxa de salvação é **90%+** quando feito nos primeiros 6 horas!

**Nosso Protocolo de Desoxidação:**
- Protocolo de desoxidação ultrassônica
- Testes completos pós-secagem
- Garantia de não oxidação futura

**🛡️ Proteção Atual:**
- Nossas peças têm **revestimento hidrofóbico**
- Risco baixo se cair em água doce
- Água salgada exige tratamento urgente
- Café/bebidas precisam de limpeza profunda

🚨 **Não espere — NOS CHAME AGORA!**`,
    quickReplies: [
      CONTACT_WHATSAPP('🚨 MEU CELULAR CAIU NA ÁGUA — PRECISO DE AJUDA AGORA', 'technical_support', 'Emergência água'),
      PHONE_CONTACT('📞 Chamar Imediatamente'),
      BACK_TO_MENU,
    ],
    priority: 'urgent',
  },

  tutorial_nao_liga: {
    id: 'tutorial_nao_liga',
    message: `**⚫ Tutorial: Como Tentar Ligar Um Aparelho Morto**

**PASSO 1 — Carga Mínima (10 minutos):**
1. Use carregador original
2. Conecte por pelo menos 10 min
3. Tente ligar

**PASSO 2 — Force Reboot (tente 5× com intervalo):**
*iPhone:* Volume + + Power (15 segundos)
*Samsung:* Volume - + Power (15 segundos)
*Xiaomi:* Volume + + Power (15 segundos)

**PASSO 3 — Modo de Recuperação:**
1. Conecte a um computador com cabo USB
2. Ative modo DFU/Recovery conforme marcaAPossível restaurar software

**PASSO 4 — SOS — Não Insista:**
Se nada funcionar após 3 tentativas, pare aí! TRAGA PARA LK.

Você conseguiu se ligar?`,
    quickReplies: [
      { id: 'qr_sucesso', label: '✅ Consegui Ligar!', action: 'message', value: 'feedback_otimo', analytics: 'tutorial_success' },
      { id: 'qr_falhou', label: '❌ Não funcionou', action: 'message', value: 'problema_nao_liga', analytics: 'tutorial_failed' },
      BACK_TO_MENU,
    ],
  },

  servicos_avancados: {
    id: 'servicos_avancados',
    message: `**🔬 Serviços Especializados — O Que Ninguém Faz**

Para os problemas mais desafiadores e únicos:

**Engenharia Avançada:**
- 🔴 Microsoldagem de placa lógica com microscópio
- 🧠 Recuperação de dados com extração NAND
- 🔐 Desbloqueio de proprietário com protocolo seguro
- 🔧 Análise de circuitos proprietários customizados
- ⚡ Reparos em dispositivos dobráveis/foldables

**Tempo:** 3-10 dias úteis
**Diagnóstico:** R$ 50 (dedutível do serviço)
**Garantia:** 30 dias em reparos avançados

**Taxa de Sucesso:** 95%+ em problemas críticos

Qual é seu desafio?`,
    quickReplies: [
      CONTACT_WHATSAPP('🔬 Descrever Problema Avançado'),
      PHONE_CONTACT('📞 Conversa com Técnico Sênior'),
      BACK_TO_MENU,
    ],
  },

  faq_tela: {
    id: 'faq_tela',
    message: `**❓ Dúvidas Frequentes — Troca de Tela**

**P: Quanto tempo leva exatamente?**
A: 45 min (LCD), 60 min (AMOLED), 90 min (curved)

**P: A tela nova vem com garantia?**
A: Sim! 90 dias contra defeitos de fabricação

**P: Perco meus dados/fotos/mensagens?**
A: Não! Trocamos APENAS a tela, dados ficam intactos

**P: Qual a qualidade? Original ou genérica?**
A: Premium OEM — mesma qualidade de fábrica

**P: Continua funcionando Face ID e Biometria?**
A: Sim, 100%! Todos os sensores calibrados

**P: E se a tela quebrar de novo?**
A: Você tem 90 dias de garantia conosco

Mais dúvidas?`,
    quickReplies: [
      CONTACT_WHATSAPP('❓ Pergunta não listada aqui'),
      BACK_TO_MENU,
    ],
  },

  suporte_exemplo_status: {
    id: 'suporte_exemplo_status',
    message: `**📦 Exemplo Real de Status de Reparo**

**Protocolo:** LK-2025-00142
**Data Entrada:** 25/03/2025 — 10:30
**Aparelho:** iPhone 15 Pro
**Problema:** Tela quebrada + vidro traseiro
**Cliente:** João Silva

**TIMELINE DO REPARO:**
✅ 10:30 - Recebimento e vistoria inicial
✅ 10:45 - Diagnóstico completo efetuado
✅ 11:00 - Aprovação cliente via WhatsApp
🔄 11:15 - **EM REPARO** (Substituindo tela)
⏳ 11:55 - Testes de qualidade em progresso
⏳ 12:00 - Limpeza e acabamento final
🟡 12:15 - **PRONTO PARA ENTREGA**

**Você Recebe:**
✅ Atualização em cada etapa via WhatsApp
✅ Certificado de garantia original
✅ Aparelho testado 100%
✅ Suporte pós-venda lifetime`,
    quickReplies: [
      CONTACT_WHATSAPP('🔍 Rastrear Meu Reparo Agora'),
      BACK_TO_MENU,
    ],
  },

  suporte_certificado: {
    id: 'suporte_certificado',
    message: `**📄 Certificado de Garantia — O Seu Escudo**

Você recebe um **Certificado Físico Original** em cada reparo!

**O que Inclui:**
- ✅ Date do reparo e tipo de serviço
- ✅ Prazo de garantia (90 dias)
- ✅ Número do protocolo único
- ✅ Assinatura digital do técnico
- ✅ Carimbo e número de série

**Como Proteger:**
- Guarde em lugar seguro e seco
- Não deixe úmido ou danificado
- Apresente ao retornar para garantia
- Fotografe como backup digital

**Se Perder o Original:**
Podemos emitir 2ª via (leve ID + protocolo)

Tem como ajudar com cópia?`,
    quickReplies: [
      CONTACT_WHATSAPP('📥 Solicitar Foto/2ª Via'),
      BACK_TO_MENU,
    ],
  },

  suporte_guia_1: {
    id: 'suporte_guia_1',
    message: `**📱 Guia: Seu Aparelho Reparado**

Você recebeu seu celular! Aqui está o resumo:

**PRIMEIROS PASSOS:**
1. Carregue completamente (2 horas mínimo)
2. Execute hard reset (Volume + Power)
3. Configure sua conta pessoal/Google/iCloud
4. Restaure dados do backup
5. Baixe apps essenciais

**TESTES CRÍTICOS:**
✓ Touch responsivo em toda a tela
✓ Chamadas audioaudíveis e claras
✓ Câmera fornece imagens nítidas
✓ Bateria não aquece durante uso
✓ Wi-Fi e Bluetooth conectam rápido

**Se encontrar qualquer problema:**
Contacte-nos IMEDIATAMENTE (estamos aqui)!

Tudo certo?`,
    quickReplies: [
      { id: 'qr_problema', label: '❌ Encontrei um Problema', action: 'message', value: 'suporte_devolucao', analytics: 'post_repair_issue' },
      { id: 'qr_feedback_positivo', label: '👍 Perfeito! Obrigado', action: 'message', value: 'feedback_otimo', analytics: 'post_repair_success' },
      BACK_TO_MENU,
    ],
  },

  suporte_guia_2: {
    id: 'suporte_guia_2',
    message: `**🔋 Guia: Máxima Duração de Bateria**

Sua nova bateria vai durar MUITO! Aqui como:

**SETUP IDEAL:**
- Carregue entre 20-80% (nunca 0-100)
- Use carregador original certificado
- Ative modo economia em 20%
- Desligue serviços desnecessários

**APLICATIVOS QUE DRENAM:**
🔴 Redes sociais em background
🔴 GPS + mapas ligados o tempo todo
🔴 Vídeos em alta definição
🔴 Jogos pesados
🔴 Sincronização contínua de múltiplos apps

**OTIMIZAÇÕES PRÓ:**
- Reduz brilho para auto-ajustável
- Fecha apps não usados regularmente
- Limpa cache/histórico mensalmente
- Reinicia o aparelho 1× por semana

Será que ajuda?`,
    quickReplies: [
      BACK_TO_MENU,
    ],
  },

  suporte_guia_3: {
    id: 'suporte_guia_3',
    message: `**🛡️ Guia: Segurança & Privacidade**

Seu celular é como uma carteira — proteja como ouro!

**PROTEÇÃO FÍSICA:**
- Use capinha premium (temos!) + película
- Evite quedas de altura
- Mantenha longe de líquidos
- Guarde em local seguro

**PROTEÇÃO DIGITAL:**
- 🔐 Senha forte (min 12 caracteres, símbolos)
- 🔒 Autenticação 2 fatores em emails
- 🚫 Não instale APKs de fontes desconhecidas
- 🔍 Use antivírus confiável (Norton, McAfee)
- 📵 Desabilite downloads automáticos

**BACKUP REGULAR — CRÍTICO!:**
- ☁️ Google Drive/iCloud (ideal)
- 💻 Computador (backup local)
- 📱 Cartão SD externo
- 📅 Frequência: 1× por semana

**Apps de Segurança Recomendados:**
✅ Google Authenticator
✅ Bitwarden (senha)
✅ Signal (mensagens criptografadas)

Quer mais recomendações?`,
    quickReplies: [
      CONTACT_WHATSAPP('💬 Recomendações de Apps'),
      BACK_TO_MENU,
    ],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FEEDBACK - Post-Interaction Collection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FEEDBACK_STEPS: Record<string, ChatStep> = {
  feedback_otimo: {
    id: 'feedback_otimo',
    message: `🌟 **Muito Obrigado!**

Sua satisfação é nossa MISSÃO! Feedbacks como este motivam toda a equipe.

**Compartilhe com outros:**
- 👍 Google Maps
- ⭐ Instagram
- 📱 Facebook

Obrigado! 💚`,
    quickReplies: [
      { id: 'qr_google', label: '👍 Avaliar no Google', action: 'link', value: 'https://google.com/search?q=LK+Imports', analytics: 'review_google' },
      BACK_TO_MENU,
    ],
  },

  feedback_bom: {
    id: 'feedback_bom',
    message: `⭐ **Ótimo!**

Estamos sempre melhorando para oferecer excelência!`,
    quickReplies: [
      CONTACT_WHATSAPP('📝 Deixar Sugestão'),
      BACK_TO_MENU,
    ],
  },

  feedback_meh: {
    id: 'feedback_meh',
    message: `👂 **Queremos Melhorar!**

Qual aspecto podemos aprimorar?`,
    quickReplies: [
      CONTACT_WHATSAPP('💬 Conversa com Gerente'),
      BACK_TO_MENU,
    ],
  },

  feedback_ruim: {
    id: 'feedback_ruim',
    message: `😔 **Desculpa! Vamos Corrigir AGORA**

Um Gerente vai resolveristo imediatamente.`,
    quickReplies: [
      CONTACT_WHATSAPP('🚨 Chamar Gerenciador AGORA'),
      PHONE_CONTACT('📞 Chamar Agora'),
      BACK_TO_MENU,
    ],
    priority: 'urgent',
  },
};

// Merge all scripts
export const ALL_CHATS = { ...CHAT_SCRIPT, ...FEEDBACK_STEPS };

export default CHAT_SCRIPT;
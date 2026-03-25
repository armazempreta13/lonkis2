import { Wrench, Package, Shield, MapPin, CreditCard, Clock, Smartphone } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface QuickReply {
  id: string;
  label: string;
  action: 'message' | 'link' | 'reset' | 'form';
  value: string;
  icon?: string;
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
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const WHATSAPP_URL = 'https://wa.me/556195191308';

/** Shared "back to menu" reply — avoids duplication everywhere */
const BACK_TO_MENU: QuickReply = {
  id: 'qr_menu',
  label: '⬅️ Menu Inicial',
  action: 'message',
  value: 'start',
};

const BACK_TO = (label: string, value: string): QuickReply => ({
  id: `qr_back_${value}`,
  label: `⬅️ ${label}`,
  action: 'message',
  value,
});

const WHATSAPP_REPLY = (label = 'Falar pelo WhatsApp'): QuickReply => ({
  id: 'qr_whatsapp',
  label,
  action: 'link',
  value: WHATSAPP_URL,
});

// ─── Script ────────────────────────────────────────────────────────────────────

/**
 * CHAT_SCRIPT
 *
 * Fluxo completo da conversa. Cada chave é um stepId único.
 * Estrutura:
 *   start → reparos | acessorios | garantia | localizacao | faq
 *   reparos → marca → tipo_reparo → diagnostico → whatsapp
 *   faq → respostas diretas
 */
export const CHAT_SCRIPT: Record<string, ChatStep> = {

  // ── Entrada ────────────────────────────────────────────────────────────────
  start: {
    id: 'start',
    message: 'Olá! Que bom ter você aqui na **LK Imports** 👋\n\nSou seu assistente virtual e estou pronto para agilizar seu atendimento. O que você precisa hoje?',
    quickReplies: [
      { id: 'qr_reparos',    label: '🔧 Orçamento de Reparo',   action: 'message', value: 'reparos',    icon: 'Wrench'    },
      { id: 'qr_cadastro',   label: '📝 Fazer Cadastro',        action: 'form',    value: 'form_cadastro', icon: 'FileText'  },
      { id: 'qr_acessorios', label: '📦 Acessórios & Peças',     action: 'message', value: 'acessorios', icon: 'Package'   },
      { id: 'qr_localizacao',label: '📍 Localização & Horário',  action: 'message', value: 'localizacao',icon: 'MapPin'    },
      { id: 'qr_limpar',     label: '🧹 Limpar Histórico',       action: 'reset',   value: 'start',       icon: 'RotateCcw' },
      { id: 'qr_humano',     label: '👤 Falar com Atendente',    action: 'message', value: 'humano_handoff', icon: 'Zap' },
    ],
  },

  // ── Handoff & Feedback ─────────────────────────────────────────────────────

  humano_handoff: {
    id: 'humano_handoff',
    message: 'Perfeito! Vou chamar um de nossos especialistas em carne e osso para falar com você no WhatsApp. 👨‍💻\n\nLá você pode mandar fotos, áudios e explicar tudo com detalhes.',
    quickReplies: [
      WHATSAPP_REPLY('🚀 Ir para o WhatsApp'),
      BACK_TO_MENU,
    ],
  },

  agradecimento_feedback: {
    id: 'agradecimento_feedback',
    message: 'Por nada! Foi um prazer ajudar. 😊\n\nEssa conversa foi **útil** para você?',
    quickReplies: [
      { id: 'qr_feedback_sim', label: '👍 Sim, muito!', action: 'message', value: 'feedback_positivo' },
      { id: 'qr_feedback_nao', label: '👎 Poderia ser melhor', action: 'message', value: 'feedback_negativo' },
      BACK_TO_MENU,
    ],
  },

  feedback_positivo: {
    id: 'feedback_positivo',
    message: 'Que maravilha! Trabalhamos todos os dias para oferecer a melhor experiência técnica da região. 🚀\n\nPosso ajudar com mais alguma coisa?',
    quickReplies: [BACK_TO_MENU],
  },

  feedback_negativo: {
    id: 'feedback_negativo',
    message: 'Poxa, sinto muito por isso. 😔\n\nQueremos entender o que houve para melhorar. Por favor, chame um atendente humano para resolvermos sua questão agora mesmo!',
    quickReplies: [
      WHATSAPP_REPLY('👤 Falar com Atendente'),
      BACK_TO_MENU,
    ],
  },

  // ── Reparos — Seleção de Marca ─────────────────────────────────────────────

  reparos: {
    id: 'reparos',
    message: 'Ótima escolha! Somos especialistas em consertos rápidos e seguros. 🛠️\n\nUsamos apenas peças de **alta qualidade** com **90 dias de garantia**.\n\nPara começarmos, qual é a marca do seu aparelho?',
    quickReplies: [
      { id: 'qr_apple',    label: '🍎 Apple (iPhone)',       action: 'message', value: 'marca_apple',    icon: 'Smartphone' },
      { id: 'qr_samsung',  label: '📱 Samsung Galaxy',       action: 'message', value: 'marca_samsung',  icon: 'Smartphone' },
      { id: 'qr_xiaomi',   label: '📱 Xiaomi / Redmi',       action: 'message', value: 'marca_xiaomi',   icon: 'Smartphone' },
      { id: 'qr_motorola', label: '📱 Motorola',              action: 'message', value: 'marca_motorola', icon: 'Smartphone' },
      { id: 'qr_outra',    label: '📱 Outra marca',           action: 'message', value: 'marca_outra',    icon: 'Smartphone' },
      BACK_TO_MENU,
    ],
  },

  // ── Marcas → Seleção de Tipo de Reparo ────────────────────────────────────

  marca_apple: {
    id: 'marca_apple',
    message: 'Ah, os iPhones são nossa especialidade! 🍎\n\nDeixamos seu Apple novo de novo, do iPhone 7 ao 16 Pro Max. O que aconteceu com ele?',
    quickReplies: [
      { id: 'qr_tela',      label: '📱 Tela Quebrada / Touch',  action: 'message', value: 'reparo_tela'      },
      { id: 'qr_bateria',   label: '🔋 Bateria / Autonomia',    action: 'message', value: 'reparo_bateria'   },
      { id: 'qr_conector',  label: '🔌 Não Carrega',            action: 'message', value: 'reparo_conector'  },
      { id: 'qr_placa',     label: '🔬 Não Liga / Placa',       action: 'message', value: 'reparo_placa'     },
      { id: 'qr_molhou',    label: '💧 Caiu na Água',           action: 'message', value: 'reparo_molhou'    },
      { id: 'qr_outro',     label: '🔧 Outro Problema',         action: 'message', value: 'reparo_outro'     },
      BACK_TO('Marcas', 'reparos'),
    ],
  },

  marca_samsung: {
    id: 'marca_samsung',
    message: 'Perfeito! Conhecemos a linha Galaxy de ponta a ponta. 📱\n\nDa linha A, S até os dobráveis Z Fold/Flip. Qual o problema que ele apresenta?',
    quickReplies: [
      { id: 'qr_tela',      label: '📱 Tela Quebrada / Touch',  action: 'message', value: 'reparo_tela'      },
      { id: 'qr_bateria',   label: '🔋 Bateria / Autonomia',    action: 'message', value: 'reparo_bateria'   },
      { id: 'qr_conector',  label: '🔌 Não Carrega',            action: 'message', value: 'reparo_conector'  },
      { id: 'qr_placa',     label: '🔬 Não Liga / Placa',       action: 'message', value: 'reparo_placa'     },
      { id: 'qr_molhou',    label: '💧 Caiu na Água',           action: 'message', value: 'reparo_molhou'    },
      { id: 'qr_outro',     label: '🔧 Outro Problema',         action: 'message', value: 'reparo_outro'     },
      BACK_TO('Marcas', 'reparos'),
    ],
  },

  marca_xiaomi: {
    id: 'marca_xiaomi',
    message: 'Excelente! Temos muita experiência com a linha Xiaomi, Redmi e Poco. 📱\n\nMe conta, o que houve com o seu aparelho?',
    quickReplies: [
      { id: 'qr_tela',      label: '📱 Tela Quebrada / Touch',  action: 'message', value: 'reparo_tela'      },
      { id: 'qr_bateria',   label: '🔋 Bateria / Autonomia',    action: 'message', value: 'reparo_bateria'   },
      { id: 'qr_conector',  label: '🔌 Não Carrega',            action: 'message', value: 'reparo_conector'  },
      { id: 'qr_placa',     label: '🔬 Não Liga / Placa',       action: 'message', value: 'reparo_placa'     },
      { id: 'qr_molhou',    label: '💧 Caiu na Água',           action: 'message', value: 'reparo_molhou'    },
      { id: 'qr_outro',     label: '🔧 Outro Problema',         action: 'message', value: 'reparo_outro'     },
      BACK_TO('Marcas', 'reparos'),
    ],
  },

  marca_motorola: {
    id: 'marca_motorola',
    message: 'Legal! Atendemos toda a linha Motorola (Moto G, Edge, Razr). 📱\n\nQual defeito ele está apresentando?',
    quickReplies: [
      { id: 'qr_tela',      label: '📱 Tela Quebrada / Touch',  action: 'message', value: 'reparo_tela'      },
      { id: 'qr_bateria',   label: '🔋 Bateria / Autonomia',    action: 'message', value: 'reparo_bateria'   },
      { id: 'qr_conector',  label: '🔌 Não Carrega',            action: 'message', value: 'reparo_conector'  },
      { id: 'qr_placa',     label: '🔬 Não Liga / Placa',       action: 'message', value: 'reparo_placa'     },
      { id: 'qr_molhou',    label: '💧 Caiu na Água',           action: 'message', value: 'reparo_molhou'    },
      { id: 'qr_outro',     label: '🔧 Outro Problema',         action: 'message', value: 'reparo_outro'     },
      BACK_TO('Marcas', 'reparos'),
    ],
  },

  marca_outra: {
    id: 'marca_outra',
    message: 'Sem problemas! Atendemos LG, Realme, Asus e diversas outras marcas. 📱\n\nQual é o problema que você precisa resolver?',
    quickReplies: [
      { id: 'qr_tela',      label: '📱 Tela Quebrada / Touch',  action: 'message', value: 'reparo_tela'      },
      { id: 'qr_bateria',   label: '🔋 Bateria / Autonomia',    action: 'message', value: 'reparo_bateria'   },
      { id: 'qr_conector',  label: '🔌 Não Carrega',            action: 'message', value: 'reparo_conector'  },
      { id: 'qr_placa',     label: '🔬 Não Liga / Placa',       action: 'message', value: 'reparo_placa'     },
      { id: 'qr_molhou',    label: '💧 Caiu na Água',           action: 'message', value: 'reparo_molhou'    },
      { id: 'qr_outro',     label: '🔧 Outro Problema',         action: 'message', value: 'reparo_outro'     },
      BACK_TO('Marcas', 'reparos'),
    ],
  },

  // ── Tipos de Reparo ────────────────────────────────────────────────────────

  form_cadastro: {
    id: 'form_cadastro',
    message: 'Quer garantir um atendimento mais rápido e receber ofertas exclusivas? 🎁\n\nPreencha seus dados rapidinho abaixo:',
    form: {
      id: 'cadastro_cliente',
      fields: [
        { name: 'nome', label: 'Nome Completo', type: 'text', required: true },
        { name: 'email', label: 'E-mail', type: 'email', required: true },
        { name: 'tel', label: 'WhatsApp', type: 'tel', required: true },
      ],
      submitLabel: 'Finalizar Cadastro',
    },
    quickReplies: [BACK_TO_MENU],
  },

  reparo_tela: {
    id: 'reparo_tela',
    message: '**Troca de Tela / Display** 📱\n\nSua tela quebrou ou o touch parou? Trocamos por uma nova com qualidade premium (OLED/AMOLED/LCD), mantendo cores vivas e touch perfeito.\n\n- ⏱️ **Fica pronto em:** 1 a 2 horas\n- ✅ **Garantia:** 90 dias\n\n*Dica: Evite usar com o vidro trincado para não danificar outros componentes.*',
    video: '',
    quickReplies: [
      WHATSAPP_REPLY('📅 Agendar Reparo'),
      { id: 'qr_manual', label: '📄 Baixar Tabela PDF', action: 'message', value: 'download_manual', icon: 'Download' },
      BACK_TO_MENU,
    ],
  },

  download_manual: {
    id: 'download_manual',
    message: 'Aqui está o nosso catálogo completo de serviços e preços em PDF para você conferir com calma.',
    file: {
      name: 'Tabela_Precos_LK_2024.pdf',
      url: '#',
      size: '1.2 MB',
    },
    quickReplies: [BACK_TO_MENU],
  },

  reparo_bateria: {
    id: 'reparo_bateria',
    message: '**Troca de Bateria** 🔋\n\nSeu celular descarrega rápido ou desliga sozinho? Colocamos uma bateria nova, certificada e com a saúde em 100%.\n\n- ⏱️ **Fica pronto em:** 30 min a 1 hora\n- ✅ **Garantia:** 90 dias\n\n⚠️ *Atenção: Se a tela estiver descolando, a bateria pode estar inchada. Traga o quanto antes!*',
    quickReplies: [
      WHATSAPP_REPLY('📅 Agendar Troca de Bateria'),
      { id: 'qr_mais_servicos', label: '🔧 Ver Outros Reparos', action: 'message', value: 'reparos' },
      BACK_TO_MENU,
    ],
  },

  reparo_conector: {
    id: 'reparo_conector',
    message: '**Troca de Conector de Carga** 🔌\n\nO cabo não encaixa direito ou só carrega em uma posição? Restauramos a porta de carregamento para garantir uma conexão segura.\n\n- ⏱️ **Fica pronto em:** 1 a 3 horas\n- ✅ **Garantia:** 90 dias\n\n❌ *Nunca tente limpar o conector com agulhas ou objetos de metal, isso pode causar um curto-circuito grave.*',
    quickReplies: [
      WHATSAPP_REPLY('📅 Agendar Reparo do Conector'),
      { id: 'qr_mais_servicos', label: '🔧 Ver Outros Reparos', action: 'message', value: 'reparos' },
      BACK_TO_MENU,
    ],
  },

  reparo_placa: {
    id: 'reparo_placa',
    message: '**Reparo em Placa Lógica** 🔬\n\nSeu aparelho apagou do nada? Utilizamos microsoldagem profissional e microscópio para diagnosticar e reparar a placa do seu celular.\n\n- ⏱️ **Fica pronto em:** 2 a 5 dias úteis\n- ✅ **Garantia:** 90 dias\n\n⚠️ *Importante: Se o aparelho não liga, NÃO force várias tentativas de carregar. Isso pode agravar o curto.*',
    quickReplies: [
      WHATSAPP_REPLY('📅 Agendar Análise de Placa'),
      { id: 'qr_mais_servicos', label: '🔧 Ver Outros Reparos', action: 'message', value: 'reparos' },
      BACK_TO_MENU,
    ],
  },

  reparo_molhou: {
    id: 'reparo_molhou',
    message: '💧 **Aparelho Molhado — Aja AGORA!**\n\nPara salvar seu celular, siga estes passos:\n1. NÃO tente ligar ou carregar\n2. NÃO use secador de cabelo\n3. NÃO coloque no arroz (isso não funciona)\n4. Seque o exterior com um pano\n5. Traga IMEDIATAMENTE para nós!\n\nFazemos um banho químico ultrassônico que remove a oxidação e maximiza as chances de salvação.\n\n- ⏱️ **Prazo:** 2 horas\n-',
    quickReplies: [
      WHATSAPP_REPLY('🚨 Avisar que Estou Indo Agora'),
      BACK_TO_MENU,
    ],
  },

  reparo_outro: {
    id: 'reparo_outro',
    message: 'Realizamos uma grande variedade de reparos além dos mais comuns! 🔧\n\nConfira alguns dos nossos serviços adicionais:',
    table: {
      headers: ['Serviço', 'Prazo Estimado'],
      rows: [
        ['📷 Troca de Câmera',          '1 a 2 horas'    ],
        ['🔊 Troca de Alto-falante',    '1 a 2 horas'    ],
        ['🎤 Troca de Microfone',       '1 a 2 horas'    ],
        ['🔘 Troca de Botões',          '1 a 2 horas'    ],
        ['🔓 Desbloqueio de Conta',     '1 a 4 horas'    ],
        ['📡 Reparo de Antena / Wi-Fi', '1 a 3 horas'    ],
        ['🔏 Reparo de Biometria',      '1 a 3 horas'    ],
        ['💾 Formatação / Reset',       '1 a 2 horas'    ],
        ['🌡️ Superaquecimento',         '2 a 4 horas'    ],
        ['🔄 Recuperação de Sistema',   '2 a 5 dias úteis'],
      ],
    },
    quickReplies: [
      WHATSAPP_REPLY('💬 Falar com Técnico'),
      BACK_TO('Tipos de Reparo', 'reparos'),
      BACK_TO_MENU,
    ],
  },

  // ── Acessórios ─────────────────────────────────────────────────────────────

  acessorios: {
    id: 'acessorios',
    message: 'Quer proteger ou turbinar seu aparelho? 🎧\n\nTemos uma linha completa de acessórios premium com excelente custo-benefício:',
    table: {
      headers: ['Acessório', 'Detalhe'],
      rows: [
        ['📱 Capinhas',              'Diversas marcas e modelos'   ],
        ['🛡️ Películas de Vidro',   'Aplicação na hora, sem bolhas'],
        ['⚡ Carregadores',          'Originais e compatíveis'     ],
        ['🔌 Cabos',                 'USB-C, Lightning, Micro USB' ],
        ['🎧 Fones de Ouvido',       'Com fio e Bluetooth'         ],
      ],
    },
    quickReplies: [
      WHATSAPP_REPLY('💬 Consultar Disponibilidade'),
      { id: 'qr_pagamento', label: '💳 Formas de Pagamento', action: 'message', value: 'pagamento', icon: 'CreditCard' },
      BACK_TO_MENU,
    ],
  },

  // ── Pagamento ──────────────────────────────────────────────────────────────

  pagamento: {
    id: 'pagamento',
    message: 'Facilitamos na hora de pagar! 💳\n\n💚 **PIX** — 5% de desconto (a melhor opção!)\n💳 **Cartão de Crédito** (consulte parcelamento)\n💳 **Cartão de Débito**\n💵 **Dinheiro**\n\nQuer saber em quantas vezes conseguimos parcelar o seu serviço?',
    quickReplies: [
      WHATSAPP_REPLY('💬 Tirar Dúvida sobre Pagamento'),
      BACK_TO('Acessórios', 'acessorios'),
      BACK_TO_MENU,
    ],
  },

  // ── Garantia ───────────────────────────────────────────────────────────────

  garantia: {
    id: 'garantia',
    message: 'Tranquilidade total para você! 🛡️\n\nTodos os nossos serviços possuem garantia contra defeitos de fabricação da peça. E lembre-se: a avaliação e o orçamento são **100% gratuitos**.',
    table: {
      headers: ['Serviço', 'Garantia'],
      rows: [
        ['Troca de Tela',          '90 dias'],
        ['Troca de Bateria',       '90 dias'],
        ['Troca de Conector',      '90 dias'],
        ['Reparo em Placa',        '90 dias'],
        ['Limpeza / Desoxidação',  '90 dias'],
        ['Câmera, Som, Botões',    '90 dias'],
        ['Acessórios',             '90 dias'],
      ],
    },
    quickReplies: [
      { id: 'qr_prazos',   label: '⏱️ Prazos de Reparo', action: 'message', value: 'prazos'      },
      { id: 'qr_orcamento',label: '🎉 Orçamento Grátis?', action: 'message', value: 'faq_orcamento'},
      BACK_TO_MENU,
    ],
  },

  prazos: {
    id: 'prazos',
    message: 'Nós sabemos que você não pode ficar sem celular. Nossos prazos são super ágeis! ⏱️',
    table: {
      headers: ['Serviço', 'Prazo Médio'],
      rows: [
        ['Troca de Bateria',       '30 min a 1 hora'  ],
        ['Troca de Tela',          '1 a 2 horas'      ],
        ['Troca de Conector',      '1 a 3 horas'      ],
        ['Câmera, Som, Botões',    '1 a 2 horas'      ],
        ['Desbloqueio de Conta',   '1 a 4 horas'      ],
        ['Desoxidação',            '1 a 2 horas'      ],
        ['Reparo em Placa',        '2 a 5 dias úteis' ],
        ['Recuperação de Sistema', '2 a 5 dias úteis' ],
      ],
    },
    quickReplies: [
      WHATSAPP_REPLY('📅 Agendar Atendimento'),
      BACK_TO('Garantia', 'garantia'),
      BACK_TO_MENU,
    ],
  },

  // ── Localização ────────────────────────────────────────────────────────────

  localizacao: {
    id: 'localizacao',
    message: 'Venha tomar um café com a gente! ☕📍\n\n**Endereço:**\nSamambaia Norte (QR 429)\nBrasília – DF\n\n🗓️ **Funcionamento:** Segunda a Sábado, das 09h às 18h.\n*(Fechado aos domingos e feriados)*\n\nAh, e se você não for de Brasília, nós atendemos via Correios (SEDEX) para todo o Brasil!',
    quickReplies: [
      { id: 'qr_maps',    label: '🗺️ Abrir no Google Maps', action: 'link',    value: 'https://www.google.com/maps/place/Lk+Imports+-+Assistência+Técnica+e+Acessórios/@-15.893565,-48.1421581,20z/data=!4m14!1m7!3m6!1s0x935bcd54e47cc401:0x2b23311d0b5d68fe!2s4V45%2BJ3+-+Samambaia+Norte,+Brasília+-+DF,+72318-300!3b1!8m2!3d-15.8934375!4d-48.1423125!3m5!1s0x935bd31145795cd3:0xec1f82b4bcf6bef9!8m2!3d-15.8934821!4d-48.1423218!16s%2Fg%2F11z3w0h8k0?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D' },
      { id: 'qr_horario', label: '🕐 Ver Horários',          action: 'message', value: 'horario', icon: 'Clock' },
      { id: 'qr_correios',label: '📦 Envio pelos Correios',  action: 'message', value: 'faq_correios'            },
      BACK_TO_MENU,
    ],
  },

  horario: {
    id: 'horario',
    message: 'Nosso horário de funcionamento: 🗓️\n\n📅 **Segunda a Sábado:** 09h às 18h\n⚠️ **Domingos e Feriados:** Fechado\n\nVocê pode vir sem agendar, mas se quiser garantir que será atendido na hora, recomendo agendar pelo WhatsApp!',
    quickReplies: [
      WHATSAPP_REPLY('📅 Agendar pelo WhatsApp'),
      BACK_TO('Localização', 'localizacao'),
      BACK_TO_MENU,
    ],
  },

  // ── FAQ ────────────────────────────────────────────────────────────────────

  faq: {
    id: 'faq',
    message: 'Dúvidas frequentes ❓\n\nSelecione abaixo o que você gostaria de saber:',
    quickReplies: [
      { id: 'qr_faq_orc',      label: '🎉 Orçamento é grátis?',     action: 'message', value: 'faq_orcamento' },
      { id: 'qr_faq_dados',    label: '📂 Perco meus dados?',        action: 'message', value: 'faq_dados'    },
      { id: 'qr_faq_correios', label: '📦 Envio pelos Correios',     action: 'message', value: 'faq_correios' },
      { id: 'qr_faq_original', label: '💎 A tela é original?',       action: 'message', value: 'faq_tela'     },
      { id: 'qr_faq_privacidade', label: '🔐 Privacidade dos dados', action: 'message', value: 'faq_privacidade' },
      { id: 'qr_faq_pag',      label: '💳 Formas de Pagamento',      action: 'message', value: 'pagamento'    },
      BACK_TO_MENU,
    ],
  },

  faq_orcamento: {
    id: 'faq_orcamento',
    message: 'Aqui na LK Imports, a transparência vem primeiro! 🤝\n\nSeu orçamento é **100% gratuito e sem compromisso**. Nossos técnicos avaliam seu aparelho na hora e você só paga se aprovar o serviço.\n\nVamos fazer um orçamento agora?',
    quickReplies: [
      WHATSAPP_REPLY('💬 Solicitar Orçamento Agora'),
      BACK_TO('Dúvidas', 'faq'),
      BACK_TO_MENU,
    ],
  },

  faq_dados: {
    id: 'faq_dados',
    message: 'Seus dados estão seguros conosco! 📂\n\n✅ Em reparos de tela, bateria e conector, seus dados **NÃO** são apagados.\n\n⚠️ Apenas em formatações e alguns reparos complexos de placa pode ser necessário resetar o aparelho.\n\n*Dica de ouro: Sempre faça backup antes de trazer. Se precisar de ajuda com isso, nós te auxiliamos!*',
    quickReplies: [
      WHATSAPP_REPLY('💬 Falar sobre Backup'),
      BACK_TO('Dúvidas', 'faq'),
      BACK_TO_MENU,
    ],
  },

  faq_correios: {
    id: 'faq_correios',
    message: 'Morar longe não é problema! Atendemos todo o Brasil. 📦\n\nVocê pode nos enviar seu aparelho via Correios (SEDEX).\n\n**Como funciona:**\n1. Fale com a gente no WhatsApp\n2. Receba as instruções de envio seguro\n3. Envie o aparelho\n4. Acompanhe o reparo em tempo real\n5. Receba de volta na sua casa com rastreamento',
    quickReplies: [
      WHATSAPP_REPLY('📦 Iniciar Envio pelos Correios'),
      BACK_TO('Dúvidas', 'faq'),
      BACK_TO_MENU,
    ],
  },

  faq_tela: {
    id: 'faq_tela',
    message: 'Sobre a qualidade das nossas telas 💎\n\nTrabalhamos com telas **Premium** (OLED/AMOLED/LCD) que garantem:\n\n✅ **Fidelidade de cores** impressionante\n✅ **Brilho idêntico** ao original\n✅ **Sensibilidade** ao toque perfeita\n✅ Compatibilidade total com **Face ID** e **Touch ID**\n\nSempre explicamos as opções para você escolher o melhor custo-benefício.',
    quickReplies: [
      WHATSAPP_REPLY('💬 Consultar sobre Telas'),
      BACK_TO('Dúvidas', 'faq'),
      BACK_TO_MENU,
    ],
  },

  faq_privacidade: {
    id: 'faq_privacidade',
    message: 'Sua privacidade é inegociável! 🔐\n\nNossos técnicos são treinados e comprometidos com a confidencialidade total dos seus dados.\n\n✅ Não acessamos fotos, mensagens ou arquivos pessoais\n✅ Você pode definir uma senha temporária apenas para o reparo\n✅ Todo o processo é transparente',
    quickReplies: [
      WHATSAPP_REPLY('💬 Falar com um Técnico'),
      BACK_TO('Dúvidas', 'faq'),
      BACK_TO_MENU,
    ],
  },
};
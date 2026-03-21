/**
 * =============================================================================
 * LK IMPORTS - ARQUIVO DE CONFIGURAÇÃO GLOBAL
 * =============================================================================
 *
 * Bem-vindo ao coração do seu site!
 *
 * Este arquivo centraliza todos os textos, links, imagens e configurações.
 * Modificar qualquer valor aqui refletirá em todo o site, facilitando a
 * manutenção e a personalização.
 *
 * Siga as instruções em cada seção para customizar o conteúdo.
 *
 * REGRAS:
 * 1. Mantenha a estrutura do objeto.
 * 2. Para imagens, use URLs absolutas (ex: https://site.com/imagem.png).
 * 3. Comente qualquer alteração complexa para referência futura.
 *
 */

// ---------------------------------------------------------------------------
// Ícones
// ---------------------------------------------------------------------------
// Importe todos os ícones da biblioteca lucide-react aqui.
// Isso permite que o siteConfig referencie os componentes de ícone diretamente.
import {
  ShieldCheck,
  Award,
  Zap,
  Wrench,
  Cpu,
  Smartphone,
  Battery,
  Watch,
  Target,
  Eye,
  Heart,
  Star,
  MapPin,
  Lock,
  Camera,
  Speaker,
  Mic,
  Power,
  Wifi,
  Fingerprint,
  Thermometer,
  RefreshCw,
  HardDrive
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Configuração Principal (siteConfig)
// ---------------------------------------------------------------------------
export const siteConfig = {
  // ---------------------------------------------------------------------------
  // Informações da Marca e SEO
  // ---------------------------------------------------------------------------
  brand: {
    name: "LK Imports",
    // Use uma imagem com fundo transparente (PNG)
    logo: "https://i.imgur.com/Ga4bMmk.png",
    // Tamanho da logo em pixels (altura). A largura será ajustada proporcionalmente.
    // Defina valores para desktop e mobile.
    logoSize: {
      desktop: 80, // Ex: 80px de altura em telas grandes
      mobile: 60,  // Ex: 60px de altura em telas pequenas
    },
    slogan: "Especialistas em Alta Performance",
    description: "Assistência técnica de alta precisão para smartphones, tablets e smartwatches. Com 2 anos de experiência, garantimos qualidade premium, agilidade e total transparência em cada serviço.",
    since: 2007,
  },

  // ---------------------------------------------------------------------------
  // SEO (Search Engine Optimization)
  // ---------------------------------------------------------------------------
  seo: {
    title: "LK Imports | Assistência Técnica de Celulares em Brasília",
    description: "Especialistas em conserto de iPhone, Samsung, Xiaomi e tablets em Samambaia. 2 anos de experiência, peças premium e garantia de 90 dias.",
    keywords: "assistência técnica, conserto de celular, brasília, samambaia, df, iphone, samsung, motorola, xiaomi, troca de tela, troca de bateria, lk imports",
    author: "LK Imports",
    // Imagem para compartilhamento em redes sociais (Open Graph)
    ogImage: "https://i.imgur.com/Ga4bMmk.png",
    // URL canônica do site
    url: "https://lkimports.com.br",
  },

  // ---------------------------------------------------------------------------
  // Navegação Principal (Navbar)
  // ---------------------------------------------------------------------------
  navbar: {
    // Itens do menu de navegação
    navItems: [
      { label: "Início", href: "/" },
      { label: "Serviços", href: "/servicos" },
      { label: "Produtos", href: "/produtos" },
      { label: "Sobre", href: "/sobre" },
      { label: "Contato", href: "/contato" },
      { label: "Orçamento", href: "/orcamento", highlight: true },
    ],
    hasSearch: true,
    hasUserActions: true,
    userActions: [
      { label: "Login", href: "/login" },
      { label: "Cadastro", href: "/cadastro", variant: "secondary" },
    ],
    // Textos da UI da Navbar
    ui: {
      callToAction: "Ligue Agora",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      mobileNavTitle: "Navegação",
      mobileContactTitle: "Contato Direto",
      mobileSocialTitle: "Redes Sociais",
      searchPlaceholder: "Buscar serviço ou produto",
    }
  },

  // ---------------------------------------------------------------------------
  // Rodapé (Footer)
  // ---------------------------------------------------------------------------
  footer: {
    description: "Especialistas em reparos avançados de smartphones e tablets. Qualidade, rapidez e garantia que você confia.",
    quickLinksTitle: "Links Rápidos",
    contactTitle: "Contato",
    socialTitle: "Siga-nos",
    scheduleTitle: "Horário",
    copyright: `© ${new Date().getFullYear()} LK Imports. Todos os direitos reservados.`,
    legal: {
      privacy: "Política de Privacidade",
      terms: "Termos de Serviço",
      cookies: "Preferências de Cookies",
    },
    mapButton: "Abrir no Google Maps",
    contactOnline: "WhatsApp Online"
  },

  // ---------------------------------------------------------------------------
  // Informações de Contato
  // ---------------------------------------------------------------------------
  contact: {
    phone: "+556195191308",
    phoneDisplay: "(61) 9519-1308",
    email: "contato@lkimports.com.br",
    whatsapp: "https://wa.me/556195191308",
    address: "QR 429 Conjunto 16 Loja 01, Samambaia Norte",
    city: "Brasília - DF, 72322-516",
    mapsUrl: "https://www.google.com/maps/place/LK+Imports+-+Assist%C3%AAncia+T%C3%A9cnica+de+Celulares/@-15.867958,-48.106456,17z",
    mapsEmbed: "https://www.google.com/maps?q=QR+429+Conjunto+16+Loja+01+Brasilia+DF&output=embed",
    hours: {
      mondayToFriday: "08:00 — 19:30",
      saturday: "08:00 — 14:00",
      sunday: "Fechado",
      holiday: "Consulte no WhatsApp",
    },
    support: {
      phone: "+556195191308",
      email: "suporte@lkimports.com.br",
      responseTime: "Até 2 horas em horário comercial",
    },
  },

  // ---------------------------------------------------------------------------
  // Configurações e Opções Gerais
  // ---------------------------------------------------------------------------
  settings: {
    siteLanguage: "pt-BR",
    currency: "BRL",
    vatIncluded: true,
    showPrices: true,
    enableDarkMode: true,
    enableAnimations: true,
    enableNewsletter: true,
    allowedRoutes: ["/", "/servicos", "/produtos", "/sobre", "/contato"],
  },

  promoBanner: {
    active: true,
    text: "Semana de descontos especiais: até 20% off em serviços de bateria e tela!",
    ctaText: "Confira agora",
    ctaLink: "/servicos",
    backgroundColor: "#10b981",
    textColor: "#ffffff",
  },

  theme: {
    primaryColor: "#0f766e",
    secondaryColor: "#14b8a6",
    accentColor: "#f87171",
    background: "#0f172a",
    text: "#f8fafc",
    fontFamily: "Inter, Roboto, sans-serif",
    borderRadius: "1rem",
    shadow: "0 20px 40px rgba(15,23,42,0.35)",
  },

  // ---------------------------------------------------------------------------
  // Redes Sociais
  // ---------------------------------------------------------------------------
  social: {
    instagram: {
      url: "https://www.instagram.com/lkimports_061?igsh=MWR5dWZ2bjFkOGxsZQ%3D%3D&utm_source=qr",
      ariaLabel: "Siga-nos no Instagram",
    },
    facebook: {
      url: "https://www.facebook.com/share/18DjhAuiMA/?mibextid=wwXIfr",
      ariaLabel: "Acompanhe no Facebook",
    },
    tiktok: {
      url: "https://www.tiktok.com/@lkimports",
      ariaLabel: "Acompanhe no TikTok",
    },
    youtube: {
      url: "https://www.youtube.com/channel/UC-LKImports",
      ariaLabel: "Inscreva-se no YouTube",
    },
    linkedin: {
      url: "https://www.linkedin.com/company/lkimports",
      ariaLabel: "Conecte-se no LinkedIn",
    },
  },

  // ---------------------------------------------------------------------------
  // Conteúdo das Páginas
  // ---------------------------------------------------------------------------
  pages: {
    // -------------------------------------------------------------------------
    // Página Inicial (Home)
    // -------------------------------------------------------------------------
    home: {
      hero: {
        badge: "Referência em Soluções Tecnológicas",
        experience: "2 Anos de Experiência",
        title: "LK",
        titleAccent: "Imports",
        subtitle: "Especialistas em reparos de alta precisão para smartphones e tablets. Qualidade premium, agilidade e garantia total em cada serviço.",
        ctaPrimary: "Orçamento Rápido",
        ctaSecondary: "Nossas Soluções",
        image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000&auto=format&fit=crop",
      },
      services: {
        badge: "Nossas Especialidades",
        title: "Soluções",
        titleAccent: "Completas",
        description: "Do reparo de placa à troca de tela, oferecemos um ecossistema completo de soluções para o seu dispositivo.",
        ctaText: "Ver todos os serviços",
        items: [
          { icon: Cpu, title: "Reparo em Placa", description: "Recuperação de placas com microsoldagem avançada." },
          { icon: Smartphone, title: "Troca de Vidro", description: "Mantemos sua tela original, trocando apenas o vidro." },
          { icon: Battery, title: "Bateria Premium", description: "Baterias de alta capacidade com garantia estendida." },
          { icon: Watch, title: "Apple Watch", description: "Reparos especializados em todos os modelos de Watch." },
        ]
      },
      differentials: {
        badge: "O Padrão LK",
        title: "Por que nos",
        titleAccent: "Escolher?",
        description: "Somos referência em Brasília pela qualidade dos nossos reparos e transparência no atendimento. Cada serviço é executado com dedicação e expertise acumulada em 2 anos de mercado.",
        ctaText: "Conheça nossa história",
        items: [
          { icon: ShieldCheck, title: "Garantia Real", description: "90 dias de garantia em todos os serviços. Seu equipamento protegido." },
          { icon: Award, title: "Peças Premium", description: "Trabalhamos apenas com componentes de alta qualidade, testados e homologados." },
          { icon: Zap, title: "Agilidade Máxima", description: "A maioria dos reparos é feita no mesmo dia para você não ficar desconectado." },
          { icon: Wrench, title: "Laboratório Avançado", description: "Estrutura completa com equipamentos de ponta para diagnósticos precisos." },
        ]
      },
      testimonials: {
        badge: "Avaliações Reais",
        title: "O que dizem",
        titleAccent: "Nossos Clientes",
        googleRating: "4.9",
        totalReviews: "150+",
        ctaText: "Ver todas as avaliações",
        items: [
          { name: "Carlos Silva", text: "Excelente atendimento! Meu iPhone estava condenado e a LK Imports recuperou a placa. Preço justo e muita transparência.", rating: 5, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
          { name: "Mariana Costa", text: "Troquei a tela do meu Samsung e ficou perfeito. O serviço foi super rápido, entregaram no mesmo dia. Recomendo!", rating: 5, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
          { name: "João Pedro", text: "Profissionais de verdade. Levei meu Apple Watch que não ligava e resolveram o problema da bateria rapidamente.", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
        ]
      },
      location: {
        badge: "Onde estamos",
        title: "Nossa",
        titleAccent: "Unidade",
        subtitle: "Visite nossa loja física em Samambaia e conheça nossa estrutura completa de atendimento e laboratório.",
        description: "Localizada em Samambaia Norte, nossa unidade oferece atendimento personalizado e infraestrutura completa para todos os tipos de reparo."
      },
      cta: {
        badge: "Atendimento Imediato",
        title: "Soluções Rápidas",
        titleAccent: "e Eficazes.",
        subtitle1: "Seu equipamento precisa estar sempre funcionando bem.",
        subtitle2: "Oferecemos soluções seguras para melhorar a performance do seu dispositivo.",
        subtitle3: "Equipe especializada e componentes de qualidade para resolver problemas com rapidez e preço acessível!",
        buttonText: "Solicitar Orçamento via WhatsApp",
        image: "https://images.unsplash.com/photo-1556656793-062ff9878258?q=80&w=1000&auto=format&fit=crop",
        floatingBadge: {
          number: "2",
          text: "Anos de\nExperiência"
        }
      }
    },
    // -------------------------------------------------------------------------
    // Página "Sobre Nós"
    // -------------------------------------------------------------------------
    about: {
        hero: {
          badge: "Nossa História",
          title: "Quem",
          titleAccent: "Somos",
          paragraphs: [
            "A LK Imports nasceu da paixão pela tecnologia e do compromisso em oferecer o melhor serviço de assistência técnica da região.",
            "Com mais de 2 anos de experiência, nos tornamos referência em Samambaia, Ceilândia e Taguatinga pela qualidade de nossos reparos e pela transparência no atendimento.",
            "Nossa missão é garantir que você nunca fique desconectado. Por isso, investimos constantemente em treinamento técnico e em componentes de primeira linha para oferecer soluções rápidas e definitivas."
          ],
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
          imageBadge: {
            title: "Fundada em 2007",
            subtitle: "Tradição & Inovação"
          }
        },
        values: {
          title: "Nossos Pilares",
          items: [
            { icon: Target, title: "Missão", desc: "Oferecer soluções tecnológicas com excelência, garantindo a satisfação e a conectividade dos nossos clientes." },
            { icon: Eye, title: "Visão", desc: "Ser reconhecida como a melhor e mais confiável assistência técnica do Distrito Federal até 2027." },
            { icon: Heart, title: "Valores", desc: "Transparência, ética, agilidade e compromisso inabalável com a qualidade técnica." },
          ],
        },
        stats: {
          title: "Nossos Números",
          items: [
            { icon: Award, value: "2 Anos", label: "De experiência no mercado" },
            { icon: ShieldCheck, value: "15k+", label: "Aparelhos recuperados" },
            { icon: Star, value: "4.9/5", label: "Avaliação no Google" },
            { icon: MapPin, value: "1", label: "Laboratório avançado" },
          ]
        }
    },
    // -------------------------------------------------------------------------
    // Página de Serviços
    // -------------------------------------------------------------------------
    services: {
      hero: {
        badge: "Catálogo de Serviços",
        title: "Nossas",
        titleAccent: "Especialidades",
        subtitle: "Soluções completas e definitivas para o seu dispositivo, executadas por especialistas com mais de 2 anos de experiência."
      },
      categories: ["Todos", "Hardware", "Avançado", "Sistema", "Energia", "Estética"],
      // Lista detalhada de todos os serviços oferecidos
      items: [
        { id: 1, name: "Reparos em Placa", price: "Sob orçamento", category: "Avançado", icon: Cpu },
        { id: 2, name: "Troca de Tela", price: "A partir de R$ 149", category: "Hardware", icon: Smartphone },
        { id: 3, name: "Troca de Conector", price: "A partir de R$ 89", category: "Hardware", icon: Zap },
        { id: 4, name: "Troca de Bateria", price: "A partir de R$ 89", category: "Energia", icon: Battery },
        { id: 5, name: "Troca de Tampa", price: "A partir de R$ 99", category: "Estética", icon: Smartphone },
        { id: 6, name: "Limpeza (Desoxidação)", price: "A partir de R$ 120", category: "Avançado", icon: Wrench },
        { id: 7, name: "Desbloqueio de Conta", price: "A partir de R$ 79", category: "Sistema", icon: Lock },
        { id: 8, name: "Troca de Câmera", price: "A partir de R$ 110", category: "Hardware", icon: Camera },
        { id: 9, name: "Troca de Alto-falante", price: "A partir de R$ 79", category: "Hardware", icon: Speaker },
        { id: 10, name: "Troca de Microfone", price: "A partir de R$ 79", category: "Hardware", icon: Mic },
        { id: 11, name: "Troca de Botão Power/Vol", price: "A partir de R$ 79", category: "Hardware", icon: Power },
        { id: 12, name: "Reparo de Face ID", price: "Sob orçamento", category: "Avançado", icon: Fingerprint },
        { id: 13, name: "Reparo de Wi-Fi", price: "A partir de R$ 99", category: "Hardware", icon: Wifi },
        { id: 14, name: "Reparo de Superaquecimento", price: "Sob orçamento", category: "Avançado", icon: Thermometer },
        { id: 15, name: "Atualização de Sistema", price: "A partir de R$ 59", category: "Sistema", icon: RefreshCw },
        { id: 16, name: "Recuperação de Dados", price: "A partir de R$ 89", category: "Sistema", icon: HardDrive },
      ],
      supportedDevices: {
        badge: "Marcas & Modelos",
        title: "Dispositivos",
        titleAccent: "Suportados",
        brands: [
          { brand: 'Apple', icon: Smartphone, models: ['iPhone 15, 14, 13, 12, 11', 'iPhone XR, X, 8, 7'] },
          { brand: 'Samsung', icon: Smartphone, models: ['Linha S (S24, S23, S22)', 'Linha A (A54, A34, A14)'] },
          { brand: 'Xiaomi', icon: Smartphone, models: ['Linha Mi (14, 13, 12)', 'Redmi Note (13, 12, 11)'] },
          { brand: 'Motorola', icon: Smartphone, models: ['Linha Edge (40, 30)', 'Linha Moto G (G84, G54)'] }
        ]
      }
    },
    // -------------------------------------------------------------------------
    // Página de Produtos
    // -------------------------------------------------------------------------
    products: {
      hero: {
        badge: "Loja LK",
        title: "Produtos",
        titleAccent: "Premium",
        subtitle: "Acessórios e dispositivos seminovos com garantia e procedência verificada pela nossa equipe técnica."
      },
      categories: ["Todos", "iPhones", "Video Games", "Acessórios"],
      items: [
        { id: 1, name: "iPhone 15 Pro Max", category: "iPhones", price: 7999, image: "https://picsum.photos/seed/iphone15promax/400/400", badge: "Novo" },
        { id: 2, name: "iPhone 14 Pro", category: "iPhones", price: 5999, image: "https://picsum.photos/seed/iphone14pro/400/400", badge: "Seminovo" },
        { id: 3, name: "PS5 Slim Mídia Física", category: "Video Games", price: 4200, image: "https://picsum.photos/seed/ps5slimf/400/400", badge: "Novo" },
        { id: 4, name: "AirPods Pro 2", category: "Acessórios", price: 1200, image: "https://picsum.photos/seed/airpodspro2/400/400", badge: "Novo" },
        { id: 5, name: "Apple Watch Series 9", category: "Acessórios", price: 3000, image: "https://picsum.photos/seed/watch9/400/400", badge: "Novo" },
        { id: 6, name: "JBL Flip 6", category: "Acessórios", price: 600, image: "https://picsum.photos/seed/jblflip6/400/400", badge: "Novo" },
      ]
    },
    // -------------------------------------------------------------------------
    // Página de Contato
    // -------------------------------------------------------------------------
    contact: {
      hero: {
        badge: "Atendimento Especializado",
        title: "Fale",
        titleAccent: "Conosco",
      },
      form: {
        title: "Envie sua mensagem",
        nameLabel: "Nome Completo",
        namePlaceholder: "Como podemos te chamar?",
        whatsappLabel: "WhatsApp",
        whatsappPlaceholder: "(00) 00000-0000",
        subjectLabel: "Assunto",
        subjects: ["Orçamento de Reparo", "Acessórios", "Dúvidas Gerais", "Outros"],
        messageLabel: "Mensagem",
        messagePlaceholder: "Descreva o problema do seu aparelho ou o que você precisa...",
        buttonText: "Enviar Mensagem",
        successMessage: "Mensagem enviada com sucesso! Retornaremos em breve.",
        errorMessage: "Ocorreu um erro. Tente novamente."
      },
      info: {
        title: "Informações de Contato",
        whatsappTitle: "WhatsApp",
        whatsappDesc: "Atendimento rápido e direto",
        addressTitle: "Endereço Físico",
        addressDesc: "Visite nossa loja",
        hoursTitle: "Horários",
        hoursDesc: "Segunda a Sexta, 08:00 - 19:30",
        socialTitle: "Redes Sociais",
        socialDesc: "Acompanhe nosso trabalho"
      }
    },
  },

  // ---------------------------------------------------------------------------
  // Componentes Globais (Modals, Banners, etc.)
  // ---------------------------------------------------------------------------
  components: {
    quoteModal: {
      title: "Solicitar Orçamento",
      serviceLabel: "Serviço",
      priceLabel: "Preço",
      ctaButton: "Confirmar via WhatsApp"
    },
    cookieConsent: {
      title: "Valorizamos sua privacidade",
      description: "Utilizamos cookies essenciais para o funcionamento do site. Com o seu consentimento, também usamos cookies para análise e marketing. Você pode alterar suas preferências a qualquer momento.",
      privacyPolicy: "Leia nossa Política de Privacidade",
      buttonAccept: "Aceitar Todos",
      buttonReject: "Recusar",
      buttonCustomize: "Personalizar",
      modal: {
        title: "Preferências de Cookies",
        description: "Ajuste suas preferências de cookies. Algumas funcionalidades podem depender dessas configurações.",
        essentialTitle: "Cookies Essenciais",
        essentialDescription: "Necessários para o funcionamento básico do site. Não podem ser desativados.",
        analyticsTitle: "Cookies de Análise",
        analyticsDescription: "Ajudam-nos a entender como os visitantes interagem com o site, de forma anônima.",
        marketingTitle: "Cookies de Marketing",
        marketingDescription: "Usados para exibir anúncios relevantes para você em outras plataformas.",
        buttonSaveChanges: "Salvar Preferências",
        buttonAcceptAll: "Aceitar Todos",
      },
    },
    chatbot: {
      // Configurações e textos para o componente de chatbot
      welcomeMessage: "Olá! Sou o assistente virtual da LK Imports. Como posso te ajudar?",
      // ... outras configurações
    }
  }
};

// Tipo global para garantir consistência
export type SiteConfig = typeof siteConfig;

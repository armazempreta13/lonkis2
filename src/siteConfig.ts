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
// Importações
// ---------------------------------------------------------------------------
import products from './data/products.json';

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
  HardDrive,
  Calculator,
  Clock,
  Package
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
      navbar: {
        desktop: 72,
        mobile: 60,
      },
      footer: {
        desktop: 96,
        mobile: 80,
      },
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
    ogImage: "https://i.imgur.com/Ga4bMmk.png",
    url: "https://lkimports.net",
    siteName: "LK Imports",
    locale: "pt_BR",
    themeColor: "#0f766e",
    canonical: "https://lkimports.net",
    twitterHandle: "@lkimports_061",
    facebookAppId: "1234567890",
    googleSiteVerification: "abcde12345verify",
    logo: "https://i.imgur.com/Ga4bMmk.png",
    company: {
      name: "LK Imports",
      legalName: "LK Imports Ltda",
      phone: "+556195191308",
      email: "contato@lkimports.com.br",
      address: "QR 429 Conjunto 16 Loja 01, Samambaia Norte, Brasília - DF, 72322-516"
    },
    socialProfiles: [
      "https://www.facebook.com/lkimports",
      "https://www.instagram.com/lkimportsbr__/",
      "https://www.tiktok.com/@lkimports",
      "https://www.linkedin.com/company/lkimports"
    ],
    organization: {
      ratingValue: 4.9,
      ratingCount: 150,
      reviewCount: 150,
    },
    faq: [
      {
        question: "Qual é o tempo médio de reparo?",
        answer: "A maioria dos reparos é concluída em 1-3 dias úteis. Consertos simples podem ser feitos no mesmo dia."
      },
      {
        question: "Vocês oferecem garantia?",
        answer: "Sim, todos os nossos serviços incluem garantia de 90 dias contra defeitos de fabricação e mão de obra."
      },
      {
        question: "Como funciona o diagnóstico?",
        answer: "Realizamos diagnóstico gratuito e sem compromisso. Você recebe um orçamento detalhado antes de autorizar qualquer reparo."
      },
      {
        question: "Qual é a diferença entre troca de vidro e tela completa?",
        answer: "Na troca de vidro mantemos seu display original, trocando apenas a camada externa. Na tela completa, substituímos todo o painel."
      },
      {
        question: "Vocês trabalham com qual marcas?",
        answer: "Trabalhamos com iPhone, Samsung, Xiaomi, Motorola, Nokia, LG, OnePlus e tablets de todas as marcas."
      }
    ],
    breadcrumbs: [
      { name: "Início", url: "https://lkimports.com.br/" },
      { name: "Serviços", url: "https://lkimports.com.br/servicos" },
    ],
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
    contactOnline: "WhatsApp Online",
    credit: {
      text: "Site desenvolvido por",
      name: "phstatic.com.br",
      url: "https://phstatic.com.br"
    }
  },

  // ---------------------------------------------------------------------------
  // Informações de Contato
  // ---------------------------------------------------------------------------
  contact: {
    phone: "+556195191308",
    phoneDisplay: "(61) 9519-1308",
    email: "lonkisimports@gmail.com",
    whatsapp: "https://wa.me/556195191308",
    address: "QR 429 Conjunto 16 Loja 01, Samambaia Norte",
    city: "Brasília - DF, 72322-516",
    mapsUrl: "https://www.google.com/maps/place/Lk+Imports+-+Assistência+Técnica+e+Acessórios/@-15.893565,-48.1421581,20z/data=!4m6!3m5!1s0x935bd31145795cd3:0xec1f82b4bcf6bef9!8m2!3d-15.8934821!4d-48.1423218!16s%2Fg%2F11z3w0h8k0?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2713.392310647244!2d-48.14510482001694!3d-15.892496707851043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bd31145795cd3%3A0xec1f82b4bcf6bef9!2sLk%20Imports%20-%20Assist%C3%AAncia%20T%C3%A9cnica%20e%20Acess%C3%B3rios!5e0!3m2!1spt-BR!2sbr!4v1774462765631!5m2!1spt-BR!2sbr",
    hours: {
      monday: "08:30 — 19:30",
      tuesday: "08:00 — 19:30",
      wednesday: "08:00 — 19:30",
      thursday: "08:00 — 19:30",
      friday: "08:00 — 19:30",
      saturday: "08:00 — 19:30",
      sunday: "08:00 — 15:00",
      holiday: "Consulte no WhatsApp",
    },
    support: {
      phone: "+556195191308",
      email: "lonkisimports@gmail.com",
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

  animations: {
    logoHover: 'splitLetterReveal', // Options: glowPulse, splitLetterReveal, gradientFlow, letterSpaceExpand, underlineAnimated
  },
//   ---------------------------------------------------------------------------
// Opções: glowPulse, splitLetterReveal, gradientFlow, letterSpaceExpand, underlineAnimated
// glowPulse - Brilho pulsante sofisticado
// splitLetterReveal - Vibração futurista discreta
// gradientFlow - Fluxo de gradiente suave
// letterSpaceExpand - Espaçamento + escala clássico
// underlineAnimated ⭐ (DEFAULT) - Seu favorito: sublinhado verde + glow + scale
//   --------------------------------------------------------------------------- 

  // ---------------------------------------------------------------------------
  // Redes Sociais
  // ---------------------------------------------------------------------------
  social: {
    instagram: {
      url: "https://www.instagram.com/lkimportsbr__/",
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
          {
            icon: Cpu,
            title: "Reparo em Placa",
            description: "Recuperação de placas com microsoldagem avançada.",
            details: [
              "Diagnóstico completo com testes avançados",
              "Microsoldagem de componentes SMD",
              "Recuperação de pontos de solda frios",
              "Troca de circuitos integrados danificados",
              "Teste final de funcionamento completo",
            ],
            warranty: "90 dias",
            timeline: "1-2 dias"
          },
          {
            icon: Smartphone,
            title: "Troca de Vidro",
            description: "Mantemos sua tela original, trocando apenas o vidro.",
            details: [
              "Remoção cuidadosa do vidro danificado",
              "Limpeza profunda da tela LCD/OLED",
              "Aplicação de adesivo de alta qualidade",
              "Instalação de vidro premium resistente",
              "Teste completo de touch e cores",
            ],
            warranty: "90 dias",
            timeline: "2-3 horas"
          },
          {
            icon: Battery,
            title: "Bateria Premium",
            description: "Baterias de alta capacidade com garantia estendida.",
            details: [
              "Testes de voltagem e capacidade",
              "Bateria original ou equivalente premium",
              "Troca com dados preservados",
              "Calibração do sistema de bateria",
              "Configurações otimizadas de consumo",
            ],
            warranty: "6 meses",
            timeline: "30 minutos"
          },
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
        enabled: true,
        badge: "Avaliações Reais",
        title: "O que dizem",
        titleAccent: "Nossos Clientes",
        googleRating: "5.0",
        totalReviews: "4",
        ctaText: "Ver todas as avaliações",
        items: [
          { name: "Alexandre Pinuca", text: "Excelente atendimento e serviço de alta qualidade. O reparo foi feito com rapidez e eficiência, demonstrando muito profissionalismo. Fiquei muito satisfeito com o resultado final do meu telefone. Recomendo com confiança!", rating: 5, image: "https://lh3.googleusercontent.com/a/ACg8ocKml1BbA6rEzJbXfm8YYnDB90hvgofAhIQ-Dyx4784gBnCdMA=w36-h36-p-rp-mo-br100" },
          { name: "Andreara Souza", text: "Gostaria de parabenizar pelo excelente atendimento. O serviço foi realizado com agilidade e qualidade, superando minhas expectativas. Estou extremamente satisfeita com o resultado do meu telefone.", rating: 5, image: "https://lh3.googleusercontent.com/a/ACg8ocJc8qF_84Lzxpz39i5eRA6ur-c29vV4At-UDbInVRtcd8qBRQ=w36-h36-p-rp-mo-br100" },
          { name: "Ágata Souza", text: "Muito bom o trabalhoe rápido a entrega do celular", rating: 5, image: "https://lh3.googleusercontent.com/a-/ALV-UjVgMqYIjjjnPNK7pslZtopl0XTzk7GIeLGvYKcxDPhZtMiBqeCI0Q=w36-h36-p-rp-mo-br100" },
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
        image: "https://i.imgur.com/rLZbrsm.png",
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
          image: "https://i.imgur.com/BgjzVSd.jpeg",
          imageBadge: {
            title: "Fundada em 2024",
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
      // Categorias organizadas com subcategorias bem definidas
      categories: {
        smartphones: { id: "smartphones", name: "Smartphones", icon: Smartphone, color: "from-teal-600/70 to-teal-700/60", subcategories: ["iPhone", "Samsung", "Xiaomi", "Realme", "Outros"] },
        tablets: { id: "tablets", name: "Tablets", icon: Smartphone, color: "from-cyan-600/60 to-teal-700/50", subcategories: ["iPad", "Samsung", "Redmi", "Outros"] },
        wearables: { id: "wearables", name: "Wearables", icon: Watch, color: "from-rose-600/60 to-rose-700/50", subcategories: ["Apple Watch", "Smartband", "Relógios"] },
        audio: { id: "audio", name: "Áudio", icon: Speaker, color: "from-teal-600/60 to-cyan-700/50", subcategories: ["Fones Bluetooth", "Caixas de Som", "Headphones", "Microfones"] },
        acessorios: { id: "acessorios", name: "Acessórios", icon: Battery, color: "from-rose-600/50 to-pink-700/40", subcategories: ["Carregadores", "Cabos", "Capinhas", "Proteção de Tela", "Suportes", "Canetas"] },
        computadores: { id: "computadores", name: "Computadores", icon: Cpu, color: "from-amber-600/50 to-orange-700/40", subcategories: ["MacBook", "iMac", "Mac Mini", "Acessórios"] },
        gaming: { id: "gaming", name: "Gaming", icon: Zap, color: "from-rose-600/60 to-rose-700/50", subcategories: ["PlayStation", "Xbox", "Nintendo", "VR"] },
        smart_home: { id: "smart_home", name: "Smart Home", icon: Wifi, color: "from-teal-600/50 to-teal-700/40", subcategories: ["Conectividade", "Rastreadores", "Robôs"] },
        outros: { id: "outros", name: "Outros", icon: Package, color: "from-zinc-600/50 to-zinc-700/40", subcategories: ["Diversos"] },
      },
      items: products,
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
        hoursDesc: "Segunda: 08:30 — 19:30 | Terça: 08:00 — 19:30 | Quarta: 08:00 — 19:30 | Quinta: 08:00 — 19:30 | Sexta: 08:00 — 19:30 | Sábado: 08:00 — 19:30 | Domingo: 08:00 — 15:00",
        socialTitle: "Redes Sociais",
        socialDesc: "Acompanhe nosso trabalho"
      }
    },
    // -------------------------------------------------------------------------
    // Página de Orçamento
    // -------------------------------------------------------------------------
    quote: {
      hero: {
        badge: "Avaliação Gratuita",
        title: "Solicite seu",
        titleAccent: "Orçamento",
        description: "Orçamento 100% gratuito e sem compromisso. Nossa avaliação técnica identifica o problema e oferece a solução mais econômica para seu dispositivo."
      },
      process: [
        {
          icon: Calculator,
          title: "Avaliação",
          description: "Análise técnica completa do seu aparelho para identificar todos os problemas e necessidades de reparo."
        },
        {
          icon: Clock,
          title: "Orçamento",
          description: "Elaboração de orçamento detalhado com valores transparentes e opções de reparo."
        },
        {
          icon: ShieldCheck,
          title: "Aprovação",
          description: "Você aprova o serviço e agendamos a realização do reparo com garantia estendida."
        }
      ],
      categories: [
        { id: "todos", label: "Todos" },
        { id: "hardware", label: "Hardware" },
        { id: "avancado", label: "Avançado" },
        { id: "sistema", label: "Sistema" },
        { id: "energia", label: "Energia" },
        { id: "estetica", label: "Estética" }
      ],
      services: [
        { id: 1, name: "Reparos em Placa", price: "Sob orçamento", category: "avancado", icon: Cpu, description: "Recuperação de placas com microsoldagem avançada" },
        { id: 2, name: "Troca de Tela", price: "A partir de R$ 149", category: "hardware", icon: Smartphone, description: "Manutenção da tela original, troca apenas do vidro" },
        { id: 3, name: "Troca de Conector", price: "A partir de R$ 89", category: "hardware", icon: Zap, description: "Reparo de conectores de carregamento danificados" },
        { id: 4, name: "Troca de Bateria", price: "A partir de R$ 89", category: "energia", icon: Battery, description: "Baterias de alta capacidade com garantia estendida" },
        { id: 5, name: "Troca de Tampa", price: "A partir de R$ 99", category: "estetica", icon: Smartphone, description: "Reparo estético para tampa traseira danificada" },
        { id: 6, name: "Limpeza (Desoxidação)", price: "A partir de R$ 120", category: "avancado", icon: Wrench, description: "Limpeza especializada para corrosão e oxidação" },
        { id: 7, name: "Desbloqueio de Conta", price: "A partir de R$ 79", category: "sistema", icon: Star, description: "Remoção de bloqueios de conta iCloud/Google" },
        { id: 8, name: "Troca de Câmera", price: "A partir de R$ 110", category: "hardware", icon: Camera, description: "Reparo de câmera frontal e traseira" },
        { id: 9, name: "Reparo de Face ID", price: "Sob orçamento", category: "avancado", icon: Star, description: "Calibração e reparo do sistema de reconhecimento facial" },
        { id: 10, name: "Reparo de Wi-Fi", price: "A partir de R$ 99", category: "hardware", icon: Zap, description: "Solução para problemas de conectividade Wi-Fi" },
        { id: 11, name: "Reparo de Superaquecimento", price: "Sob orçamento", category: "avancado", icon: Zap, description: "Diagnóstico e reparo de problemas de aquecimento" },
        { id: 12, name: "Atualização de Sistema", price: "A partir de R$ 59", category: "sistema", icon: Star, description: "Atualização de software e sistema operacional" }
      ],
      form: {
        serviceOptions: [
          "Reparo em Placa",
          "Troca de Tela",
          "Troca de Bateria",
          "Reparo de Software",
          "Limpeza Especializada",
          "Reparo de Câmera",
          "Reparo de Áudio",
          "Outro"
        ]
      },
      benefits: [
        {
          icon: ShieldCheck,
          title: "Garantia Estendida",
          description: "90 dias de garantia em todos os serviços realizados"
        },
        {
          icon: Clock,
          title: "Agilidade Máxima",
          description: "A maioria dos reparos é feita no mesmo dia"
        },
        {
          icon: Star,
          title: "Peças Premium",
          description: "Trabalhamos apenas com componentes de alta qualidade"
        },
        {
          icon: Calculator,
          title: "Transparência Total",
          description: "Orçamento detalhado sem valores ocultos"
        }
      ]
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

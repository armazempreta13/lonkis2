/**
 * LK Imports - Site Configuration File
 * Edit this file to change any text, link, image, or setting across the entire site.
 */
export const siteConfig = {
    brand: {
        name: "LK Imports",
        logo: "https://i.imgur.com/Ga4bMmk.png",
        description: "Especialistas em assistência técnica de alta performance. 17 anos de experiência cuidando do seu equipamento com precisão e garantia.",
        since: 2007,
    },
    nav: [
        { label: "Início", href: "/" },
        { label: "Serviços", href: "/servicos" },
        { label: "Produtos", href: "/produtos" },
        { label: "Sobre", href: "/sobre" },
        { label: "Contato", href: "/contato" },
    ],
    contact: {
        phone: "+55 61 9519-1308",
        phoneDisplay: "(61) 9519-1308",
        whatsapp: "https://wa.me/556195191308",
        address: "QR 429 Conjunto 16 Loja 01",
        city: "Brasília - DF, 72322-516",
        mapsUrl: "https://www.google.com/maps/place/LK+Imports+-+Assist%C3%AAncia+T%C3%A9cnica+de+Celulares/@-15.867958,-48.106456,17z",
        mapsEmbed: "https://www.google.com/maps?q=QR+429+Conjunto+16+Loja+01+Brasilia+DF&output=embed",
        hours: "Segunda a Sexta\n08:00 — 19:30",
    },
    social: {
        instagram: "https://www.instagram.com/lkimports_061?igsh=MWR5dWZ2bjFkOGxsZQ%3D%3D&utm_source=qr",
        facebook: "https://www.facebook.com/share/18DjhAuiMA/?mibextid=wwXIfr",
    },
    home: {
        hero: {
            badge: "Referência em Soluções Tecnológicas",
            experience: "17 Anos de Experiência",
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
            subtitle: "Do reparo de placa à troca de tela, oferecemos um ecossistema completo de soluções para o seu dispositivo.",
            items: [
                {
                    id: "reparo-placa",
                    title: "Reparo em Placa",
                    description: "Microsoldagem avançada e recuperação de placas mortas com equipamentos de última geração.",
                    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop",
                    icon: "Cpu"
                },
                {
                    id: "troca-vidro",
                    title: "Troca de Vidro",
                    description: "Preservamos o display original do seu aparelho, trocando apenas o vidro trincado com maquinário especializado.",
                    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop",
                    icon: "Smartphone"
                },
                {
                    id: "bateria",
                    title: "Bateria Premium",
                    description: "Substituição de bateria com componentes de alta capacidade e garantia de durabilidade.",
                    image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?q=80&w=800&auto=format&fit=crop",
                    icon: "Battery"
                },
                {
                    id: "apple-watch",
                    title: "Apple Watch",
                    description: "Especialistas em reparo de smartwatches, troca de vidro e bateria mantendo a vedação.",
                    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop",
                    icon: "Watch"
                }
            ]
        },
        differentials: {
            badge: "O Padrão LK",
            title: "Por que nos",
            titleAccent: "Escolher?",
            items: [
                {
                    title: "Garantia Real",
                    description: "90 dias de garantia em todos os serviços. Seu equipamento protegido e você tranquilo.",
                    icon: "ShieldCheck"
                },
                {
                    title: "Peças Premium",
                    description: "Trabalhamos apenas com componentes de alta qualidade, testados e homologados.",
                    icon: "Award"
                },
                {
                    title: "Rapidez",
                    description: "A maioria dos reparos é feita no mesmo dia para você não ficar desconectado.",
                    icon: "Zap"
                },
                {
                    title: "Laboratório Avançado",
                    description: "Estrutura completa com equipamentos de última geração para diagnósticos precisos.",
                    icon: "Wrench"
                }
            ]
        },
        testimonials: {
            badge: "Avaliações Reais",
            title: "O que dizem",
            titleAccent: "Nossos Clientes",
            googleRating: "4.9",
            totalReviews: "150+",
            items: [
                {
                    name: "Carlos Silva",
                    text: "Excelente atendimento! Meu iPhone estava condenado por outra assistência e a LK Imports conseguiu recuperar a placa. Preço justo e muita transparência.",
                    rating: 5,
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                },
                {
                    name: "Mariana Costa",
                    text: "Troquei a tela do meu Samsung e ficou perfeito. O serviço foi super rápido, entregaram no mesmo dia. Recomendo de olhos fechados!",
                    rating: 5,
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
                },
                {
                    name: "João Pedro",
                    text: "Profissionais de verdade. Levei meu Apple Watch que não ligava mais e resolveram o problema da bateria rapidamente. Atendimento nota 10.",
                    rating: 5,
                    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                }
            ]
        },
        location: {
            badge: "Onde estamos",
            title: "Nossa",
            titleAccent: "Unidade",
            subtitle: "Visite nossa loja física em Samambaia e conheça nossa estrutura completa de atendimento.",
        },
        cta: {
            badge: "Atendimento Imediato",
            title: "Soluções Rápidas",
            titleAccent: "e Eficazes.",
            subtitle1: "Seja para trabalho, estudos ou lazer, seu equipamento precisa estar sempre funcionando bem.",
            subtitle2: "Na LK Imports, oferecemos soluções seguras e eficazes para melhorar a performance do seu equipamento.",
            subtitle3: "Contamos com equipe especializada e componentes de qualidade para resolver diversos problemas com rapidez e preço acessível! Tudo para que você continue conectado sem interrupções.",
            buttonText: "Solicitar Orçamento",
            image: "https://images.unsplash.com/photo-1556656793-062ff9878258?q=80&w=1000&auto=format&fit=crop",
            floatingBadge: {
                number: "17",
                text: "Anos de \n Experiência"
            }
        }
    },
    about: {
        hero: {
            badge: "Nossa História",
            title: "Quem",
            titleAccent: "Somos",
            paragraphs: [
                "A LK Imports nasceu da paixão pela tecnologia e do compromisso em oferecer o melhor serviço de assistência técnica da região.",
                "Com mais de 17 anos de experiência, nos tornamos referência em Samambaia, Ceilândia e Taguatinga pela qualidade de nossos reparos e pela transparência no atendimento.",
                "Nossa missão é garantir que você nunca fique desconectado. Por isso, investimos constantemente em treinamento técnico e em componentes de primeira linha para oferecer soluções rápidas e definitivas."
            ],
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
            imageBadge: {
                title: "Fundada em 2007",
                subtitle: "Tradição & Inovação"
            }
        },
        values: [
            { icon: "Target", title: "Missão", desc: "Oferecer soluções tecnológicas com excelência, garantindo a satisfação e a conectividade dos nossos clientes." },
            { icon: "Eye", title: "Visão", desc: "Ser reconhecida como a melhor e mais confiável assistência técnica do Distrito Federal até 2027." },
            { icon: "Heart", title: "Valores", desc: "Transparência, ética, agilidade e compromisso inabalável com a qualidade técnica." },
        ],
        stats: [
            { icon: "Award", title: "17 Anos", desc: "De experiência no mercado" },
            { icon: "ShieldCheck", title: "15k+", desc: "Aparelhos recuperados" },
            { icon: "Star", title: "4.9/5", desc: "Avaliação no Google" },
            { icon: "MapPin", title: "1", desc: "Laboratório avançado" },
        ]
    },
    servicesPage: {
        hero: {
            badge: "Catálogo de Serviços",
            title: "Nossas",
            titleAccent: "Especialidades",
            subtitle: "Soluções completas e definitivas para o seu dispositivo, executadas por especialistas com mais de 17 anos de experiência."
        },
        categories: ["Todos", "Hardware", "Avançado", "Sistema", "Energia", "Manutenção", "Estética"],
        detailedServices: [
            { id: 1, name: "Reparos em Placa", price: "Sob orçamento", category: "Avançado", icon: "Cpu" },
            { id: 2, name: "Troca de Tela", price: "A partir de R$ 149", category: "Hardware", icon: "Smartphone" },
            { id: 3, name: "Troca de Conector", price: "A partir de R$ 89", category: "Hardware", icon: "Zap" },
            { id: 4, name: "Troca de Bateria", price: "A partir de R$ 89", category: "Energia", icon: "Battery" },
            { id: 5, name: "Troca de Tampa", price: "A partir de R$ 99", category: "Estética", icon: "Smartphone" },
            { id: 6, name: "Limpeza (Desoxidação)", price: "A partir de R$ 120", category: "Manutenção", icon: "Shield" },
            { id: 7, name: "Desbloqueio de Conta", price: "A partir de R$ 79", category: "Sistema", icon: "Lock" },
            { id: 8, name: "Troca de Câmera", price: "A partir de R$ 110", category: "Hardware", icon: "Camera" },
            { id: 9, name: "Troca de Alto-falante", price: "A partir de R$ 79", category: "Hardware", icon: "Speaker" },
            { id: 10, name: "Troca de Microfone", price: "A partir de R$ 79", category: "Hardware", icon: "Mic" },
            { id: 11, name: "Troca de Botão Power/Vol", price: "A partir de R$ 79", category: "Hardware", icon: "Power" },
            { id: 12, name: "Troca de Vibra Call", price: "A partir de R$ 69", category: "Hardware", icon: "Smartphone" },
            { id: 13, name: "Troca de Slot de Chip", price: "A partir de R$ 89", category: "Hardware", icon: "Smartphone" },
            { id: 14, name: "Troca de Wi-Fi / Antena", price: "A partir de R$ 99", category: "Hardware", icon: "Wifi" },
            { id: 15, name: "Reparo de Face ID / Touch ID", price: "Sob orçamento", category: "Avançado", icon: "Fingerprint" },
            { id: 16, name: "Reparo de Carregamento Lento", price: "A partir de R$ 89", category: "Energia", icon: "Zap" },
            { id: 17, name: "Reparo de Superaquecimento", price: "Sob orçamento", category: "Avançado", icon: "Thermometer" },
            { id: 18, name: "Atualização de Sistema", price: "A partir de R$ 59", category: "Sistema", icon: "RefreshCw" },
            { id: 19, name: "Downgrade de iOS / Android", price: "A partir de R$ 79", category: "Sistema", icon: "RefreshCw" },
            { id: 20, name: "Formatação com Backup", price: "A partir de R$ 69", category: "Sistema", icon: "HardDrive" },
            { id: 21, name: "Recuperação de Sistema", price: "A partir de R$ 89", category: "Sistema", icon: "RefreshCw" },
        ],
        supportedDevices: {
            badge: "Marcas & Modelos",
            title: "Dispositivos",
            titleAccent: "Suportados",
            brands: [
                { brand: 'Apple', icon: "Smartphone", models: ['iPhone 15 Pro Max', 'iPhone 14 Series', 'iPhone 13 Series', 'iPhone 12 Series', 'iPhone 11 Series', 'iPhone XR/X', 'iPhone 8/7'] },
                { brand: 'Samsung', icon: "Zap", models: ['Linha S (S24, S23, S22)', 'Linha A (A54, A34, A14)', 'Linha M (M54, M34)', 'Linha Z (Fold, Flip)'] },
                { brand: 'Xiaomi', icon: "Cpu", models: ['Linha Mi (14, 13, 12)', 'Redmi Note (13, 12, 11)', 'Poco (F5, X6, M6)', 'Black Shark'] },
                { brand: 'Motorola', icon: "Shield", models: ['Linha Edge (40, 30)', 'Linha Moto G (G84, G54)', 'Linha Razr', 'Moto E'] }
            ]
        },
        items: [
            {
                id: "reparo-placa",
                title: "Reparo em Placa",
                description: "Diagnóstico avançado e microsoldagem para recuperar placas que outras assistências condenam. Resolvemos problemas de áudio, touch, Wi-Fi, carregamento e aparelhos que não ligam.",
                image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop",
                features: ["Microsoldagem Avançada", "Recuperação de Dados", "Reparo de Face ID", "Curto-circuito"]
            },
            {
                id: "troca-vidro",
                title: "Troca de Vidro",
                description: "Seu display original ainda funciona? Trocamos apenas o vidro trincado. Processo feito com maquinário industrial (OCA) que mantém a originalidade e qualidade da imagem.",
                image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop",
                features: ["Mantém Display Original", "Economia de até 60%", "Acabamento Perfeito", "Tecnologia OCA"]
            },
            {
                id: "bateria",
                title: "Troca de Bateria",
                description: "Substituição rápida e segura da bateria do seu dispositivo. Trabalhamos com células de alta capacidade que devolvem a autonomia original do seu aparelho.",
                image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?q=80&w=800&auto=format&fit=crop",
                features: ["Baterias Premium", "Troca em 30 minutos", "Garantia de 90 dias", "Saúde 100%"]
            },
            {
                id: "apple-watch",
                title: "Reparo de Apple Watch",
                description: "Assistência especializada na linha de smartwatches da Apple. Realizamos troca de vidro, bateria e reparos em placa com vedação profissional.",
                image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop",
                features: ["Troca de Vidro", "Troca de Bateria", "Vedação Profissional", "Reparo de Placa"]
            }
        ]
    },
    productsPage: {
        hero: {
            badge: "Loja LK",
            title: "Produtos",
            titleAccent: "Premium",
            subtitle: "Acessórios originais e dispositivos seminovos com garantia e procedência verificada pela nossa equipe técnica."
        },
        categories: ["Todos", "iPhone Novos", "Video Game", "AirPods", "Apple Watch", "JBL"],
        items: [
            {
                id: 1,
                name: "iPhone 16",
                category: "iPhone Novos",
                price: 5999,
                image: "https://picsum.photos/seed/iphone16/300/300",
                colors: ["#FFC0CB", "#FFD700", "#000000"],
                badge: "Lacrado"
            },
            {
                id: 2,
                name: "iPhone 16 Pro",
                category: "iPhone Novos",
                price: 7999,
                image: "https://picsum.photos/seed/iphone16pro/300/300",
                colors: ["#FFFFFF", "#000000"],
                badge: "Lacrado"
            },
            {
                id: 3,
                name: "iPhone 16 Pro Max",
                category: "iPhone Novos",
                price: 8999,
                image: "https://picsum.photos/seed/iphone16promax/300/300",
                colors: ["#FFFFFF", "#000000"],
                badge: "Lacrado"
            },
            {
                id: 4,
                name: "PS5 Slim Mídia Digital",
                category: "Video Game",
                price: 3800,
                image: "https://picsum.photos/seed/ps5slim/300/300",
                colors: ["#FFFFFF"],
                badge: "Novo"
            },
            {
                id: 5,
                name: "PS5 Slim Mídia Física",
                category: "Video Game",
                price: 4200,
                image: "https://picsum.photos/seed/ps5slimf/300/300",
                colors: ["#FFFFFF"],
                badge: "Novo"
            },
            {
                id: 6,
                name: "XBOX Séries S 512GB",
                category: "Video Game",
                price: 2500,
                image: "https://picsum.photos/seed/xboxs/300/300",
                colors: ["#FFFFFF"],
                badge: "Novo"
            },
            {
                id: 7,
                name: "AirPods Pro",
                category: "AirPods",
                price: 1200,
                image: "https://picsum.photos/seed/airpodspro/300/300",
                colors: ["#FFFFFF"],
                badge: "Novo"
            },
            {
                id: 8,
                name: "Apple Watch Series 9",
                category: "Apple Watch",
                price: 3000,
                image: "https://picsum.photos/seed/watch9/300/300",
                colors: ["#000000", "#FFFFFF"],
                badge: "Novo"
            },
            {
                id: 9,
                name: "JBL Flip 6",
                category: "JBL",
                price: 600,
                image: "https://picsum.photos/seed/jblflip/300/300",
                colors: ["#000000", "#FF0000"],
                badge: "Novo"
            }
        ]
    },
    contactPage: {
        hero: {
            badge: "Atendimento Especializado",
            title: "Fale",
            titleAccent: "Conosco",
        },
        form: {
            nameLabel: "Nome Completo",
            namePlaceholder: "Como podemos te chamar?",
            whatsappLabel: "WhatsApp",
            whatsappPlaceholder: "(00) 00000-0000",
            subjectLabel: "Assunto",
            subjects: ["Orçamento de Reparo", "Acessórios", "Dúvidas Gerais", "Outros"],
            messageLabel: "Mensagem",
            messagePlaceholder: "Descreva o problema do seu aparelho ou o que você precisa...",
            buttonText: "Enviar Mensagem",
            successMessage: "Mensagem enviada com sucesso! Retornaremos em breve."
        },
        info: {
            title: "Informações",
            whatsappTitle: "WhatsApp",
            whatsappDesc: "Atendimento rápido",
            addressTitle: "Endereço",
            addressDesc: "Visite nossa loja",
            hoursTitle: "Horários",
            hoursDesc: "Segunda a Sexta, 08:00 - 19:30",
            socialTitle: "Redes Sociais",
            socialDesc: "Acompanhe nosso trabalho"
        }
    },
    footer: {
        description: "Especialistas em reparos avançados de smartphones e tablets. Qualidade, rapidez e garantia que você confia.",
        quickLinksTitle: "Links Rápidos",
        contactTitle: "Contato",
        copyright: "© 2024 LK Imports. Todos os direitos reservados."
    },
    chatbot: {
        welcomeMessage: "Olá! Como posso ajudar você hoje?",
        typingSpeed: 500,
    },
    seo: {
        title: "LK Imports | Assistência Técnica de Celulares em Brasília",
        description: "Especialistas em conserto de iPhone, Samsung, Xiaomi e tablets em Samambaia Norte. 17 anos de experiência, peças premium e garantia de 90 dias.",
        keywords: "assistência técnica, conserto de celular, brasília, samambaia norte, iphone, samsung, motorola, xiaomi, troca de tela, troca de bateria, lk imports",
        author: "LK Imports",
        ogImage: "https://i.imgur.com/Ga4bMmk.png",
        url: "https://lkimports.com.br", // Placeholder, will use actual URL if available
    }
};

<div align="center">
  <img src="https://i.imgur.com/Ga4bMmk.png" alt="LK Imports Logo" height="120" style="margin: 20px 0;">
  
  # 🔧 LK Imports
  
  **Assistência Técnica de Alta Precisão para Smartphones e Tablets**
  
  [![Status](https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge&color=14b8a6)](https://lkimports.com.br)
  [![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react&color=0f766e)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-6.4-blueviolet?style=for-the-badge&logo=vite&color=0f766e)](https://vitejs.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?style=for-the-badge&logo=typescript&color=0f766e)](https://www.typescriptlang.org/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&color=14b8a6)](LICENSE)
  
</div>

---

## 🎯 Sobre o Projeto

A **LK Imports** é uma plataforma moderna de assistência técnica baseada em web, desenvolvida com as melhores tecnologias do mercado. Oferecemos soluções rápidas, eficazes e transparentes para reparos de smartphones, tablets e smartwatches em Brasília.

**2 anos de experiência** • **150+ avaliações positivas** • **Garantia de 90 dias** • **Atendimento especializado**

---

## ✨ Destaques

- 🚀 **Performance Otimizada**: Code splitting, lazy loading de imagens, GPU acceleration
- 📱 **Design Responsivo**: Interface adaptada para desktop, tablet e mobile
- 🔍 **SEO Avançado**: Schemas JSON-LD, OG tags, structured data
- 🎨 **Animações Suaves**: Sistema configurable de animações com Framer Motion
- 🛡️ **Segurança**: Service Worker, offline support, cache strategy
- ⚡ **TypeScript**: Tipagem estrita para máxima confiabilidade
- 🎯 **Configuração Centralizada**: Tudo em um único arquivo `siteConfig.ts`

---

## 🚀 Começando Rápido

### Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**

### Instalação

```bash
# Clone o repositório
git clone https://github.com/armazempreta13/lonkis2.git
cd lk-imports

# Instale as dependências
npm install

# Configure as variáveis de ambiente (se necessário)
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Pré-visualizar build de produção
npm run preview
```

---

## 📚 Estrutura do Projeto

```
src/
├── components/           # Componentes React reutilizáveis
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Seções de página (Hero, Services, etc)
│   └── ui/              # Componentes UI (Button, Card, Modal, etc)
├── pages/               # Páginas principais
├── services/            # Lógica de chatbot e scripts
├── hooks/               # Hooks customizados (useLazyImage)
├── animations/          # Sistema de animações
├── data/                # JSON estático (products.json, knowledge.json)
├── App.tsx              # Componente raiz
├── main.tsx             # Entry point
├── index.css            # Estilos globais
├── constants.ts         # Constantes da aplicação
└── siteConfig.ts        # ⭐ CONFIGURAÇÃO GLOBAL DO SITE
```

---

## ⚙️ Configuração do Site

O arquivo **`siteConfig.ts`** é a fonte única da verdade para todas as customizações:

```typescript
// Altere aqui para customizar:
export const siteConfig = {
  brand: {
    name: "LK Imports",
    logo: "https://i.imgur.com/Ga4bMmk.png",
    logoSize: { navbar: { desktop: 72 }, footer: { desktop: 96 } }
  },
  seo: {
    title: "LK Imports | Assistência Técnica...",
    description: "Especialistas em conserto de celular..."
  },
  contact: {
    phone: "+556195191308",
    email: "contato@lkimports.com.br"
  },
  animations: {
    logoHover: 'glowPulse' // Opções: glowPulse, splitLetterReveal, gradientFlow, letterSpaceExpand, underlineAnimated
  },
  pages: {
    home: { /* ... */ },
    services: { /* ... */ },
    // ... mais páginas
  }
};
```

**Nenhuma hardcodificação necessária!** Altere valores e veja refletir em todo o site.

---

## 🎨 Sistema de Animações

O projeto inclui 5 animações configuráveis para o logo:

| Animação | Descrição |
|----------|-----------|
| `glowPulse` | Brilho pulsante sofisticado |
| `splitLetterReveal` | Vibração futurista discreta |
| `gradientFlow` | Fluxo de gradiente suave |
| `letterSpaceExpand` | Espaçamento + escala clássico |
| `underlineAnimated` ⭐ | Sublinhado verde + glow + scale |

Mude em `siteConfig.ts` → `animations.logoHover`

---

## 📊 Tecnologias Utilizadas

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite 6.4** - Build tool ultra-rápido
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animações fluidas

### Performance & SEO
- **Service Worker** - Offline support e caching
- **Code Splitting** - 4 vendor chunks otimizados
- **Lazy Loading** - IntersectionObserver para imagens
- **JSON-LD Schemas** - LocalBusiness, Organization, FAQ, Breadcrumb
- **React Helmet** - Meta tags dinâmicas

### Ferramentas
- **Lucide React** - Ícones SVG
- **React Router DOM** - Roteamento
- **Terser** - Minificação com remoção de console

---

## 📈 Performance

```
Build Output:
├── vendor-react: 41.77KB gzip
├── vendor-motion: 125.94KB gzip
├── vendor-icons: 14.56KB gzip
├── vendor-utils: 16.12KB gzip
└── index: 351.02KB gzip

✓ Code Splitting habilitado
✓ Lazy Loading de imagens
✓ GPU Acceleration
✓ Service Worker em produção
✓ Preconnect & DNS-Prefetch
```

---

## 🔗 Links Importantes

- 🌐 **Site**: [lkimports.com.br](https://lkimports.com.br)
- 📱 **WhatsApp**: [(61) 9519-1308](https://wa.me/556195191308)
- 📧 **Email**: contato@lkimports.com.br
- 📍 **Endereço**: QR 429 Conjunto 16 Loja 01, Samambaia Norte, Brasília - DF

### Redes Sociais
- [Instagram](https://www.instagram.com/lkimports_061)
- [Facebook](https://www.facebook.com/lkimports)
- [TikTok](https://www.tiktok.com/@lkimports)

---

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build otimizado para produção
npm run preview      # Pré-visualiza o build
npm run type-check   # Verifica tipos TypeScript
```

---

## 🛠️ Stack Técnico em Detalhes

### Dependências Principais
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.x",
  "motion": "^10.x",
  "lucide-react": "^5.34.0",
  "tailwindcss": "^3.x"
}
```

### DevDependencies
```json
{
  "vite": "^6.4.1",
  "typescript": "^5.x",
  "@types/react": "^18.x",
  "tailwindcss": "^3.x",
  "terser": "^5.x"
}
```

---

## 🤝 Créditos

- **Desenvolvido por**: [phstatic.com.br](https://phstatic.com.br)
- **Hospedagem**: GitHub Pages / Vercel / Netlify
- **Ícones**: [Lucide React](https://lucide.dev)
- **Design System**: Tailwind CSS + Custom Animations

---

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 📞 Suporte

Dúvidas sobre o projeto? Entre em contato:

- **Discord**: [Comunidade LK Imports](#)
- **Email**: contato@lkimports.com.br
- **WhatsApp**: [(61) 9519-1308](https://wa.me/556195191308)

---

<div align="center">

### Feito com ❤️ para a LK Imports

**[Voltar ao Topo](#)**

</div>

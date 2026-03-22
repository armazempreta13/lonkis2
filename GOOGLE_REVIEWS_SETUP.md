# Google Reviews API Setup Guide 🎯

## Overview
O sistema está **100% pronto** para integração com a API do Google Reviews. Funciona com fallback automático para avaliações mockadas enquanto as credenciais não estão configuradas.

## Estrutura criada:

### 1. **Serviço** (`src/services/googleReviewsService.ts`)
- ✅ Busca reviews do Google Places API
- ✅ Cache de 24h localStorage para evitar rate limit
- ✅ Fetch de ratings e contagem de reviews
- ✅ Tratamento de erros com fallback

### 2. **Hook** (`src/hooks/useGoogleReviews.ts`)
- ✅ `useGoogleReviews()` - Obter reviews e ratings
- ✅ Loading state automático
- ✅ Error handling
- ✅ Suporte a refetch manual

### 3. **Componente Testimonials** (`src/components/sections/Testimonials.tsx`)
- ✅ Integrado com o hook
- ✅ **DESIGN 100% INTACTO** - Nenhuma alteração visual
- ✅ Fallback automático para mockadas
- ✅ Loader enquanto carrega

## Como Configurar

### Passo 1: Google Cloud Console
1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto (ou use existente)
3. Ative a API: **Google Places API**
4. Crie uma chave API (Credenciais → Create Credentials → API Key)

### Passo 2: Encontrar seu Place ID
1. Acesse: https://developers.google.com/maps/documentation/places/web-service/overview
2. Ou use: https://mapsplatform.google.com/maps-products/#maps-platform
3. Seu negócio já tem um Google My Business? Encontre o ID lá
4. Ou procure pelo endereço: https://www.google.com/maps/search/LK+Imports+Brasilia

### Passo 3: Configurar Variáveis de Ambiente
Adicione ao arquivo `.env` (ou `.env.local`):

```env
VITE_GOOGLE_API_KEY=sua_api_key_aqui_com_acesso_a_places_api
VITE_GOOGLE_PLACE_ID=ChIJP1hJOMm_W5MR9pafUPQ5Nts
VITE_MAX_REVIEWS=3
```

### Passo 4: Teste

```bash
npm run dev
```

Abra o console (F12) e procure por:
- ✅ `Google reviews loaded successfully` - Tudo funcionando!
- ℹ️ `No Google reviews fetched, using fallback` - Usando mockadas (credenciais faltando)

## Arquivo .env.example fornecido

Um `.env.example` foi criado com os templates. Copie e preencha com suas credenciais.

## Cache & Performance

- **Cache de 24h**: Evita múltiplas chamadas à API
- **LocalStorage**: Persiste entre reloads
- **Fallback automático**: Se falhar, usa mockadas
- **Rate limiting amigável**: Apenas 1 fetch por 24h por sessão

## Debugging

Abra console (F12) e procure:
```
✅ Google Reviews: X reviews fetched
⚠️ Google Reviews: Credenciais não configuradas
❌ Google Reviews Error: [erro]
ℹ️ Google Reviews: Using cached data
```

## Estrutura de Dados

Cada review é transformado para:
```typescript
{
  name: string;           // "João Silva"
  text: string;          // "Excelente serviço..."
  rating: number;        // 1-5
  image?: string;        // URL da foto do usuário
  isFromGoogle?: boolean; // true se veio da API
}
```

## Quando Reviews Aparecem

1. **Na primeira carga**: Mostra mockadas enquanto carrega
2. **Após 1-2 segundos**: Se tiver credenciais, substitui por reais
3. **Se falhar**: Mantém mockadas
4. **Na reload**: Usa cache se < 24h

## Tudo Pronto! ✅

Quando você configurar as credenciais, o site automaticamente:
1. Fetcha reviews do Google
2. Atualiza ratings
3. Mostra avaliações REAIS de clientes
4. Cacheia por 24h
5. Mantém design 100% igual

Nenhuma alteração visual ou funcional necessária!

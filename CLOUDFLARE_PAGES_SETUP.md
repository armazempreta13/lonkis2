---
sidebar_label: Build Configuration
---

# Configuração de Build para Cloudflare Pages

Para que o Cloudflare Pages execute o build corretamente com a resolução de módulos opcionais do Rollup, fça o seguinte:

## No Dashboard do Cloudflare

1. Vá para **Pages**
2. Selecione seu projeto **lonkis2**
3. Vá para **Settings** > **Builds & deployments**
4. Clique em **Edit configuration**
5. Defina:

```
Build command: npm install --include=optional --legacy-peer-deps && npm run build
Build output directory: dist
Node version: 22
```

## Ou via wrangler CLI

Execute:
```bash
npx wrangler pages project create lonkis2
npx wrangler pages deploy dist --project-name=lonkis2
```

## Variáveis de Ambiente

Se precisar de variáveis, adicione em **Settings** > **Environment variables**

## Troubleshooting

Se o erro do Rollup persistir:

1. Limpe o cache:
   - Vá para **Builds & deployments**
   - Clique no último deployment
   - Clique em "Clear build cache"

2. Reconecte o repositório:
   - **Settings** > **Git configuration**
   - Reconecte o GitHub

3. Force um novo deploy:
   - Clique em qualquer deployment anterior
   - Clique em "Retry"

---

Mais informações: https://developers.cloudflare.com/pages/

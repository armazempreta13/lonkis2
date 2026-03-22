# Deployment no Cloudflare Pages

Este projeto está **totalmente configurado e otimizado** para deploy no Cloudflare Pages.

## ✨ Solução Implementada

### O Problema
Rollup e Tailwind CSS usam módulos nativos (binários compilados) para melhor performance. Esses módulos variam por plataforma (Linux, macOS, Windows) e precisam ser instalados corretamente.

### A Solução
1. **Módulos nativos como devDependencies explícitas** em `package.json`
2. **Script prebuild automático** (`scripts/setup-build.js`) que verifica e instala módulos
3. **Configuração `.npmrc` otimizada** para instalação confiável
4. **Arquivo `.node-version`** que especifica Node.js 22.16.0

## 🔧 Configuração no Cloudflare Pages

### Build Command
Use **EXATAMENTE** este comando:

```bash
rm -f package-lock.json && npm install --legacy-peer-deps --force && npm run build
```

### Passo a Passo:

1. Acesse: https://dash.cloudflare.com
2. Vá para **Pages** > **lonkis2**
3. **Settings** > **Builds & deployments**
4. Clique em **Edit configuration**
5. Cole no **Build command:**
   ```
   rm -f package-lock.json && npm install --legacy-peer-deps --force && npm run build
   ```
6. **Build output directory:** `dist`
7. **Root directory:** (deixar vazio)
8. **Node.js version:** `22` (ou deixar padrão)
9. Clique **Save and Deploy**

## ✅ O Que Acontece Durante o Build

```
1. npm install → Instala todas as dependências incluindo módulos nativos
2. npm run build → Executa o prebuild hook
   ├─ scripts/setup-build.js → Verifica módulos nativos
   ├─ Instala @rollup/rollup-linux-x64-gnu & lightningcss-linux-x64-gnu
   └─ Executa vite build
3. Resultado → pasta dist/ pronta para deploy
```

## 📋 Dependências Nativas Incluídas

**Rollup (4.60.0):**
- `@rollup/rollup-linux-x64-gnu`
- `@rollup/rollup-darwin-x64`
- `@rollup/rollup-darwin-arm64`
- `@rollup/rollup-win32-x64-msvc`

**LightningCSS (1.27.0):**
- `lightningcss-linux-x64-gnu`
- `lightningcss-darwin-x64`
- `lightningcss-darwin-arm64`
- `lightningcss-win32-x64-msvc`

## 🆘 Se o Build Ainda Falhar

1. **No Dashboard:**
   - Vá para **Pages > lonkis2 > Settings > Builds & deployments**
   - Clique em **Edit configuration**
   - Garanta que o Build command é exatamente:
     ```
     rm -f package-lock.json && npm install --legacy-peer-deps --force && npm run build
     ```

2. **Limpar Build Cache:**
   - Vá para **Builds & deployments**
   - Clique em **Clear build cache**
   - Clique **Retry deployment**

3. **Se ainda falhar:**
   - Verifique Node.js é v22 ou superior
   - Reconecte o repositório GitHub em **Settings > Git configuration**

## 🚀 URLs

- **Site Produção:** https://lonkis2.pages.dev
- **Dashboard:** https://dash.cloudflare.com
- **Repositório:** https://github.com/armazempreta13/lonkis2

## 📚 Arquivos Importantes

- `package.json` - Dependências incluindo módulos nativos
- `.npmrc` - Configuração npm para instalação confiável
- `.node-version` - Especifica Node.js 22.16.0
- `scripts/setup-build.js` - Prebuild script automático
- `wrangler.toml` - Configuração Cloudflare (para referência)

---

**Status:** ✅ Pronto para Production
**Última atualização:** 2026-03-22

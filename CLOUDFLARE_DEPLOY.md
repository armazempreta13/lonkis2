# Deployment no Cloudflare Pages

Este projeto está configurado para deploy automático no Cloudflare Pages.

## 🔧 Configuração Necessária no Dashboard

O Cloudflare Pages **NÃO** usa arquivos `.toml` para build automaticamente. Você precisa configurar manualmente no dashboard:

### Passos:

1. **Conectar Repositório**
   - Acesse https://dash.cloudflare.com
   - Vá para **Pages**
   - Clique em **Create a project** > **Connect to Git**
   - Selecione o repositório `armazempreta13/lonkis2`
   - Clique em **Deploy**

2. **Configurar Build Settings** ⚠️ IMPORTANTE
   - Após conectar, você será levado a **Build configuration**
   - Configure exatamente assim:
   
   ```
   Build command:     npm install --include=optional --legacy-peer-deps && npm run build
   Build output dir:  dist
   Root directory:    (deixar vazio ou /)
   Node.js version:   22.x
   ```

3. **Deploy**
   - Clique em **Save and Deploy**
   - Aguarde o build completar (~/15-20 segundos)

## ✅ Verificação

Após o deploy:
- Acesse https://lonkis2.pages.dev para visualizar
- Verifique os logs em **Pages > Deployments** se algo der errado

## 🆘 Se o Build Falhar com Erro do Rollup

Erro típico: `Cannot find module @rollup/rollup-linux-x64-gnu`

**Solução:**

1. **No Dashboard:**
   - Vá para **Pages > lonkis2 > Settings > Builds & deployments**
   - Clique em **Edit configuration**
   - Certifique-se que o Build command é:
     ```
     npm install --include=optional --legacy-peer-deps && npm run build
     ```

2. **Importante:** Use `--include=optional` (não é `--omit=optional`)

3. **Se ainda falhar:**
   - Vá para **Builds & deployments** > último deployment
   - Clique nos three dots (...) > **Clear build cache**
   - Faça um novo push ao repositório (ou clique **Retry deployment**)

## 📋 Configurações Adicionadas

### `.npmrc`
Arquivo para otimizar instalação de dependências npm:
- `legacy-peer-deps=true` - Permite dependências antigas
- `include=optional` - Força instalação de deps opcionais
- Timeouts aumentados para builds remotos

### `wrangler.toml`
Configuração para Cloudflare (para referência, você ainda precisa do dashboard)

### `CLOUDFLARE_PAGES_SETUP.md`
Instruções adicionais de setup

## 🔗 Recursos Úteis

- **Dashboard:** https://dash.cloudflare.com
- **Pages Docs:** https://developers.cloudflare.com/pages/
- **Build Logs:** Pages > Deployments > seu deployment
- **Repositório:** https://github.com/armazempreta13/lonkis2

## 📝 Notas Importantes

- ⚠️ O `wrangler.toml` neste projeto é apenas para referência. O Cloudflare Pages usa as configurações do dashboard.
- A primeira build pode levar um pouco mais (30-60 segundos)
- Builds subsequentes são mais rápidas graças ao cache

---

**Última atualização:** 2026-03-22

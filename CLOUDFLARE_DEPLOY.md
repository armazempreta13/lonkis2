# Deployment no Cloudflare Pages

Este projeto está configurado para deploy automático no **Cloudflare Pages**.

## 🔧 Configuração Necessária no Dashboard

### ⚠️ IMPORTANTE: Comando de Build Correto

Para evitar erros do Rollup, use EXATAMENTE este comando:

```
npm install --legacy-peer-deps --force && npm run build
```

### Passos de Configuração:

1. **Conectar Repositório**
   - Acesse https://dash.cloudflare.com
   - Vá para **Pages**
   - Clique em **Create a project** > **Connect to Git**
   - Selecione o repositório `armazempreta13/lonkis2`

2. **Configurar Build Settings** ⚠️ **EXATAMENTE ASSIM:**
   
   ```
   Build command:     npm install --legacy-peer-deps --force && npm run build
   Build output dir:  dist
   Root directory:    (deixar vazio)
   Node.js version:   22
   ```

3. **Deploy**
   - Clique em **Save and Deploy**

## ✅ Verificação

Após o deploy:
- URL: https://lonkis2.pages.dev
- Verificar logs em **Pages > Deployments**

## 🆘 Se Falhar com Erro do Rollup

**Erro típico:** `Cannot find module @rollup/rollup-linux-x64-gnu`

**Solução no Dashboard:**
1. Vá para **Pages > lonkis2 > Settings > Builds & deployments**
2. Clique em **Edit configuration**
3. Altere Build command para:
   ```
   npm install --legacy-peer-deps --force && npm run build
   ```
4. Clique em **Save and Deploy**
5. Se ainda falhar, clique **Clear build cache** e tente novamente

## 📋 Configurações Importantes

### `.npmrc`
Otimizações de npm para instalação confiável:
```
legacy-peer-deps=true
include=optional
force=true
fetch-timeout=60000
```

### `.node-version`
Especifica Node.js v22.16.0 para consistência

### `wrangler.toml`
Configuração Cloudflare (para referência, usa-se via dashboard)

## 🚀 Fluxo de Deploy

1. Push para `master` no GitHub
2. Cloudflare Pages detecta automaticamente
3. Executa o build command
4. Deploy da pasta `dist/`
5. Disponível em https://lonkis2.pages.dev

## 📚 Recursos

- **Dashboard:** https://dash.cloudflare.com
- **Documentação:** https://developers.cloudflare.com/pages/
- **Repositório:** https://github.com/armazempreta13/lonkis2

---

**Última atualização:** 2026-03-22

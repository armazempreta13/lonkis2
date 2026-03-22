# Deployment no Cloudflare Pages

Este projeto está configurado para deploy automático no Cloudflare Pages.

## Configuração Automática

O Cloudflare Pages automaticamente:
1. Clona o repositório
2. Instala dependências com `npm ci`
3. Executa `npm run build`
4. Deploy da pasta `dist/`

## Configurações Importantes

### wrangler.toml
- Define `name = "lonkis2"` como o nome do projeto
- Define `compatibility_date` para Cloudflare Workers
- Build command customizado com `--legacy-peer-deps --force`

### .npmrc
Configurações otimizadas para instalação de dependências:
```
legacy-peer-deps=true
ignore-scripts=false
optional=true
fetch-timeout=60000
fetch-retry-mintimeout=20000
fetch-retry-maxtimeout=120000
```

## Passo a Passo para Setup

1. **Conectar repositório no Cloudflare Pages**
   - Acesse dashboard.cloudflare.com
   - Vá para Pages
   - Clique em "Create a project" > "Connect to Git"
   - Selecione o repositório `lonkis2`

2. **Configurações de Build**
   - Framework preset: None
   - Build command: `npm install --legacy-peer-deps --force && npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (ou em branco)

3. **Environment Variables** (opcional)
   - Se necessário, adicione variáveis de ambiente na aba "Settings"

4. **Deploy**
   - Após conectar, o Cloudflare Page vai automaticamente:
     - Detectar pushes para `master`
     - Executar o build
     - Publicar na URL

## Troubleshooting

### Erro: "Cannot find module @rollup/rollup-linux-x64-gnu"

Este erro ocorre quando módulos opcionais do Rollup não são instalados corretamente.

**Solução aplicada:**
- `.npmrc` com `legacy-peer-deps=true` e timeouts aumentados
- Build command com `--legacy-peer-deps --force`

Se continuar falhando:
1. Vá a Pages > Settings > Builds & deployments
2. Clique em "Edit build configuration"
3. Defina Build command como:
   ```
   npm install --no-audit --legacy-peer-deps --force && npm run build
   ```

### Cache de Build

Se o build continuar falhando:
1. Vá a Pages > Deployments
2. Clique nos três pontos (...) de qualquer deployment
3. Selecione "Clear build cache"
4. Refaça o deploy (push uma commit vazia ou use "Retry deployment")

## URLs Importantes

- **URL Principal:** https://lonkis2.pages.dev
- **Dashboard:** https://dash.cloudflare.com
- **Repositório:** https://github.com/armazempreta13/lonkis2

## Verificação da Build

Após cada push para `master`:
1. Verifique em Pages > Deployments
2. Procure pelo novo deployment
3. Clique para ver logs
4. Se falhar, veja a aba "Build Logs" para detalhes

---

**Última atualização:** 2026-03-22

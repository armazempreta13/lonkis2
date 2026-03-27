# 🚀 DEPLOYMENT GUIDE - LK IMPORTS API

Seu site agora está configurado para funcionar em qualquer ambiente de deployment!

---

## ✅ Pre-Deployment Checklist

**ANTES de fazer deploy, certifique-se:**

- [ ] ✅ Gerou um `JWT_SECRET` forte (40+ caracteres aleatórios)
- [ ] ✅ Conhece seu domínio de produção (ex: lkimports.com)
- [ ] ✅ Alterou as credenciais de admin padrão
- [ ] ✅ Testou localmente com `npm run dev`
- [ ] ✅ Build passou com sucesso (`npm run build`)

---

## 🌍 Índice de Plataformas

1. [Cloudflare Pages](#cloudflare-pages) ⭐ Recomendado
2. [Vercel](#vercel)
3. [AWS (EC2/ECS/Lambda)](#aws)
4. [Render.com](#rendercom)
5. [Digital Ocean](#digital-ocean)
6. [Coloca.me](#coloca-me) (VPS Brasileiro)
7. [Hostinger](#hostinger)

---

## Cloudflare Pages

### Configuração 1: Remover `wrangler.toml` ✅ JÁ FEITO

```bash
# wrangler.toml foi removido para usar Pages instead of Workers
# Seu código está pronto!
```

### Configuração 2: Variáveis de Ambiente

**Dashboard → Settings → Environment Variables:**

```
NODE_ENV = production
CORS_ORIGIN = https://seu-dominio.com (ou https://seu-dominio.com,https://www.seu-dominio.com)
TRUST_PROXY = true
JWT_SECRET = <gere-com-comando-abaixo>
```

### Configuração 3: Gerar JWT_SECRET

```bash
# No seu computador, rode:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Resultado: 64 caracteres hexadecimais
# Copie para CORS_ORIGIN na Cloudflare
```

### Configuração 4: Build Command

```bash
# Cloudflare Pages → Build → Build command:
npm run build

# Output directory:
dist
```

### Configuração 5: Deploy

```bash
# Fazer push ao GitHub (Cloudflare vai detectar automaticamente):
git push origin master

# Cloudflare fará deploy automático!
```

**Pronto!** Seu site estará disponível em `seu-projeto.pages.dev` ou seu domínio customizado.

---

## Vercel

### 1. Criar projeto no Vercel

```bash
# Opção A: Via CLI
npm i -g vercel
vercel

# Opção B: Conectar GitHub
# https://vercel.com/new
# Selecionar seu repositório
```

### 2. Variáveis de Ambiente

**Vercel Dashboard → Settings → Environment Variables:**

```
NODE_ENV = production
CORS_ORIGIN = https://seu-projeto.vercel.app (ou seu domínio)
TRUST_PROXY = true
JWT_SECRET = <valor-de-64-caracteres>
VITE_GOOGLE_PLACES_API_KEY = sk-...
```

### 3. Build & Deploy

```bash
# Automaticamente quando faz push ao GitHub
git push origin master

# Vercel fará deploy automático!
```

---

## AWS

### EC2/ECS

#### Variáveis de Ambiente:

**AWS Systems Manager → Parameter Store:**

```bash
/lk-imports/prod/NODE_ENV = production
/lk-imports/prod/CORS_ORIGIN = https://seu-dominio.com
/lk-imports/prod/TRUST_PROXY = true (se usar ALB)
/lk-imports/prod/JWT_SECRET = <valor-64-chars>
```

#### SSH & Deploy:

```bash
# SSH para EC2
ssh -i seu-key.pem ec2-user@seu-instancia.compute.amazonaws.com

# Clone repositório
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

# Instalar dependências
npm install

# Build
npm run build

# Rodar com PM2 (process manager)
npm install -g pm2
pm2 start npm --name "lk-imports" -- start
pm2 save
```

#### ALB (Application Load Balancer):

Se usar ALB na frente do seu EC2, configure:
```bash
TRUST_PROXY = true
CORS_ORIGIN = seu-dominio registrado no ALB
```

---

## Render.com

### 1. Criar Serviço

**https://dashboard.render.com → New → Web Service**

- Repository: seu repositório GitHub
- Build Command: `npm run build`
- Start Command: `npm start`

### 2. Variáveis de Ambiente

**Environment → Add Environment Variables:**

```
NODE_ENV = production
CORS_ORIGIN = https://seu-projeto.onrender.com
TRUST_PROXY = false (Render não usa reverse proxy por padrão)
JWT_SECRET = <valor-64-chars>
```

### 3. Deploy

```bash
# Simplesmente fazer push ao GitHub:
git push origin master

# Render detectará automaticamente e fará deploy!
```

---

## Digital Ocean

### 1. Droplet Setup

```bash
# SSH para seu droplet
ssh root@seu-ip

# Instalar Node.js 22
curl https://nodejs.org/dist/v22.16.0/node-v22.16.0-linux-x64.tar.xz | tar xJ
mv node-v22.16.0-linux-x64 /opt/node

# Symlink
ln -s /opt/node/bin/node /usr/local/bin/node
ln -s /opt/node/bin/npm /usr/local/bin/npm

# Clonar repo
git clone https://github.com/seu-usuario/seu-repo.git /app
cd /app

# Instalar
npm install
npm run build
```

### 2. Configurar Nginx (Reverse Proxy)

```bash
# /etc/nginx/sites-available/default

server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3006;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. .env Production

```bash
# /app/.env.production
NODE_ENV=production
CORS_ORIGIN=https://seu-dominio.com
TRUST_PROXY=true          # Nginx está na frente!
JWT_SECRET=<valor-64-chars>
```

### 4. PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start npm --name "lk-imports" -- start
pm2 save
pm2 startup

# Será reiniciado automaticamente se o servidor cair!
```

### 5. SSL/HTTPS

```bash
# Certbot (Let's Encrypt)
apt-get install certbot python3-certbot-nginx
certbot --nginx -d seu-dominio.com

# Automático! Renova a cada 60 dias.
```

---

## Coloca.me

Se usar serviço de VPS brasileiro Coloca.me:

### 1. SSH Terminal

```bash
# Conectar via SSH ou terminal web

# Criar usuário node
useradd -m -s /bin/bash node
su - node

# Clonar projeto
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
npm install
npm run build
```

### 2. Configurar Supervisor

```bash
# /etc/supervisor/conf.d/lk-imports.conf

[program:lk-imports]
directory=/home/node/seu-repo
command=/home/node/.nvm/versions/node/v22.16.0/bin/npm start
autostart=true
autorestart=true
user=node
environment=NODE_ENV="production",CORS_ORIGIN="https://seu-dominio.com",TRUST_PROXY="true",JWT_SECRET="..."

# Reload supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start lk-imports
```

### 3. Nginx

```bash
# /etc/nginx/sites-available/seu-dominio.conf

upstream lk_imports {
    server localhost:3006;
}

server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://lk_imports;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Ativar
ln -s /etc/nginx/sites-available/seu-dominio.conf /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## Hostinger

### 1. File Manager Deployment

Hostinger tem suporte limitado para Node.js, mas pode ser feito:

- Upload os arquivos via FTP/SFTP
- Ou use suas ferramentas de Git

### 2. Alternativa: Deploy em Cloudflare Pages (Recomendado)

Hostinger pode apontar domínio para Cloudflare Pages:

```bash
# Em Hostinger:
# Nameservers → Usar nameservers da Cloudflare

# Em Cloudflare:
# Adicionar seu domínio
# Configurar Pages projeto

# Deploy automático via GitHub!
```

---

## 🔍 Verificar Deploy

### Health Check

```bash
# Testar se API está respondendo:
curl https://seu-dominio.com/api/health

# Resposta esperada:
# {
#   "status": "ok",
#   "uptime": 3600,
#   "memory": {...},
#   "timestamp": "2026-03-22T10:30:45Z"
# }
```

### Teste CORS

```bash
# Verificar se CORS está funciona:
curl -H "Origin: https://seu-dominio.com" \
     -H "Access-Control-Request-Method: POST" \
     https://seu-dominio.com/api/auth/login \
     -v

# Procure por:
# Access-Control-Allow-Origin: https://seu-dominio.com
```

### Teste Rate Limiting

```bash
# Fazer 10 requisições rápidas:
for i in {1..10}; do
  curl https://seu-dominio.com/api/health
done

# Deve funcionar normalmente

# Fazer 501+ requisições em 15 minutos:
# Será bloqueado com erro 429 (Too Many Requests)
```

---

## 🆘 Troubleshooting

### Erro: "CORS_ORIGIN not set in production"

```bash
# Solução: Configure CORS_ORIGIN na variáveis de ambiente
CORS_ORIGIN=https://seu-dominio.com
CORS_ORIGIN=https://seu-dominio.com,https://www.seu-dominio.com  # múltiplos

# Reinicie a aplicação
```

### Erro: "JWT_SECRET is using default value"

```bash
# Solução: Gere um novo secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Configure na variável de ambiente
JWT_SECRET=<valor-novo>

# Reinicie
```

### Erro: "Too many requests" (429)

Isso é **intencional** para proteção DDoS!

Aguarde 15 minutos ou:
- Use um IP diferente
- Reduza número de requisições
- Aumente `RATE_LIMIT_MAX_GLOBAL` se necessário (cuidado!)

### CSS/JS não carregam

```bash
# Verifique se TRUST_PROXY está correto:
# Se atrás de proxy: TRUST_PROXY=true
# Se direto: TRUST_PROXY=false
```

### Frontend não consegue acessar API

```bash
# 1. Verifique CORS_ORIGIN
curl https://seu-dominio.com/api/health

# 2. Verifique console do navegador (F12)
# Procure por erro CORS

# 3. Verifique se domínio está certo:
console.log(window.location.origin)
// Deve ser exatamente igual a CORS_ORIGIN configurado
```

---

## 📞 Suporte

Precisa de ajuda?

1. **Verifique logs:**
   - Cloudflare Pages: Dashboard → Analytics
   - Vercel: Dashboard → Deployments → Logs
   - AWS: CloudWatch Logs
   - Render: Dashboard → Logs
   - VPS: `tail -f logs/audit.log`

2. **Health Check:**
   ```bash
   curl https://seu-dominio.com/api/health
   ```

3. **Métricas:**
   ```bash
   curl https://seu-dominio.com/api/metrics
   ```

4. **Variáveis:**
   Verifique se todas estão definidas corretamente na plataforma.

---

## ✨ Pronto!

Seu site LK Imports agora está:

✅ Seguro (rate limiting, autenticação JWT, validação payload)
✅ Escalável (suporta 100+ usuários simultâneos)
✅ Monitorado (health check, métricas, audit logs)
✅ Otimizado (compressão Brotli/Gzip, circuit breaker)
✅ Pronto para produção

**Bom deployment!** 🚀

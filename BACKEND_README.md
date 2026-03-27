# LK Imports Backend API

Um backend completo para a empresa LK Imports, incluindo autenticação, gerenciamento de produtos, cotações, pedidos de reparo e chatbot com IA.

## Funcionalidades

- **Autenticação JWT**: Registro e login de usuários
- **Gerenciamento de Produtos**: CRUD de produtos (admin)
- **Cotações**: Criar e gerenciar cotações
- **Pedidos de Reparo**: Sistema para clientes solicitarem reparos
- **Chatbot com IA**: Usando Google Generative AI para respostas inteligentes
- **Banco de Dados SQLite**: Persistência de dados local

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/:id` - Obter produto por ID
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/:id` - Atualizar produto (admin)
- `DELETE /api/products/:id` - Deletar produto (admin)

### Cotações
- `GET /api/quotes` - Listar cotações (admin)
- `POST /api/quotes` - Criar cotação
- `PUT /api/quotes/:id/status` - Atualizar status da cotação (admin)

### Pedidos de Reparo
- `GET /api/repairs` - Listar pedidos do usuário
- `GET /api/repairs/all` - Listar todos os pedidos (admin)
- `POST /api/repairs` - Criar pedido de reparo
- `PUT /api/repairs/:id/status` - Atualizar status do pedido (admin)

### Chatbot
- `POST /api/chat` - Enviar mensagem para o chatbot

### Saúde
- `GET /api/health` - Verificar status da API

## Configuração

1. Instale as dependências: `npm install`
2. Configure as variáveis de ambiente em `.env`:
   ```
   NODE_ENV=development
   PORT=3001
   JWT_SECRET=your-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   ```
3. Execute: `npm run dev`

## Banco de Dados

O banco de dados SQLite é criado automaticamente com as tabelas necessárias e dados iniciais de produtos.

## Segurança

- Senhas criptografadas com bcrypt
- Tokens JWT para autenticação
- Middleware de autenticação e autorização
- Helmet para segurança HTTP
- CORS configurado

## Tecnologias

- Node.js + TypeScript
- Express.js
- SQLite3
- JWT + bcrypt
- Google Generative AI
- Zod para validação
- Helmet + CORS
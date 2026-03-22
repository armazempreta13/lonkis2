import express from 'express';
import { z } from 'zod';
import { dbGet, dbRun } from '../db.js';

const router = express.Router();

const getLocalChatResponse = (message: string, context: string) => {
  const normalized = message.toLowerCase();
  if (normalized.includes('horário') || normalized.includes('horario')) {
    return 'Nosso horário de atendimento é de Segunda a Sábado, das 09h às 18h.';
  }
  if (normalized.includes('endereço') || normalized.includes('onde')) {
    return 'Estamos na Samambaia Norte (QR 429), Brasília - DF. Peça rota no Google Maps.';
  }
  if (normalized.includes('preço') || normalized.includes('valor')) {
    return 'Nossos preços variam conforme produto/serviço; para orçamento, envie um pedido em Orçamento no menu.';
  }
  if (normalized.includes('reparo') || normalized.includes('conserto') || normalized.includes('assistência')) {
    return 'Oferecemos reparo de telas, baterias, placas e componentes. Envie seu dispositivo e descrição do problema.';
  }
  if (normalized.includes('whatsapp')) {
    return 'Você pode nos contatar pelo WhatsApp direto: +55 61 95191-1308.';
  }
  return 'Obrigado pela sua mensagem! Um de nossos atendentes entrará em contato em breve. Para falar com humano diretamente, use nosso WhatsApp.';
};

const chatSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().optional(),
});

// Knowledge base for context
const knowledgeBase = `
Empresa: LK Imports - Assistente técnico especializado
Endereço: Samambaia Norte (QR 429), Brasília – DF
WhatsApp: 556195191308
Horário: Segunda a Sábado, das 09h às 18h
Garantia: 90 dias

Dispositivos suportados:
Apple: iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15 Plus, iPhone 15, iPhone 14 Pro Max, iPhone 14 Pro, iPhone 14 Plus, iPhone 14, iPhone 13 Pro Max, iPhone 13 Pro, iPhone 13 mini, iPhone 13, iPhone 12 Pro Max, iPhone 12 Pro, iPhone 12 mini, iPhone 12, iPhone 11 Pro Max, iPhone 11 Pro, iPhone 11, iPhone XS Max, iPhone XS, iPhone XR, iPhone X, iPhone 8 Plus, iPhone 8, iPhone 7 Plus, iPhone 7

Samsung: Galaxy S24 Ultra, Galaxy S24+, Galaxy S24, Galaxy S23 Ultra, Galaxy S23+, Galaxy S23, Galaxy S22 Ultra, Galaxy S22+, Galaxy S22, Galaxy S21 Ultra, Galaxy S21+, Galaxy S21, Galaxy A54, Galaxy A34, Galaxy A14, Galaxy M54, Galaxy M34, Galaxy M14, Galaxy Z Fold 5, Galaxy Z Flip 5

Xiaomi: Xiaomi 14 Ultra, Xiaomi 14, Xiaomi 13T Pro, Xiaomi 13T, Redmi Note 13 Pro+, Redmi Note 13 Pro, Redmi Note 13, Redmi Note 12 Pro+, Redmi Note 12 Pro, Redmi Note 12, Poco F5 Pro, Poco F5, Poco X6 Pro, Poco X6

Motorola: Edge 40 Pro, Edge 40, Edge 30 Ultra, Edge 30 Fusion, Moto G84, Moto G54, Moto G73, Moto G53, Razr 40 Ultra, Razr 40

Produtos disponíveis: iPhone 16, iPhone 16 Pro, iPhone 16 Pro Max, PS5 Slim, Xbox Series S, AirPods Pro, Apple Watch Series 9, JBL Flip 6, etc.

Serviços: Reparo de telas, baterias, placas, troca de componentes, limpeza, etc.
`;

router.post('/', async (req, res) => {
  try {
    const { message, sessionId } = chatSchema.parse(req.body);

    // Get or create session
    let session;
    if (sessionId) {
      session = await dbGet('SELECT * FROM chat_sessions WHERE session_id = ?', [sessionId]);
    }

    if (!session) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      await dbRun('INSERT INTO chat_sessions (session_id, messages) VALUES (?, ?)', [newSessionId, JSON.stringify([])]);
      session = { session_id: newSessionId, messages: '[]' };
    }

    const messages = JSON.parse(session.messages || '[]');

    // Add user message
    messages.push({ role: 'user', content: message });

    // Generate response using AI
    const response = getLocalChatResponse(message, knowledgeBase);

    // Add AI response
    messages.push({ role: 'assistant', content: response });

    // Update session
    await dbRun('UPDATE chat_sessions SET messages = ?, updated_at = CURRENT_TIMESTAMP WHERE session_id = ?', [JSON.stringify(messages), session.session_id]);

    res.json({
      response,
      sessionId: session.session_id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;
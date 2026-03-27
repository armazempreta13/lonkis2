import { Router, Request, Response } from 'express';

const router = Router();

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas
const cache = new Map<string, { data: any; timestamp: number }>();

/**
 * Endpoint de teste para verificar a configuração da API
 */
router.get('/test', async (req: Request, res: Response) => {
  try {
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_API_KEY;
    
    console.log('🧪 Test endpoint called');
    console.log('  API Key present:', !!GOOGLE_PLACES_API_KEY);
    console.log('  API Key value:', GOOGLE_PLACES_API_KEY ? `${GOOGLE_PLACES_API_KEY.substring(0, 10)}...` : 'NOT SET');
    
    res.json({
      apiKeyConfigured: !!GOOGLE_PLACES_API_KEY,
      apiKeyPreview: GOOGLE_PLACES_API_KEY ? `${GOOGLE_PLACES_API_KEY.substring(0, 10)}...` : 'NOT SET',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

/**
 * Proxy para Google Places API
 * Evita CORS bloqueado no frontend
 */
router.get('/details', async (req: Request, res: Response) => {
  try {
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_API_KEY; // Ler AQUI, não no topo!
    const { placeId, fields } = req.query;

    console.log('📡 /details endpoint called');
    console.log('  Place ID:', placeId);
    console.log('  Fields:', fields);
    console.log('  API Key present:', !!GOOGLE_PLACES_API_KEY);

    if (!placeId) {
      return res.status(400).json({ error: 'Place ID é obrigatório' });
    }

    if (!GOOGLE_PLACES_API_KEY) {
      console.error('❌ GOOGLE_API_KEY não configurada');
      return res.status(500).json({ 
        error: 'API key não configurada no servidor',
        details: 'GOOGLE_API_KEY não está definida no .env'
      });
    }

    // Cache key
    const cacheKey = `${placeId}-${fields || 'all'}`;

    // Verificar cache
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('✅ Retornando dados em cache');
      return res.json(cached.data);
    }

    // Fazer requisição
    const fieldsParam = fields || 'reviews,rating,user_ratings_total';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_PLACES_API_KEY}&fields=${fieldsParam}`;

    console.log('🔍 Fazendo requisição para Google API...');
    console.log('  URL:', url.substring(0, 80) + '...');
    
    const response = await fetch(url);
    const data = await response.json();

    console.log('  Google API Status:', data.status);
    console.log('  Response has reviews:', !!(data.result?.reviews?.length));

    if (data.status !== 'OK') {
      console.error(`❌ Google API retornou: ${data.status}`, data);
      return res.status(400).json({ 
        error: `Google API: ${data.status}`, 
        details: data,
        url: url.substring(0, 100) + '...'
      });
    }

    // Cache resultado
    cache.set(cacheKey, { data, timestamp: Date.now() });

    console.log('✅ Sucesso! Reviews encontrados:', data.result?.reviews?.length || 0);
    res.json(data);
  } catch (error) {
    console.error('❌ Erro no proxy:', error);
    res.status(500).json({ 
      error: 'Falha ao buscar avaliações do Google', 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
});

export default router;

/**
 * Chatbot Logic Service
 *
 * Handles text normalization, intent identification, and
 * state management for the rule-based chatbot.
 */
export const normalizeText = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^\w\s]/g, ' ') // Remove special chars
        .replace(/\s+/g, ' ') // Remove extra spaces
        .trim();
};
export const identifyIntent = (message) => {
    const normalized = normalizeText(message);
    const intents = {
        reparos: ['conserto', 'reparo', 'tecnico', 'quebrado', 'arrumar', 'tela', 'bateria', 'placa', 'molhou', 'nao liga', 'vidro', 'touch', 'display', 'conector', 'carga', 'consertar', 'manutençao', 'peça'],
        produtos: ['preco', 'valor', 'quanto', 'vende', 'comprar', 'acessorio', 'capinha', 'carregador', 'fone', 'pelicula', 'cabo', 'capa', 'pelicula', 'carregar', 'acessorios'],
        localizacao: ['onde', 'endereco', 'local', 'mapa', 'fica', 'unidade', 'loja', 'samambaia', 'brasilia', 'df', 'localizaçao', 'endereço', 'proximo', 'perto'],
        cadastro: ['cadastro', 'cadastrar', 'meus dados', 'registrar', 'fazer cadastro', 'formulario', 'dados'],
        horario: ['horario', 'abre', 'fecha', 'funcionamento', 'sabado', 'domingo', 'atendimento', 'horarios', 'aberto', 'fechado'],
        garantia: ['garantia', 'seguro', 'tempo', 'cobertura', '90 dias', 'defeito', 'garantias', 'prazo', 'prazos'],
        pagamento: ['pagamento', 'cartao', 'pix', 'parcela', 'desconto', 'dinheiro', 'debito', 'credito', 'pagar', 'cartoes', 'parcelamento'],
        saudacao: ['oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e ai', 'fala', 'opa', 'hey', 'hello', 'hi'],
        agradecimento: ['obrigado', 'valeu', 'show', 'top', 'entendi', 'obrigada', 'perfeito', 'agradeço', 'agradecido', 'obrigado!', 'valeu!'],
        humano: ['falar com humano', 'atendente', 'pessoa', 'falar com alguem', 'suporte real', 'whatsapp', 'contato', 'humano', 'especialista', 'consultor'],
    };
    for (const [intent, keywords] of Object.entries(intents)) {
        if (keywords.some(kw => normalized.includes(kw))) {
            return intent;
        }
    }
    return null;
};
export const getResponseForIntent = (intent) => {
    switch (intent) {
        case 'saudacao': return 'start';
        case 'reparos': return 'reparos';
        case 'produtos': return 'acessorios';
        case 'localizacao': return 'localizacao';
        case 'cadastro': return 'form_cadastro';
        case 'horario': return 'horario';
        case 'garantia': return 'garantia';
        case 'pagamento': return 'pagamento';
        case 'humano': return 'humano_handoff';
        case 'agradecimento': return 'agradecimento_feedback';
        default: return 'start';
    }
};

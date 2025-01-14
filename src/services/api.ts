import axios from 'axios';
import { authService } from './auth-service';

// Cria uma instância do axios com configuração personalizada
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL, // Define a URL base para a API a partir das variáveis de ambiente
	headers: {
		'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
	}
});

// Intercepta todas as requisições para adicionar o token de autenticação
api.interceptors.request.use(
	(request) => {
		// console.log('Starting Request', request); // Loga a requisição para fins de depuração
		if (request.headers) {
			request.headers.Authorization = `Bearer ${authService.getToken()}`; // Adiciona o token de autenticação nos cabeçalhos
		}
		return request; // Retorna a requisição modificada
	},
	(error) => {
		return Promise.reject(error); // Rejeita a promessa em caso de erro na requisição
	}
);

// Intercepta todas as respostas para tratar erros específicos
api.interceptors.response.use(
	(response) => {
		// console.log('Response:', response); // Loga a resposta para fins de depuração
		return response; // Retorna a resposta de sucesso
	},
	(error) => {
		// console.log('Error Response:', error.response); // Loga a resposta de erro para fins de depuração
		if (error?.response?.status === 401) {
			// Se o status da resposta for 401 (não autorizado)
			authService.logout(); // Realiza logout do usuário
		}
		return Promise.reject(error); // Rejeita a promessa em caso de erro na resposta
	}
);

// Exporta a instância configurada do axios para uso em outras partes da aplicação
export default api;

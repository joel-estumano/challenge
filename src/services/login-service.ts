import api from './api';
import { IUser } from '@/interfaces';
import { jwtDecode } from 'jwt-decode';
import { writeStorage, deleteFromStorage } from '@rehooks/local-storage';

export type AccessTokenType = {
	accessToken: string;
};

export type LoginType = {
	email: string;
	password: string;
};

class AuthService {
	private static instance: AuthService;
	private user: IUser | null = null;

	private constructor() {}

	static getInstance(): AuthService {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

	async login(login: LoginType): Promise<AccessTokenType> {
		const { data } = await api.post(`auth/login`, login).then((response) => {
			this.setToken(response.data);
			this.decodeToken(response.data.accessToken);
			return response;
		});
		return data;
	}

	async create(payload: { name: string; email: string; password: string }): Promise<AccessTokenType> {
		const { data } = await api.post(`users/`, payload).then(async (response) => {
			await this.login({ email: payload.email, password: payload.password });
			return response;
		});
		return data;
	}

	private setToken(dataToken: AccessTokenType) {
		writeStorage('accessToken', dataToken.accessToken);
	}

	private decodeToken(token: string) {
		const decoded: IUser = jwtDecode(token);
		this.user = decoded;
	}

	getUser(): IUser | null {
		if (!this.user) {
			const token = localStorage.getItem('accessToken');
			if (token) {
				this.decodeToken(token);
			}
		}
		return this.user;
	}

	getToken(): string | null {
		return localStorage.getItem('accessToken');
	}

	logout() {
		deleteFromStorage('accessToken');
		this.user = null;
		window.location.href = '/login';
	}
}

export const authService = AuthService.getInstance();

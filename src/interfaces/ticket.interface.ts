import { StatusEnum } from '@/enums/status.enum';

export interface ITicket {
	_id?: string;
	user?: {
		name: string;
		_id: string;
		avatarUrl?: string;
	};
	title: string;
	description: string;
	status?: StatusEnum;
	createdAt?: string;
	updatedAt?: string;
}

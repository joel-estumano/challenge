import { StatusEnum } from '@/enums/status.enum';

export interface ITicket {
	_id?: string;
	author: string;
	title: string;
	description: string;
	status?: StatusEnum;
	createdAt?: string;
	updatedAt?: string;
}

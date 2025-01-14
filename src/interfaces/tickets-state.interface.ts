import { StatusEnum } from '@/enums/status.enum';
import { ITicket } from './ticket.interface';

export interface ITicketsState {
	tickets: ITicket[];
	page: number;
	hasNextPage: boolean;
	statusFilter: StatusEnum;
	isLoading: boolean;
	error: string | null;
}

import { ITicketsPaginatedResult } from './tickets-paginated-result.interface';

export interface ITicketsState {
	data: ITicketsPaginatedResult;
	isLoading: boolean;
	error: string | null;
	page: number;
	hasMore: boolean;
}

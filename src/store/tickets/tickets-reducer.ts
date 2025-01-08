import { createReducer, createAction } from '@reduxjs/toolkit';
import { ITicketsPaginatedResult } from '@/interfaces/tickets-paginated-result.interface';
import { loadTickets, loadTicketsSuccess, loadTicketsError } from './tickets-actions';

export const deleteTicketSuccess = createAction<{ id: string }>('DELETE_TICKET_SUCCESS');
export const deleteTicketError = createAction<{ error: string }>('DELETE_TICKET_ERROR');

interface TicketsState {
	data: ITicketsPaginatedResult;
	isLoading: boolean;
	error: string | null;
	page: number;
	hasMore: boolean;
}

const initialState: TicketsState = {
	data: {
		docs: [],
		totalDocs: 0,
		limit: 10,
		totalPages: 0,
		page: 1,
		pagingCounter: 1,
		hasPrevPage: false,
		hasNextPage: false,
		prevPage: null,
		nextPage: null
	},
	isLoading: false,
	error: null,
	page: 1,
	hasMore: true
};

const ticketsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(loadTickets, (state) => {
			console.log('Reducer: loadTickets');
			state.isLoading = true;
		})
		.addCase(loadTicketsSuccess, (state, action) => {
			console.log('Reducer: loadTicketsSuccess', action.payload);
			state.isLoading = false;
			state.data.docs = [...state.data.docs, ...action.payload.docs];
			state.data.totalDocs = action.payload.totalDocs;
			state.data.limit = action.payload.limit;
			state.data.totalPages = action.payload.totalPages;
			state.data.page = action.payload.page;
			state.data.pagingCounter = action.payload.pagingCounter;
			state.data.hasPrevPage = action.payload.hasPrevPage;
			state.data.hasNextPage = action.payload.hasNextPage;
			state.data.prevPage = action.payload.prevPage;
			state.data.nextPage = action.payload.nextPage;
			state.page = action.payload.page + 1;
			state.hasMore = action.payload.hasNextPage;
		})
		.addCase(loadTicketsError, (state, action) => {
			console.log('Reducer: loadTicketsError', action.payload);
			state.isLoading = false;
			state.error = action.payload.error;
		})
		.addCase(deleteTicketSuccess, (state, action) => {
			state.data.docs = state.data.docs.filter((ticket) => ticket._id !== action.payload.id);
			state.data.totalDocs -= 1;
		})
		.addCase(deleteTicketError, (state, action) => {
			state.error = action.payload.error;
		});
});

export default ticketsReducer;

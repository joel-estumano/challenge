import { createReducer } from '@reduxjs/toolkit';
import { ITicketsPaginatedResult } from '@/interfaces/tickets-paginated-result.interface';
import {
	addTicketSuccess,
	addTicketError,
	addTicketLoading,
	filterTicketsSuccess,
	filterTicketsError,
	filterTicketsLoading,
	deleteTicketSuccess,
	deleteTicketError,
	deleteTicketLoading,
	editTicketSuccess,
	editTicketError,
	editTicketLoading,
	loadTickets
} from './tickets-actions';
import { StatusEnum } from '@/enums/status.enum';
import { ITicket } from '@/interfaces';

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
	const localSort = (state: TicketsState) => {
		const filteredAndSortedTickets = state.data.docs
			.filter((ticket): ticket is ITicket & { updatedAt: string } => ticket.updatedAt !== undefined)
			.sort((a, b) => {
				const dateA = new Date(a.updatedAt).getTime();
				const dateB = new Date(b.updatedAt).getTime();
				return dateB - dateA;
			});
		state.data.docs = filteredAndSortedTickets;
		state.data.totalDocs = filteredAndSortedTickets.length;
	};

	builder
		// Load tickets
		.addCase(loadTickets, (state) => {
			state.isLoading = true;
		})
		.addCase(addTicketLoading, (state) => {
			state.isLoading = true;
		})
		.addCase(addTicketSuccess, (state, action) => {
			state.data.docs = [action.payload.ticket, ...state.data.docs];
			state.data.totalDocs += 1;
			state.isLoading = false;
		})
		.addCase(addTicketError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		})
		// Edit ticket
		.addCase(editTicketLoading, (state) => {
			state.isLoading = true;
		})
		.addCase(editTicketSuccess, (state, action) => {
			const index = state.data.docs.findIndex((ticket) => ticket._id === action.payload.ticket._id);
			if (index !== -1) {
				state.data.docs[index] = action.payload.ticket;
			}
			state.isLoading = false;
			localSort(state);
		})
		.addCase(editTicketError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		})
		// Delete ticket
		.addCase(deleteTicketLoading, (state) => {
			state.isLoading = true;
		})
		.addCase(deleteTicketSuccess, (state, action) => {
			state.data.docs = state.data.docs.filter((ticket) => ticket._id !== action.payload.id);
			state.data.totalDocs -= 1;
			state.isLoading = false;
		})
		.addCase(deleteTicketError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		})
		// Filter tickets (API call)
		.addCase(filterTicketsLoading, (state) => {
			state.isLoading = true;
		})
		.addCase(filterTicketsSuccess, (state, action) => {
			state.isLoading = false;
			const { data, status } = action.payload;
			const newTickets = data.docs;
			const combinedTickets = [...state.data.docs.filter((doc) => status.includes(doc.status as StatusEnum)), ...newTickets].filter(
				(ticket, index, self) => index === self.findIndex((t) => t._id === ticket._id)
			);
			state.data.docs = combinedTickets;
			state.data.totalDocs = combinedTickets.length;
			state.data.totalDocs = data.totalDocs;
			state.data.limit = data.limit;
			state.data.totalPages = data.totalPages;
			state.data.page = data.page;
			state.data.pagingCounter = data.pagingCounter;
			state.data.hasPrevPage = data.hasPrevPage;
			state.data.hasNextPage = data.hasNextPage;
			state.data.prevPage = data.prevPage;
			state.data.nextPage = data.nextPage;
			state.page = data.page + 1;
			state.hasMore = data.hasNextPage;
			localSort(state);
		})
		.addCase(filterTicketsError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		});
});

export default ticketsReducer;

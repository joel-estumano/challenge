import { createReducer } from '@reduxjs/toolkit';
import { ITicketsState } from '@/interfaces';
import {
	addTicketSuccess,
	addTicketError,
	addTicketLoading,
	loadTicketsSuccess,
	loadTicketsError,
	loadTicketsLoading,
	deleteTicketSuccess,
	deleteTicketError,
	deleteTicketLoading,
	editTicketSuccess,
	editTicketError,
	editTicketLoading,
	loadTickets
} from './tickets-actions';
import { StatusEnum } from '@/enums/status.enum';

const initialState: ITicketsState = {
	tickets: [],
	page: 1,
	hasNextPage: false,
	statusFilter: StatusEnum.ALL,
	isLoading: false,
	error: null
};

const ticketsReducer = createReducer(initialState, (builder) => {
	builder
		// Load tickets
		.addCase(loadTickets, (state) => {
			state.isLoading = true;
		})
		.addCase(addTicketLoading, (state) => {
			state.isLoading = true;
		})
		.addCase(addTicketSuccess, (state, action) => {
			state.tickets = [action.payload.ticket, ...state.tickets];
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
			const index = state.tickets.findIndex((ticket) => ticket._id === action.payload.ticket._id);
			if (index !== -1) {
				state.tickets[index] = action.payload.ticket;
			}
			state.isLoading = false;
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
			state.tickets = state.tickets.filter((ticket) => ticket._id !== action.payload.id);
			state.isLoading = false;
		})
		.addCase(deleteTicketError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		})
		// Filter tickets (API call)
		.addCase(loadTicketsLoading, (state) => {
			state.isLoading = true;
		})
		.addCase(loadTicketsSuccess, (state, action) => {
			const { data, statusFilter } = action.payload;
			state.page = data.page;
			state.hasNextPage = data.hasNextPage;
			state.statusFilter = statusFilter;
			state.tickets = data.page === 1 ? data.docs : (state.tickets = [...state.tickets, ...data.docs]);
			state.isLoading = false;
		})
		.addCase(loadTicketsError, (state, action) => {
			state.isLoading = false;
			state.error = action.payload.error;
		});
});

export default ticketsReducer;

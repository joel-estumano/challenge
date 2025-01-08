import { TicketsPaginatedResult } from '@/interfaces';
import api from '@/services/api';
import { createAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTicketError, deleteTicketSuccess } from './tickets-reducer';

export const loadTickets = createAction<number>('LOAD_TICKETS');
export const loadTicketsSuccess = createAction<TicketsPaginatedResult>('LOAD_TICKETS_SUCCESS');
export const loadTicketsError = createAction<{ error: string }>('LOAD_TICKETS_ERROR');

export const deleteTicket = createAsyncThunk('tickets/deleteTicket', async (id: string, { dispatch }) => {
	try {
		await api.delete(`/tickets/${id}`);
		dispatch(deleteTicketSuccess({ id }));
	} catch (error) {
		dispatch(deleteTicketError({ error: error.message }));
	}
});

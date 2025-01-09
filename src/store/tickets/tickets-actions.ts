import api from '@/services/api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '@/utils';
import { ITicket, TicketsPaginatedResult } from '@/interfaces';
import { StatusEnum } from '@/enums/status.enum';

export const addTicketSuccess = createAction<{ ticket: ITicket }>('ADD_TICKET_SUCCESS');
export const addTicketError = createAction<{ error: string }>('ADD_TICKET_ERROR');
export const addTicket = createAsyncThunk('tickets/addTicket', async (ticket: ITicket, { dispatch }) => {
	try {
		const response = await api.post('/tickets', ticket);
		dispatch(addTicketSuccess({ ticket: response.data }));
	} catch (error) {
		dispatch(addTicketError({ error: handleApiError(error) }));
	}
});

export const loadTickets = createAction<number>('LOAD_TICKETS');

export const filterTicketsSuccess = createAction<{ data: TicketsPaginatedResult; status: StatusEnum[] }>('FILTER_TICKETS_SUCCESS');
export const filterTicketsError = createAction<{ error: string }>('FILTER_TICKETS_ERROR');
export const filterTickets = createAsyncThunk('tickets/filterTickets', async (status: StatusEnum, { dispatch }) => {
	try {
		const statusParams = status === StatusEnum.ALL ? [StatusEnum.OPEN, StatusEnum.PROGRESS, StatusEnum.DONE] : [status];
		const response = await api.get(`/tickets?`, {
			params: {
				pagination: false,
				page: 1,
				limit: 10,
				status: statusParams
			}
		});
		dispatch(filterTicketsSuccess({ data: response.data, status: [status] }));
	} catch (error) {
		dispatch(filterTicketsError({ error: handleApiError(error) }));
	}
});

export const editTicketSuccess = createAction<{ ticket: ITicket }>('EDIT_TICKET_SUCCESS');
export const editTicketError = createAction<{ error: string }>('EDIT_TICKET_ERROR');
export const editTicket = createAsyncThunk('tickets/editTicket', async (ticket: ITicket, { dispatch }) => {
	try {
		const response = await api.patch(`/tickets/${ticket._id}`, ticket);
		dispatch(editTicketSuccess({ ticket: response.data }));
	} catch (error) {
		dispatch(editTicketError({ error: handleApiError(error) }));
	}
});

export const deleteTicketSuccess = createAction<{ id: string }>('DELETE_TICKET_SUCCESS');
export const deleteTicketError = createAction<{ error: string }>('DELETE_TICKET_ERROR');
export const deleteTicket = createAsyncThunk('tickets/deleteTicket', async (id: string, { dispatch }) => {
	try {
		await api.delete(`/tickets/${id}`);
		dispatch(deleteTicketSuccess({ id }));
	} catch (error) {
		dispatch(deleteTicketError({ error: handleApiError(error) }));
	}
});

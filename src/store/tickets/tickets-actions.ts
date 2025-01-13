import api from '@/services/api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { handleApiError } from '@/utils';
import { ITicket, ITicketsPaginatedResult } from '@/interfaces';
import { StatusEnum } from '@/enums/status.enum';

export const addTicketSuccess = createAction<{ ticket: ITicket }>('ADD_TICKET_SUCCESS');
export const addTicketError = createAction<{ error: string }>('ADD_TICKET_ERROR');
export const addTicketLoading = createAction('ADD_TICKET_LOADING');
export const addTicket = createAsyncThunk('tickets/addTicket', async (ticket: ITicket, { dispatch, rejectWithValue }) => {
	dispatch(addTicketLoading());
	return api
		.post('/tickets', ticket)
		.then((response) => {
			dispatch(addTicketSuccess({ ticket: response.data }));
			return response.data;
		})
		.catch((error) => {
			const handledError = handleApiError(error);
			dispatch(addTicketError({ error: handledError }));
			return rejectWithValue(handledError);
		});
});

export const loadTickets = createAction<number>('LOAD_TICKETS');

export const filterTicketsSuccess = createAction<{ data: ITicketsPaginatedResult; status: StatusEnum[] }>('FILTER_TICKETS_SUCCESS');
export const filterTicketsError = createAction<{ error: string }>('FILTER_TICKETS_ERROR');
export const filterTicketsLoading = createAction('FILTER_TICKETS_LOADING');
export const filterTickets = createAsyncThunk('tickets/filterTickets', async (status: StatusEnum, { dispatch }) => {
	try {
		dispatch(filterTicketsLoading());
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
export const editTicketLoading = createAction('EDIT_TICKET_LOADING');
export const editTicket = createAsyncThunk('tickets/editTicket', async (ticket: ITicket, { dispatch }) => {
	try {
		dispatch(editTicketLoading());
		const response = await api.patch(`/tickets/${ticket._id}`, ticket);
		dispatch(editTicketSuccess({ ticket: response.data }));
	} catch (error) {
		dispatch(editTicketError({ error: handleApiError(error) }));
	}
});

export const deleteTicketSuccess = createAction<{ id: string }>('DELETE_TICKET_SUCCESS');
export const deleteTicketError = createAction<{ error: string }>('DELETE_TICKET_ERROR');
export const deleteTicketLoading = createAction('DELETE_TICKET_LOADING');
export const deleteTicket = createAsyncThunk('tickets/deleteTicket', async (id: string, { dispatch }) => {
	try {
		dispatch(deleteTicketLoading());
		await api.delete(`/tickets/${id}`);
		dispatch(deleteTicketSuccess({ id }));
	} catch (error) {
		dispatch(deleteTicketError({ error: handleApiError(error) }));
	}
});

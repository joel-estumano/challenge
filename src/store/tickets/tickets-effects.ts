import api from '@/services/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ITicketsPaginatedResult } from '@/interfaces/tickets-paginated-result.interface';
import { loadTickets, loadTicketsSuccess, loadTicketsError } from './tickets-actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { handleApiError } from '@/utils';
import { StatusEnum } from '@/enums/status.enum';

function* fetchTickets(action: PayloadAction<{ page: number; statusFilter: StatusEnum }>): Generator {
	const { page, statusFilter } = action.payload;
	try {
		const limit = 3; // define o limite de paginação
		const statusParams = statusFilter === StatusEnum.ALL ? [StatusEnum.OPEN, StatusEnum.PROGRESS, StatusEnum.DONE] : [statusFilter];
		const response: { data: ITicketsPaginatedResult } = yield call(api.get, `/tickets`, {
			params: { pagination: true, page: page, limit: limit, status: statusParams }
		});
		const data: ITicketsPaginatedResult = response.data;
		yield put(loadTicketsSuccess({ data, statusFilter }));
	} catch (error) {
		yield put(loadTicketsError({ error: handleApiError(error) }));
	}
}

function* ticketsSaga() {
	yield takeLatest(loadTickets.type, fetchTickets);
}

export default ticketsSaga;

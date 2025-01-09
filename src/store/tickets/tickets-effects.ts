import api from '@/services/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ITicketsPaginatedResult } from '@/interfaces/tickets-paginated-result.interface';
import { loadTickets, filterTicketsSuccess, filterTicketsError } from './tickets-actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { handleApiError } from '@/utils';
import { StatusEnum } from '@/enums/status.enum';

function* fetchTickets(action: PayloadAction<number>): Generator {
	try {
		console.log('Effect: fetchTickets');
		const response: { data: ITicketsPaginatedResult } = yield call(api.get, `/tickets?page=${action.payload}`);
		const data: ITicketsPaginatedResult = response.data;
		yield put(filterTicketsSuccess({ data, status: [StatusEnum.ALL] }));
	} catch (error) {
		yield put(filterTicketsError({ error: handleApiError(error) }));
	}
}

function* ticketsSaga() {
	yield takeLatest(loadTickets, fetchTickets);
}

export default ticketsSaga;

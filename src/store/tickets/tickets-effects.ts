import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../services/api';
import { loadTickets, loadTicketsSuccess, loadTicketsError } from './tickets-actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { ITicketsPaginatedResult } from '@/interfaces/tickets-paginated-result.interface';
function* fetchTickets(action: PayloadAction<number>) {
	try {
		console.log('Effect: fetchTickets');
		const response = yield call(api.get, `/tickets?page=${action.payload}`);
		const data: ITicketsPaginatedResult = response.data;
		yield put(loadTicketsSuccess(data));
	} catch (error) {
		yield put(loadTicketsError({ error: error.message }));
	}
}

function* ticketsSaga() {
	yield takeLatest(loadTickets, fetchTickets);
}

export default ticketsSaga;

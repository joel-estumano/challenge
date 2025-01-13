import { put, takeLatest } from 'redux-saga/effects';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './user-actions';
import { authService } from '@/services/login-service';
import { handleApiError } from '@/utils';

function* fetchUser() {
	try {
		const user = authService.getUser();
		if (user) {
			yield put(fetchUserSuccess(user));
		} else {
			throw new Error('Failed to decode user');
		}
	} catch (error) {
		yield put(fetchUserFailure(handleApiError(error)));
	}
}

export default function* userSaga() {
	yield takeLatest(fetchUserRequest.type, fetchUser);
}

import { IUser } from '@/interfaces';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/login-service';

export const fetchUserRequest = createAction('FETCH_USER_REQUEST');
export const fetchUserSuccess = createAction<IUser>('FETCH_USER_SUCCESS');
export const fetchUserFailure = createAction<string>('FETCH_USER_FAILURE');

export const loadUser = createAsyncThunk('user/loadUser', async (_, { rejectWithValue }) => {
	try {
		const user: IUser | null = authService.getUser();
		if (user) {
			return user;
		} else {
			throw new Error('No user found');
		}
	} catch {
		return rejectWithValue('Failed to load user');
	}
});

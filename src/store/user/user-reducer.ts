import { createReducer } from '@reduxjs/toolkit';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure, loadUser } from './user-actions';
import { IUser } from '@/interfaces';

export type UserState = {
	data: IUser | null;
	loading: boolean;
	error: string | null;
};

const initialState: UserState = {
	data: null,
	loading: false,
	error: null
};

const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(fetchUserRequest, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(fetchUserSuccess, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.error = null;
		})
		.addCase(fetchUserFailure, (state, action) => {
			state.error = action.payload;
			state.loading = false;
		})
		.addCase(loadUser.fulfilled, (state, action) => {
			state.data = action.payload as IUser;
			state.loading = false;
			state.error = null;
		})
		.addCase(loadUser.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
});

export default userReducer;

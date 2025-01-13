import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import ticketsReducer from './tickets/tickets-reducer';
import ticketsSaga from './tickets/tickets-effects';
import userReducer from './user/user-reducer';
import userSaga from './user/user-effects';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		tickets: ticketsReducer,
		user: userReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(ticketsSaga);
sagaMiddleware.run(userSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

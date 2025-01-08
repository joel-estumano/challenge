import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import ticketsReducer from './tickets/tickets-reducer';
import ticketsSaga from './tickets/tickets-effects';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		tickets: ticketsReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(ticketsSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

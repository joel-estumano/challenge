import { loadTickets } from '@/store/tickets/tickets-actions';
import { RootState, AppDispatch } from '@/store';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const useTickets = (inView: boolean) => {
	const dispatch = useDispatch<AppDispatch>();

	const { tickets, page, hasNextPage, statusFilter, isLoading, error } = useSelector((state: RootState) => state.tickets);

	useEffect(() => {
		dispatch(loadTickets({ page: page, statusFilter }));
	}, [dispatch]);

	useEffect(() => {
		if (inView && hasNextPage && !isLoading && !error) {
			dispatch(loadTickets({ page: page + 1, statusFilter }));
		}
	}, [tickets, page, hasNextPage, statusFilter, isLoading, error, inView, dispatch]);

	return { tickets, isLoading, error };
};

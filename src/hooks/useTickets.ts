import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { filterTickets, loadTickets } from '@/store/tickets/tickets-actions';
import { StatusEnum } from '@/enums/status.enum';

export const useTickets = (inView: boolean) => {
	const dispatch = useDispatch<AppDispatch>();
	const { data, isLoading, error, hasMore } = useSelector((state: RootState) => state.tickets);
	const [page] = useState(1);

	useEffect(() => {
		dispatch(filterTickets(StatusEnum.ALL));
	}, [dispatch]);

	useEffect(() => {
		if (inView && hasMore && !isLoading && !error) {
			dispatch(loadTickets(page));
		}
	}, [inView, hasMore, isLoading, dispatch, page]);

	return { data, isLoading, error, page, hasMore };
};

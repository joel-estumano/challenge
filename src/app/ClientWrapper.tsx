'use client';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from '@/store/user/user-actions';
import type { AppDispatch } from '@/store';

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	return <>{children}</>;
};

export default ClientWrapper;

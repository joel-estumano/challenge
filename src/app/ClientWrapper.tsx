'use client';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from '@/store/user/user-actions';
import type { AppDispatch } from '@/store';
import { useBreakpoint } from '@/components/context/breakpoint';
import { Toaster } from '@/components/ui/sonner';

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isMobile } = useBreakpoint();

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	return (
		<>
			{children}
			<Toaster position={isMobile ? 'top-center' : 'bottom-right'} />
		</>
	);
};

export default ClientWrapper;

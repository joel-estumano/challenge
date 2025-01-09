'use client';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Dashboard from '@/app/pages/Dashboard';
import { BreakpointProvider } from '@/components/context/breakpoint';
import { Toaster } from '@/components/ui/sonner';

const Home: React.FC = () => {
	return (
		<Provider store={store}>
			<BreakpointProvider>
				<Dashboard />
				<Toaster />
			</BreakpointProvider>
		</Provider>
	);
};

export default Home;

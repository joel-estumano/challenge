'use client';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Dashboard from '@/components/Dashboard';
import { BreakpointProvider } from '@/components/context/breakpoint';

const Home: React.FC = () => {
	return (
		<Provider store={store}>
			<BreakpointProvider>
				<Dashboard />
			</BreakpointProvider>
		</Provider>
	);
};

export default Home;

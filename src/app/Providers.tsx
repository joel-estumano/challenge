'use client';
import store from '@/store';
import { BreakpointProvider } from '@/components/context/breakpoint';
import { Provider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<BreakpointProvider>{children}</BreakpointProvider>
		</Provider>
	);
}

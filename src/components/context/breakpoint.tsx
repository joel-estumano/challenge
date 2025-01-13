'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface BreakpointContextProps {
	isMobile: boolean;
}

interface BreakpointProviderProps {
	children: ReactNode;
}

const BreakpointContext = createContext<BreakpointContextProps | undefined>(undefined);

export const BreakpointProvider: React.FC<BreakpointProviderProps> = ({ children }) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return <BreakpointContext.Provider value={{ isMobile }}>{children}</BreakpointContext.Provider>;
};

export const useBreakpoint = () => {
	const context = useContext(BreakpointContext);
	if (!context) {
		throw new Error('useBreakpoint must be used within a BreakpointProvider');
	}
	return context;
};

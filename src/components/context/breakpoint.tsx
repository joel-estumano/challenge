import React, { createContext, useState, useEffect, useContext } from 'react';

interface BreakpointContextProps {
	isMobile: boolean;
}

const BreakpointContext = createContext<BreakpointContextProps>({ isMobile: false });

/**
 * Provedor de contexto de breakpoint.
 *
 * Este componente provê o estado de `isMobile` para seus descendentes, detectando
 * quando o viewport está abaixo de 640px.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Componentes filhos que terão acesso ao contexto.
 * @returns {JSX.Element} O provedor de contexto.
 */
export const BreakpointProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 639px)');

		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};

		mediaQuery.addEventListener('change', handleMediaQueryChange);

		// Inicialmente
		setIsMobile(mediaQuery.matches);

		return () => {
			mediaQuery.removeEventListener('change', handleMediaQueryChange);
		};
	}, []);

	return <BreakpointContext.Provider value={{ isMobile }}>{children}</BreakpointContext.Provider>;
};

/**
 * Hook para acessar o contexto de breakpoint.
 *
 * Este hook permite que qualquer componente consuma o estado de `isMobile`
 * fornecido pelo `BreakpointProvider`.
 *
 * @returns {BreakpointContextProps} O estado de `isMobile`.
 */
export const useBreakpoint = () => useContext(BreakpointContext);

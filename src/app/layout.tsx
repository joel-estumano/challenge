import './globals.css';
import ClientWrapper from './ClientWrapper';
import type { Metadata } from 'next';
import { Poppins, Montserrat } from 'next/font/google';
import { Providers } from './Providers';
import { useBreakpoint } from '@/components/context/breakpoint';

const poppins = Poppins({
	weight: '400',
	display: 'swap',
	variable: '--font-poppins',
	subsets: ['latin']
});

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<body className={`${poppins.variable} ${montserrat.variable} antialiased`}>
				<Providers>
					<ClientWrapper>{children}</ClientWrapper>
				</Providers>
			</body>
		</html>
	);
}

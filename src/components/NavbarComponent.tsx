import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { authService } from '@/services/login-service';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { getInitials } from '@/utils';

const NavbarComponent: React.FC = () => {
	const user = useSelector((state: RootState) => state.user.data);

	return (
		<nav className="sticky top-0 w-full block bg-black">
			<div className="flex justify-between items-center w-full h-12 max-w-screen-xl px-16 mx-auto max-sm:px-4 xl:px-8">
				<h1 className="lg:text-1xl xl:text-2xl font-bold">Gerenciador de Tickets</h1>
				<div className="flex flex-row gap-4 items-center">
					<DropdownMenu>
						<DropdownMenuTrigger className="rounded-full">
							<Avatar>
								<AvatarImage src={user?.avatarUrl || ''} />
								<AvatarFallback>{user ? getInitials(user.name) : '?'}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href="/create-account">Criar Conta</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/login">Fazer Login</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button title="Logout" className="w-full text-start" onClick={() => authService.logout()}>
									Logout
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
};

export default NavbarComponent;

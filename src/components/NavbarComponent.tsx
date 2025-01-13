import Link from 'next/link';
import React from 'react';
import IconComponent from '@/components/IconComponent';
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
				<h1 className="lg:text-1xl xl:text-2xl font-bold">G-Tickets</h1>
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
								<Link className="flex items-center w-full text-start gap-2" href="/create-account">
									<IconComponent name="UserPlus2" className="w-4 h-4" />
									<span>Criar Conta</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link className="flex items-center w-full text-start gap-2" href="/login">
									<IconComponent name="LogIn" className="w-4 h-4" />
									<span>Fazer Login</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button title="Logout" className="flex items-center w-full text-start gap-2" onClick={() => authService.logout()}>
									<IconComponent name="LogOut" className="w-4 h-4" />
									<span>Logout</span>
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

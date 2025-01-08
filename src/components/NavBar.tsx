import React from 'react';
import { Button } from './ui/button';
import Icon from './Icon';

const NavBar: React.FC = () => {
	return (
		<nav className="sticky top-0 w-full z-[1000] block bg-violet-200">
			<div className="flex justify-between items-center w-full h-16 max-w-screen-xl  px-16 mx-auto max-sm:px-4 xl:px-8">
				<h1 className="text-2xl font-bold">Gerenciador de Tickets</h1>
				<div className="flex justify-between items-center">
					<div className="flex gap-2">
						<Button type="button" title="Novo Ticket">
							<Icon name="PlusCircle" className="mr-2 h-4 w-4" />
							Novo Ticket
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;

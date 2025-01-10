import React from 'react';
import DialogTicketAdd from './dialogs/DialogTicketAdd';

const NavbarComponet: React.FC = () => {
	return (
		<nav className="sticky top-0 w-full z-[1000] block bg-black">
			<div className="flex justify-between items-center w-full h-12 max-w-screen-xl  px-16 mx-auto max-sm:px-4 xl:px-8">
				<h1 className="lg:text-1xl xl:text-2xl font-bold">Gerenciador de Tickets</h1>
				<DialogTicketAdd />
			</div>
		</nav>
	);
};

export default NavbarComponet;

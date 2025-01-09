import React from 'react';

const NavBar: React.FC = () => {
	return (
		<nav className="sticky top-0 w-full z-[1000] block bg-violet-200">
			<div className="flex justify-between items-center w-full h-12 max-w-screen-xl  px-16 mx-auto max-sm:px-4 xl:px-8">
				<h1 className="text-2xl font-bold">Gerenciador de Tickets</h1>
			</div>
		</nav>
	);
};

export default NavBar;

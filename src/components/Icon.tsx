import React from 'react';
import * as LucideIcons from 'lucide-react';
import clsx from 'clsx';

interface IconProps {
	name: keyof typeof LucideIcons;
	className?: string;
}

/**
 * Componente de Ícone Dinâmico
 *
 * Este componente renderiza dinamicamente ícones da biblioteca lucide-react
 * com base no nome fornecido.
 *
 * @param {keyof typeof LucideIcons} name - O nome do ícone a ser renderizado.
 * @param {string} [className] - Classes CSS adicionais para estilização.
 * @returns {JSX.Element | null} - O componente de ícone ou null se não encontrado.
 */
const Icon: React.FC<IconProps> = ({ name, className }) => {
	const IconComponent = LucideIcons[name];

	if (!IconComponent) {
		console.error(`Ícone "${name}" não encontrado em lucide-react`);
		return null;
	}

	return <IconComponent className={clsx(className)} />;
};

export default Icon;

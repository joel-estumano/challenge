import React, { ReactNode } from 'react';

interface SectionProps {
	className?: string;
	children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ className = '', children }) => {
	const classFn = () => {
		return `${className} py-4 sm:py-8`;
	};

	return (
		<section className={classFn()}>
			<div className="max-w-screen-xl px-16 mx-auto max-sm:px-4 xl:px-8">{children}</div>
		</section>
	);
};

export default Section;

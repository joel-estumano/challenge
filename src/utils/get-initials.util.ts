// Função para pegar as iniciais do nome
export function getInitials(name: string) {
	const names = name.split(' ');
	const initials = names.map((namePart) => namePart[0]).join('');
	return initials.toUpperCase();
}

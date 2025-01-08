import { StatusEnum } from '@/enums/status.enum';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes usando clsx e twMerge.
 *
 * @param {...ClassValue[]} inputs - As classes a serem combinadas.
 * @returns {string} - A string de classes combinadas.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/**
 * Formata uma string de data ISO 8601 para um formato mais legível.
 *
 * @param {string} dateString - A string da data em formato ISO 8601.
 * @returns {string} - A data formatada no formato "dia de mês de ano às hora:minuto".
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const options = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	} as Intl.DateTimeFormatOptions;
	return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

type BadgeVariant = 'destructive' | 'secondary' | 'default';

const statusToVariantMap: Record<StatusEnum, BadgeVariant> = {
	[StatusEnum.OPEN]: 'destructive',
	[StatusEnum.PROGRESS]: 'secondary',
	[StatusEnum.DONE]: 'default'
};

/**
 * Obtém a variante do Badge com base no status do ticket.
 *
 * @param {StatusEnum} status - O status do ticket.
 * @returns {BadgeVariant} - A variante do Badge correspondente.
 */
export function getBadgeVariant(status: StatusEnum = StatusEnum.OPEN): BadgeVariant {
	return statusToVariantMap[status] || 'destructive';
}

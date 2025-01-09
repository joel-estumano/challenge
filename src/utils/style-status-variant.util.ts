import { StatusEnum } from '@/enums/status.enum';

type BadgeVariant = 'destructive' | 'secondary' | 'default';

const statusToVariantMap: Record<Exclude<StatusEnum, StatusEnum.ALL>, BadgeVariant> = {
	[StatusEnum.OPEN]: 'destructive',
	[StatusEnum.PROGRESS]: 'default',
	[StatusEnum.DONE]: 'secondary'
};

/**
 * Obtém a variante do Badge com base no status do ticket.
 *
 * @param {StatusEnum} status - O status do ticket.
 * @returns {BadgeVariant} - A variante do Badge correspondente.
 */
export function styleStatusVariant(status: Exclude<StatusEnum, StatusEnum.ALL> = StatusEnum.OPEN): BadgeVariant {
	return statusToVariantMap[status] || 'destructive';
}

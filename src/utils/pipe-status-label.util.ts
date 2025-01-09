import { StatusEnum } from '@/enums/status.enum';

/**
 * Obtém o texto de status a partir do valor do status enum do ticket.
 *
 * @param {StatusEnum} status - O status do ticket.
 * @returns {string} - O texto de status do do ticket.
 */
export function pipeStatusLabel(status: StatusEnum = StatusEnum.OPEN): string {
	switch (status) {
		case StatusEnum.OPEN:
			return 'Aberto';
		case StatusEnum.PROGRESS:
			return 'Em Progresso';
		case StatusEnum.DONE:
			return 'Concluído';
		case StatusEnum.ALL:
			return 'Todos';
	}
}

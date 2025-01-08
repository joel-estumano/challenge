/**
 * Formata uma string de data ISO 8601 para um formato mais legível.
 *
 * @param {string} dateString - A string da data em formato ISO 8601.
 * @returns {string} - A data formatada no formato "dia de mês de ano às hora:minuto".
 */
export function pipeDateTimeLabel(dateString: string): string {
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

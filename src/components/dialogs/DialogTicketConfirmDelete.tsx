import IconComponet from '@/components/IconComponent';
import React, { useState } from 'react';
import { AppDispatch, RootState } from '@/store';
import { Button } from '../ui/button';
import { deleteTicket } from '@/store/tickets/tickets-actions';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ITicket } from '@/interfaces';
import { pipeDateTimeLabel } from '@/utils';
import { StatusEnum } from '@/enums/status.enum';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { pipeInitialsUserName } from '@/utils';

interface ConfirmDeleteDialogProps {
	ticket: ITicket;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ ticket }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading } = useSelector((state: RootState) => state.tickets);
	const [isOpen, setIsOpen] = useState(false);

	const handleConfirm = async () => {
		await dispatch(deleteTicket(ticket._id as string))
			.unwrap() // Desembrulha a ação para obter o valor real ou lançar o erro
			.then(() => {
				toast.success('Ticket excluído com sucesso!');
				setIsOpen(false);
			})
			.catch((error) => {
				console.error(error);
				toast.error('Erro ao excluir o ticket.');
			});
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button type="button" variant="ghost" title="Excluir" className="text-destructive p-2" onClick={() => setIsOpen(true)}>
						<IconComponet name="Trash2" className="w-4 h-4" />
					</Button>
				</DialogTrigger>
				<DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
					<DialogHeader>
						<DialogTitle>Confirmar Exclusão</DialogTitle>
						<DialogDescription className="text-destructive font-semibold">
							Você tem certeza que deseja excluir o ticket?
							<br />
							Esta ação não pode ser desfeita.
						</DialogDescription>
						<div className="mt-4">
							<label htmlFor="ticketId" className="block text-sm font-medium text-gray-700">
								ID
							</label>
							<DialogDescription id="ticketId">{ticket._id}</DialogDescription>
						</div>
						<div className="mt-2">
							<label htmlFor="ticketAuthor" className="block text-sm font-medium text-gray-700">
								Criador
							</label>
							<div className="flex items-center gap-2 max-sm:justify-center">
								<Avatar>
									<AvatarImage src={ticket.user?.avatarUrl || ''} />
									<AvatarFallback>{ticket.user ? pipeInitialsUserName(ticket.user.name) : '?'}</AvatarFallback>
								</Avatar>
								<span>{ticket.user ? ticket.user.name : 'Usuário não autenticado'}</span>
							</div>
						</div>
						<div className="mt-2">
							<label htmlFor="ticketTitle" className="block text-sm font-medium text-gray-700">
								Título
							</label>
							<DialogDescription id="ticketTitle">{ticket.title}</DialogDescription>
						</div>
						<div className="mt-2">
							<label htmlFor="ticketUpdated" className="block text-sm font-medium text-gray-700">
								Última Atualização
							</label>
							<DialogDescription id="ticketUpdated">{pipeDateTimeLabel(ticket.updatedAt as StatusEnum)}</DialogDescription>
						</div>
					</DialogHeader>
					<DialogFooter className="gap-4 sm:gap-2 flex max-sm:flex-col-reverse">
						<Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
							Cancelar
						</Button>
						<Button type="button" variant="destructive" onClick={handleConfirm} disabled={isLoading}>
							{isLoading ? 'Excluindo...' : 'Confirmar'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ConfirmDeleteDialog;

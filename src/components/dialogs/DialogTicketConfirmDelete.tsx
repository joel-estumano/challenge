import IconComponet from '@/components/IconComponet';
import React, { useState } from 'react';
import { AppDispatch, RootState } from '@/store';
import { Button } from '../ui/button';
import { deleteTicket } from '@/store/tickets/tickets-actions';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ITicket } from '@/interfaces';
import { pipeDateTimeLabel } from '@/utils';
import { StatusEnum } from '@/enums/status.enum';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

interface ConfirmDeleteDialogProps {
	ticket: ITicket;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ ticket }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading } = useSelector((state: RootState) => state.tickets);
	const [isOpen, setIsOpen] = useState(false);

	const handleConfirm = async () => {
		try {
			await dispatch(deleteTicket(ticket._id as string));
			toast.success('Ticket excluído com sucesso!');
		} catch (error) {
			console.error(error);
			toast.error('Erro ao excluir o ticket.');
		} finally {
			setIsOpen(false);
		}
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
							<DialogDescription id="ticketAuthor">{ticket.author}</DialogDescription>
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
					<div className="mt-4 flex justify-end space-x-2">
						<Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
							Cancelar
						</Button>
						<Button type="button" variant="destructive" onClick={handleConfirm} disabled={isLoading}>
							{isLoading ? 'Excluindo...' : 'Confirmar'}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ConfirmDeleteDialog;

import Icon from '@/components/Icon';
import React, { useState } from 'react';
import { AppDispatch, RootState } from '@/store';
import { Button } from '../ui/button';
import { deleteTicket } from '@/store/tickets/tickets-actions';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ITicket } from '@/interfaces';
import { pipeDateTimeLabel } from '@/utils';
import { StatusEnum } from '@/enums/status.enum';
import { useDispatch, useSelector } from 'react-redux';

interface ConfirmDeleteDialogProps {
	ticket: ITicket;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ ticket }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading } = useSelector((state: RootState) => state.tickets);
	const [isOpen, setIsOpen] = useState(false);

	const handleConfirm = () => {
		dispatch(deleteTicket(ticket._id as string));
		setIsOpen(false);
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button type="button" variant="outline" title="Excluir" className="text-destructive p-2" onClick={() => setIsOpen(true)}>
						<Icon name="Trash2" className="w-4 h-4" />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirmar Exclusão</DialogTitle>
						<DialogDescription className="text-destructive font-semibold">
							Você tem certeza que deseja excluir o ticket?
							<br />
							Esta ação não pode ser desfeita.
						</DialogDescription>
						<DialogDescription>
							<strong>ID:</strong> {ticket._id}
						</DialogDescription>
						<DialogDescription>
							<strong>Autor:</strong> {ticket.author}
						</DialogDescription>
						<DialogDescription>
							<strong>Título:</strong> {ticket.title}
						</DialogDescription>
						<DialogDescription>
							<strong>Última Atualização:</strong> {pipeDateTimeLabel(ticket.updatedAt as StatusEnum)}
						</DialogDescription>
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

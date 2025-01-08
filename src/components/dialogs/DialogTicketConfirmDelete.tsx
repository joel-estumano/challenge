import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/Icon';
import { ITicket } from '@/interfaces';
import { Button } from '../ui/button';
import { formatDate } from '@/lib/utils';
import { StatusEnum } from '@/enums/status.enum';

interface ConfirmDeleteDialogProps {
	ticket: ITicket;
	onConfirm: (id: string) => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ ticket, onConfirm }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleConfirm = () => {
		onConfirm(ticket._id as string);
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
							<strong>Última Atualização:</strong> {formatDate(ticket.updatedAt as StatusEnum)}
						</DialogDescription>
					</DialogHeader>
					<div className="mt-4 flex justify-end space-x-2">
						<Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
							Cancelar
						</Button>
						<Button type="button" variant="destructive" onClick={handleConfirm}>
							Confirmar
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ConfirmDeleteDialog;

import React, { ReactNode, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/Icon';
import { ITicket } from '@/interfaces';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { formatDate, getBadgeVariant } from '@/lib/utils';
import { StatusEnum } from '@/enums/status.enum';

interface DetailsDialogProps {
	ticket: ITicket;
	children?: ReactNode;
}

const DetailsDialog: React.FC<DetailsDialogProps> = ({ ticket, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					{children ? (
						<Button type="button" variant="link" title="Detalhes">
							{children}
						</Button>
					) : (
						<Button type="button" variant="outline" title="Detalhes" className="text-yellow-600 p-2" onClick={() => setIsOpen(true)}>
							<Icon name="Eye" className="w-4 h-4" />
						</Button>
					)}
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Detalhes do Ticket</DialogTitle>
						<DialogDescription></DialogDescription>
						<div className="my-2 flex max-sm:justify-center">
							<Badge variant={getBadgeVariant(ticket.status)} className="min-w-24 h-fit w-24 items-center justify-center flex">
								{ticket.status}
							</Badge>
						</div>
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
							<strong>Status:</strong> {ticket.status}
						</DialogDescription>
						<DialogDescription>
							<strong>Data de criação:</strong> {formatDate(ticket.createdAt as StatusEnum)}
						</DialogDescription>
						<DialogDescription>
							<strong>Última Atualização:</strong> {formatDate(ticket.updatedAt as StatusEnum)}
						</DialogDescription>
					</DialogHeader>
					<div className="mt-4 flex justify-end space-x-2">
						<Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
							Fechar
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default DetailsDialog;

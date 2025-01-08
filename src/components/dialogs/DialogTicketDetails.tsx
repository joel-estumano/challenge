import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

import Icon from '@/components/Icon';
import { ITicket } from '@/interfaces';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { formatDate, getBadgeVariant } from '@/lib/utils';
import { StatusEnum } from '@/enums/status.enum';

interface DetailsDialogProps {
	ticket: ITicket;
}

const DetailsDialog: React.FC<DetailsDialogProps> = ({ ticket }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button type="button" variant="outline" title="Detalhes" className="text-yellow-600 p-2" onClick={() => setIsOpen(true)}>
						<Icon name="Eye" className="w-4 h-4" />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Detalhes do Ticket</DialogTitle>
						<DialogDescription></DialogDescription>
						<div>
							<div className="my-2 flex max-sm:justify-center">
								<Badge variant={getBadgeVariant(ticket.status)} className="min-w-24 h-fit w-24 items-center justify-center flex">
									{ticket.status}
								</Badge>
							</div>
							<div>
								<strong>ID:</strong> {ticket._id}
							</div>
							<div>
								<strong>Autor:</strong> {ticket.author}
							</div>
							<div>
								<strong>Título:</strong> {ticket.title}
							</div>
							<div>
								<strong>Status:</strong> {ticket.status}
							</div>
							<div>
								<strong>Última Atualização:</strong> {formatDate(ticket.updatedAt as StatusEnum)}
							</div>
						</div>
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

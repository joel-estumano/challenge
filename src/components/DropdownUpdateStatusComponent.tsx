import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { editTicket } from '@/store/tickets/tickets-actions';
import { StatusEnum } from '@/enums/status.enum';
import { pipeStatusLabel } from '@/utils';
import { ITicket } from '@/interfaces';
import { toast } from 'sonner';

interface DropdownUpdateStatusComponentProps {
	ticket: ITicket;
}

const DropdownUpdateStatusComponent: React.FC<DropdownUpdateStatusComponentProps> = ({ ticket }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [status, setStatus] = useState<StatusEnum>(ticket.status ?? StatusEnum.OPEN);
	const [loading, setLoading] = useState<boolean>(false);

	const handleUpdateStatus = async () => {
		setLoading(true);
		await dispatch(editTicket({ ...ticket, status }))
			.unwrap()
			.then(() => {
				toast.success('Ticket atualizado com sucesso!');
				setIsPopoverOpen(false);
			})
			.catch((error) => {
				console.error(error);
				toast.error(`Erro ao atualizar o ticket: ${error}`);
			})
			.finally(() => setLoading(false));
	};

	return (
		<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
			<PopoverTrigger asChild>
				<div
					className="flex items-center gap-1 cursor-pointer text-[.6rem] w-full justify-center"
					onClick={(e) => {
						e.stopPropagation();
						setIsPopoverOpen((prev) => !prev);
					}}
				>
					{pipeStatusLabel(ticket.status)}
				</div>
			</PopoverTrigger>
			<PopoverContent className="p-4 w-42" onClick={(e) => e.preventDefault()}>
				<div className="flex flex-col gap-2">
					<Select name="status" value={status} onValueChange={(value) => setStatus(value as StatusEnum)}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							{[StatusEnum.OPEN, StatusEnum.PROGRESS, StatusEnum.DONE].map((status) => (
								<SelectItem key={status} value={status}>
									{pipeStatusLabel(status)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<div className="mt-1 flex justify-end">
						<Button type="button" title="Atualizar Status" className="w-full" size={'sm'} onClick={handleUpdateStatus} disabled={loading}>
							{loading ? 'Atualizando...' : 'Atualizar status'}
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default DropdownUpdateStatusComponent;

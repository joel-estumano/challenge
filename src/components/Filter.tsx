import React, { useState } from 'react';
import { AppDispatch } from '../store';
import { filterTickets } from '../store/tickets/tickets-actions';
import { pipeStatusLabel } from '@/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { StatusEnum } from '@/enums/status.enum';
import { useDispatch } from 'react-redux';

const Filter: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [selectedStatus, setselectedStatus] = useState<StatusEnum>(StatusEnum.ALL);

	const handleApplyFilter = (value: StatusEnum) => {
		setselectedStatus(value);
		dispatch(filterTickets(value));
	};

	return (
		<div className="flex gap-2 max-sm:justify-between items-center">
			<p className="font-semibold">Filtrar por status:</p>
			<div className="flex gap-2 items-center">
				<Select name="status" value={selectedStatus} onValueChange={(value: StatusEnum) => handleApplyFilter(value)}>
					<SelectTrigger className="w-36">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						{Object.values(StatusEnum).map((status) => (
							<SelectItem key={status} value={status}>
								{pipeStatusLabel(status)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default Filter;

/*
* <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
			<PopoverTrigger
				className={`${className} inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2`}
			>
				<div className="flex items-center gap-1">
					<Icon name="Filter" className="w-4 h-4" />
					Filtrar por status
				</div>
			</PopoverTrigger>
			<PopoverContent className="p-4 w-36 ">
				<div className="flex flex-col gap-2">
					{Object.values(StatusEnum).map((status) => (
						<div key={status} className="flex items-center gap-2">
							<Checkbox checked={selectedStatuss.includes(status)} onCheckedChange={() => handleCheckboxChange(status)} />
							<span className="text-[.7rem]">{pipeStatusLabel(status)}</span>
						</div>
					))}
					<div className="mt-1 flex justify-end">
						<Button type="button" title="Novo Ticket" className="w-full" size={'sm'} onClick={handleApplyFilter}>
							Aplicar Filtro
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover> *
*/

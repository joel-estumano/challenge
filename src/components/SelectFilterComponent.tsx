import React, { useState } from 'react';
import { AppDispatch } from '../store';
import { filterTickets } from '../store/tickets/tickets-actions';
import { pipeStatusLabel } from '@/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { StatusEnum } from '@/enums/status.enum';
import { useDispatch } from 'react-redux';

const SelectFilterComponet: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [selectedStatus, setselectedStatus] = useState<StatusEnum>(StatusEnum.ALL);

	const handleApplyFilter = (value: StatusEnum) => {
		setselectedStatus(value);
		dispatch(filterTickets(value));
	};

	return (
		<div className="flex gap-2 sm:justify-between items-center  w-full">
			<div className="w-fit ">
				<p className="font-semibold text-nowrap">Filtrar por status:</p>
			</div>
			<div className="flex gap-2 items-center w-full">
				<Select name="status" value={selectedStatus} onValueChange={(value: StatusEnum) => handleApplyFilter(value)}>
					<SelectTrigger className="w-36 max-sm:w-full">
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

export default SelectFilterComponet;

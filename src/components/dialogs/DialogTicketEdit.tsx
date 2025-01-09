import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import Icon from '../Icon';
import { Input } from '../ui/input';
import { AppDispatch } from '@/store';
import { editTicket } from '@/store/tickets/tickets-actions';
import { ITicket } from '@/interfaces';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { StatusEnum } from '@/enums/status.enum';
import { pipeStatusLabel } from '@/utils';

interface DialogTicketEditProps {
	ticket: ITicket;
}

const DialogTicketEdit: React.FC<DialogTicketEditProps> = ({ ticket }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const formik = useFormik({
		initialValues: {
			title: ticket.title,
			description: ticket.description,
			author: ticket.author,
			status: ticket.status
		},
		validationSchema: Yup.object({
			title: Yup.string().required('Título é obrigatório'),
			description: Yup.string().required('Descrição é obrigatória'),
			author: Yup.string().required('Autor é obrigatório')
		}),
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			await dispatch(editTicket({ ...ticket, ...values }));
			setSubmitting(false);
			resetForm();
			setIsDialogOpen(false);
		}
	});

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant="outline" title="Editar" className="text-violet-600 p-2">
					<Icon name="Edit" className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar Ticket</DialogTitle>
					<DialogDescription>Atualize os dados abaixo para editar o ticket.</DialogDescription>
				</DialogHeader>
				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
					<div>
						<Input name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Título" />
						{formik.touched.title && formik.errors.title ? <div className="text-red-500 text-sm">{formik.errors.title}</div> : null}
					</div>
					<div>
						<Input
							name="description"
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Descrição"
						/>
						{formik.touched.description && formik.errors.description ? (
							<div className="text-red-500 text-sm">{formik.errors.description}</div>
						) : null}
					</div>
					<div>
						<Input name="author" value={formik.values.author} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Autor" />
						{formik.touched.author && formik.errors.author ? <div className="text-red-500 text-sm">{formik.errors.author}</div> : null}
					</div>
					<div>
						<Select name="status" value={formik.values.status} onValueChange={(value: StatusEnum) => formik.setFieldValue('status', value)}>
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
					</div>
					<DialogFooter className="gap-2">
						<DialogClose asChild>
							<Button variant="outline">Cancelar</Button>
						</DialogClose>
						<Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
							{formik.isSubmitting ? 'Atualizando...' : 'Salvar'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default DialogTicketEdit;

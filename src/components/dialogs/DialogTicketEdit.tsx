import * as Yup from 'yup';
import IconComponet from '../IconComponent';
import React, { useEffect, useState } from 'react';
import { AppDispatch } from '@/store';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { editTicket } from '@/store/tickets/tickets-actions';
import { Input } from '../ui/input';
import { ITicket } from '@/interfaces';
import { getInitials, pipeStatusLabel } from '@/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { StatusEnum } from '@/enums/status.enum';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface DialogTicketEditProps {
	ticket: ITicket;
}

const DialogTicketEdit: React.FC<DialogTicketEditProps> = ({ ticket }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: ticket.title,
			description: ticket.description,
			status: ticket.status
		},
		validationSchema: Yup.object({
			title: Yup.string().required('Título é obrigatório'),
			description: Yup.string().required('Descrição é obrigatória')
		}),
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			const { user, ...ticketWithoutUser } = ticket;
			await dispatch(editTicket({ ...ticketWithoutUser, ...values }))
				.unwrap() // Desembrulha a ação para obter o valor real ou lançar o erro
				.then(() => {
					toast.success('Ticket atualizado com sucesso!');
					resetForm();
					setIsDialogOpen(false);
				})
				.catch((error) => {
					console.error(error);
					toast.error(`Erro ao atualizar o ticket: ${error}`);
				})
				.finally(() => setSubmitting(false));
		}
	});

	useEffect(() => {
		if (isDialogOpen) {
			formik.setValues({
				title: ticket.title,
				description: ticket.description,
				status: ticket.status
			});
		}
	}, [isDialogOpen, ticket]);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant="ghost" title="Editar" className="text-violet-600 p-2">
					<IconComponet name="Edit" className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Editar Ticket</DialogTitle>
					<DialogDescription>Atualize os dados abaixo para editar o ticket.</DialogDescription>
				</DialogHeader>
				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
					<div className="flex items-center gap-2 max-sm:justify-center">
						<Avatar>
							<AvatarImage src={ticket.user?.avatarUrl || ''} />
							<AvatarFallback>{ticket.user ? getInitials(ticket.user.name) : '?'}</AvatarFallback>
						</Avatar>
						<span>{ticket.user ? ticket.user.name : 'Usuário não autenticado'}</span>
					</div>
					<div>
						<label htmlFor="title" className="block text-sm font-medium text-gray-700">
							Título
						</label>
						<Input
							id="title"
							name="title"
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Título"
						/>
						{formik.touched.title && formik.errors.title ? <div className="text-red-500 text-xs ms-1">{formik.errors.title}</div> : null}
					</div>
					<div>
						<label htmlFor="description" className="block text-sm font-medium text-gray-700">
							Descrição
						</label>
						<Textarea
							id="description"
							name="description"
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Descrição"
						/>
						{formik.touched.description && formik.errors.description ? (
							<div className="text-red-500 text-xs ms-1">{formik.errors.description}</div>
						) : null}
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Status</label>
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
					<DialogFooter className="gap-4 sm:gap-2 flex max-sm:flex-col-reverse">
						<DialogClose asChild>
							<Button variant="outline">Cancelar</Button>
						</DialogClose>
						<Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
							{formik.isSubmitting ? 'Atualizando...' : 'Atualizar'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default DialogTicketEdit;

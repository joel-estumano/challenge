import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import Icon from '../Icon';
import { Input } from '../ui/input';
import { AppDispatch } from '@/store';
import { addTicket } from '@/store/tickets/tickets-actions';
import { StatusEnum } from '@/enums/status.enum';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const DialogAddTicket: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const status = StatusEnum.OPEN;

	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			author: ''
		},
		validationSchema: Yup.object({
			title: Yup.string().required('Título é obrigatório'),
			description: Yup.string().required('Descrição é obrigatória'),
			author: Yup.string().required('Autor é obrigatório')
		}),
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			await dispatch(addTicket({ ...values, status }));
			setSubmitting(false);
			resetForm();
			setIsDialogOpen(false);
		}
	});

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button type="button" className="flex items-center gap-1">
					<Icon name="Plus" className="w-4 h-4" />
					Ticket
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar novo Ticket</DialogTitle>
					<DialogDescription>Preencha os dados abaixo para adicionar um novo ticket.</DialogDescription>
				</DialogHeader>
				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
					<div>
						<Input name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Título" />
						{formik.touched.title && formik.errors.title ? <div className="text-red-500 text-xs ms-1">{formik.errors.title}</div> : null}
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
							<div className="text-red-500 text-xs ms-1">{formik.errors.description}</div>
						) : null}
					</div>
					<div>
						<Input name="author" value={formik.values.author} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Autor" />
						{formik.touched.author && formik.errors.author ? <div className="text-red-500 text-xs ms-1">{formik.errors.author}</div> : null}
					</div>
					<DialogFooter className="gap-2">
						<DialogClose asChild>
							<Button variant="outline">Cancelar</Button>
						</DialogClose>
						<Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
							{formik.isSubmitting ? 'Enviando...' : 'Salvar'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default DialogAddTicket;

import * as Yup from 'yup';
import IconComponet from '../IconComponet';
import React, { useEffect, useState } from 'react';
import { addTicket } from '@/store/tickets/tickets-actions';
import { AppDispatch } from '@/store';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { StatusEnum } from '@/enums/status.enum';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';

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
			try {
				await dispatch(addTicket({ ...values, status }));
				toast.success('Ticket adicionado com sucesso!');
				resetForm();
				setIsDialogOpen(false);
			} catch (error) {
				console.error(error);
				toast.error('Erro ao adicionar o ticket.');
			} finally {
				setSubmitting(false);
			}
		}
	});

	useEffect(() => {
		if (isDialogOpen) {
			formik.resetForm();
		}
	}, [isDialogOpen]);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button type="button" size={'sm'} className="flex items-center gap-1">
					<IconComponet name="Plus" className="w-4 h-4" />
					Ticket
				</Button>
			</DialogTrigger>
			<DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Novo Ticket</DialogTitle>
					<DialogDescription>Preencha os dados abaixo para adicionar um novo ticket.</DialogDescription>
				</DialogHeader>
				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
					<div>
						<label htmlFor="author" className="block text-sm font-medium text-gray-700">
							Autor
						</label>
						<Input
							id="author"
							name="author"
							value={formik.values.author}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Autor"
						/>
						{formik.touched.author && formik.errors.author ? <div className="text-red-500 text-xs ms-1">{formik.errors.author}</div> : null}
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
					<DialogFooter className="gap-4 sm:gap-2 flex max-sm:flex-col-reverse">
						<DialogClose asChild>
							<Button variant="outline" title="Cancelar">
								Cancelar
							</Button>
						</DialogClose>
						<Button type="submit" title="Salvar" disabled={formik.isSubmitting || !formik.isValid}>
							{formik.isSubmitting ? 'Salvando...' : 'Salvar'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default DialogAddTicket;

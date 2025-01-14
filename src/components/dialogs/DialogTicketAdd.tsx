'use client';
import * as Yup from 'yup';
import IconComponet from '../IconComponent';
import React, { useEffect, useState } from 'react';
import { addTicket } from '@/store/tickets/tickets-actions';
import { AppDispatch, RootState } from '@/store';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { StatusEnum } from '@/enums/status.enum';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { pipeInitialsUserName } from '@/utils';
import { ITicket } from '@/interfaces';

const DialogAddTicket: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const status = StatusEnum.OPEN;
	const user = useSelector((state: RootState) => state.user.data);

	const formik = useFormik({
		initialValues: {
			title: '',
			description: ''
		},
		validationSchema: Yup.object({
			title: Yup.string().required('Título é obrigatório'),
			description: Yup.string().required('Descrição é obrigatória')
		}),
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			if (user) {
				await dispatch(addTicket({ ...values, status, user: user.sub } as unknown as ITicket))
					.unwrap() // Desembrulha a ação para obter o valor real ou lança o erro
					.then(() => {
						toast.success('Ticket adicionado com sucesso!');
						resetForm();
						setIsDialogOpen(false);
					})
					.catch((error) => {
						toast.error(`Erro ao adicionar o ticket: ${error}`);
					})
					.finally(() => setSubmitting(false));
			} else {
				toast.error('Erro: Usuário não autenticado.');
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
					<div className="flex items-center gap-2 max-sm:justify-center">
						<Avatar>
							<AvatarImage src={user?.avatarUrl || ''} />
							<AvatarFallback>{user ? pipeInitialsUserName(user.name) : '?'}</AvatarFallback>
						</Avatar>
						<span>{user ? user.name : 'Usuário não autenticado'}</span>
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

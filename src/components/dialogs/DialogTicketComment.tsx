import api from '@/services/api';
import React, { ReactNode, useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { ITicket } from '@/interfaces';
import { pipeDateTimeLabel, pipeStatusLabel, styleStatusVariant } from '@/utils';
import { StatusEnum } from '@/enums/status.enum';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface DetailsDialogProps {
	ticket: ITicket;
	children?: ReactNode;
}

interface IComment {
	_id: string;
	ticketId: string;
	content: string;
	author: string;
	createdAt: string;
}

const DetailsDialog: React.FC<DetailsDialogProps> = ({ ticket, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [comments, setComments] = useState<IComment[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (isOpen) {
			fetchComments();
		}
	}, [isOpen]);

	const fetchComments = async () => {
		try {
			const response = await api.get(`/ticket-comments?ticket=${ticket._id}`);
			setComments(response.data.docs);
		} catch (error) {
			console.error('Failed to fetch comments:', error);
		}
	};

	const formik = useFormik({
		initialValues: {
			newComment: '',
			newAuthor: ''
		},
		validationSchema: Yup.object({
			newComment: Yup.string().required('O comentário não pode estar vazio.'),
			newAuthor: Yup.string().required('O nome do autor não pode estar vazio.')
		}),
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			setSubmitting(true);
			try {
				const response = await api.post('/ticket-comments', {
					ticket: ticket._id,
					content: values.newComment,
					author: values.newAuthor
				});

				setComments((prevComments) => [response.data, ...prevComments]);
				resetForm();
				setError(null);
				toast.success('Comentário adicionado com sucesso!');
			} catch (error) {
				console.error('Failed to add comment:', error);
				setError('Falha ao adicionar o comentário.');
				toast.error('Erro ao adicionar o comentário');
			} finally {
				setSubmitting(false);
			}
		}
	});

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<a className="hover:underline">{children}</a>
				</DialogTrigger>
				<DialogContent
					className="min-w-[60vw] grid grid-cols-1 xl:grid-cols-2 overflow-y-auto max-h-[86vh]"
					onOpenAutoFocus={(e) => e.preventDefault()}
				>
					<div>
						<DialogHeader>
							<DialogTitle>Detalhes do Ticket</DialogTitle>
							<DialogDescription></DialogDescription>
							<div className="my-2 flex max-sm:justify-center">
								<Badge
									variant={styleStatusVariant(ticket.status as Exclude<StatusEnum, StatusEnum.ALL>)}
									className="min-w-24 h-fit w-24 items-center justify-center flex"
								>
									<span className="text-[.6rem]">{pipeStatusLabel(ticket.status)}</span>
								</Badge>
							</div>
							<div className="mt-4">
								<label htmlFor="ticketId" className="block text-sm font-medium text-gray-700">
									ID
								</label>
								<DialogDescription id="ticketId">{ticket._id}</DialogDescription>
							</div>
							<div className="mt-2">
								<label htmlFor="ticketAuthor" className="block text-sm font-medium text-gray-700">
									Autor
								</label>
								<DialogDescription id="ticketAuthor">{ticket.author}</DialogDescription>
							</div>
							<div className="mt-2">
								<label htmlFor="ticketTitle" className="block text-sm font-medium text-gray-700">
									Título
								</label>
								<DialogDescription id="ticketTitle">{ticket.title}</DialogDescription>
							</div>
							<div className="mt-2">
								<label htmlFor="ticketDescription" className="block text-sm font-medium text-gray-700">
									Descrição
								</label>
								<DialogDescription id="ticketDescription">{ticket.description}</DialogDescription>
							</div>
							<div className="mt-2">
								<label htmlFor="ticketCreatedAt" className="block text-sm font-medium text-gray-700">
									Data de criação
								</label>
								<DialogDescription id="ticketCreatedAt">{pipeDateTimeLabel(ticket.createdAt as StatusEnum)}</DialogDescription>
							</div>
							<div className="mt-2">
								<label htmlFor="ticketUpdatedAt" className="block text-sm font-medium text-gray-700">
									Última Atualização
								</label>
								<DialogDescription id="ticketUpdatedAt">{pipeDateTimeLabel(ticket.updatedAt as StatusEnum)}</DialogDescription>
							</div>
						</DialogHeader>
					</div>
					<div className="">
						<div>
							<DialogTitle className="max-sm:text-center">Comentários</DialogTitle>
							<div className="mt-2 flex flex-col flex-grow space-y-2 overflow-y-auto h-[300px] border rounded p-1">
								{comments.length === 0 ? (
									<p className="text-center py-4">Nada por aqui</p>
								) : (
									comments.map((comment) => (
										<div key={comment._id} className="p-2 border rounded">
											<p className="text-sm">{comment.content}</p>
											<p className="text-xs text-gray-500">Autor: {comment.author}</p>
											<p className="text-xs text-gray-500">Data: {pipeDateTimeLabel(comment.createdAt as StatusEnum)}</p>
										</div>
									))
								)}
							</div>
						</div>
						<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-4">
							<div>
								<label htmlFor="newAuthor" className="block text-sm font-medium text-gray-700">
									Seu nome
								</label>
								<Input
									id="newAuthor"
									name="newAuthor"
									value={formik.values.newAuthor}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder="Seu nome"
								/>
								{formik.touched.newAuthor && formik.errors.newAuthor ? (
									<div className="text-red-500 text-xs ms-1">{formik.errors.newAuthor}</div>
								) : null}
							</div>
							<div>
								<label htmlFor="newComment" className="block text-sm font-medium text-gray-700">
									Adicionar um comentário
								</label>
								<Textarea
									id="newComment"
									name="newComment"
									value={formik.values.newComment}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder="Adicionar um comentário"
								/>
								{formik.touched.newComment && formik.errors.newComment ? (
									<div className="text-red-500 text-xs ms-1">{formik.errors.newComment}</div>
								) : null}
							</div>
							{error && <div className="text-red-500 text-xs ms-1">{error}</div>}
							<DialogFooter className="gap-4 sm:gap-2 flex flex-col">
								<Button type="submit" disabled={formik.isSubmitting}>
									{formik.isSubmitting ? 'Adicionando comentário...' : 'Adicionar Comentário'}
								</Button>
								<DialogClose asChild>
									<Button variant="outline">Fechar</Button>
								</DialogClose>
							</DialogFooter>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default DetailsDialog;

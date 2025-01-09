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
	const [newComment, setNewComment] = useState<string>('');
	const [newAuthor, setNewAuthor] = useState<string>('');
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

	const handleAddComment = async () => {
		if (!newComment.trim()) {
			setError('O comentário não pode estar vazio.');
			return;
		}

		if (!newAuthor.trim()) {
			setError('O nome do autor não pode estar vazio.');
			return;
		}

		try {
			const response = await api.post('/ticket-comments', {
				ticket: ticket._id,
				content: newComment,
				author: newAuthor
			});

			setComments((prevComments) => [response.data, ...prevComments]);
			setNewComment('');
			setNewAuthor('');
			setError(null);
		} catch (error) {
			console.error('Failed to add comment:', error);
			setError('Falha ao adicionar o comentário.');
		}
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<a className="hover:underline">{children}</a>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Detalhes do Ticket</DialogTitle>
						<DialogDescription></DialogDescription>
						<div className="my-2 flex max-sm:justify-center">
							<Badge variant={styleStatusVariant(ticket.status)} className="min-w-24 h-fit w-24 items-center justify-center flex">
								<span className="text-[.6rem]">{pipeStatusLabel(ticket.status)}</span>
							</Badge>
						</div>
						<DialogDescription>
							<strong>ID:</strong> {ticket._id}
						</DialogDescription>
						<DialogDescription>
							<strong>Autor:</strong> {ticket.author}
						</DialogDescription>
						<DialogDescription>
							<strong>Título:</strong> {ticket.title}
						</DialogDescription>
						<DialogDescription>
							<strong>Data de criação:</strong> {pipeDateTimeLabel(ticket.createdAt as StatusEnum)}
						</DialogDescription>
						<DialogDescription>
							<strong>Última Atualização:</strong> {pipeDateTimeLabel(ticket.updatedAt as StatusEnum)}
						</DialogDescription>
					</DialogHeader>
					<div className="overflow-y-hidden">
						<h3 className="mt-4 text-lg font-semibold">Comentários</h3>
						<div className={`mt-2 flex flex-col space-y-2 overflow-y-auto ${comments.length ? 'h-[200px]' : ''}`}>
							{comments.map((comment) => (
								<div key={comment._id} className="p-2 border border-gray-300 rounded">
									<p className="text-sm">{comment.content}</p>
									<p className="text-xs text-gray-500">Autor: {comment.author}</p>
									<p className="text-xs text-gray-500">Data: {pipeDateTimeLabel(comment.createdAt as StatusEnum)}</p>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-4 mt-4 ">
						<Input value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} placeholder="Seu nome" />
						<Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Adicionar um comentário" />
						{error && <p className="text-red-500 text-sm">{error}</p>}
					</div>
					<DialogFooter className="gap-2">
						<Button type="button" onClick={handleAddComment}>
							Adicionar Comentário
						</Button>
						<DialogClose asChild>
							<Button variant="outline">Fechar</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default DetailsDialog;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTicket, loadTickets } from '../store/tickets/tickets-actions';
import { RootState } from '../store';
import { useInView } from 'react-intersection-observer';
import { ITicket } from '@/interfaces';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from './ui/badge';
import Section from './Section';
import { formatDate, getBadgeVariant } from '@/lib/utils';
import Icon from './Icon';
import { Button } from './ui/button';
import { StatusEnum } from '@/enums/status.enum';
import NavBar from './NavBar';
import { useBreakpoint } from './context/breakpoint';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import DialogTicketConfirmDelete from './dialogs/DialogTicketConfirmDelete';
import DialogTicketDetails from './dialogs/DialogTicketDetails';

const Dashboard: React.FC = () => {
	const { isMobile } = useBreakpoint();
	const dispatch = useDispatch();
	const { data, isLoading, error, page, hasMore } = useSelector((state: RootState) => state.tickets);
	const { ref, inView } = useInView({
		threshold: 0.5,
		triggerOnce: false
	});

	useEffect(() => {
		console.log('Initial Load, Page:', page);
		if (page === 1 && !isLoading) {
			dispatch(loadTickets(page));
		}
	}, [dispatch, page, isLoading]);

	useEffect(() => {
		console.log('In View:', inView, 'Has More:', hasMore, 'Is Loading:', isLoading);
		if (inView && hasMore && !isLoading) {
			dispatch(loadTickets(page));
		}
	}, [inView, hasMore, isLoading, dispatch, page]);

	useEffect(() => {
		console.log('Loading Status Changed:', isLoading);
	}, [isLoading]);

	const handleDelete = (id: string) => {
		dispatch(deleteTicket(id));
	};

	if (error) return <p>Error: {error}</p>;

	return (
		<div className="flex flex-col w-full max-h-screen overflow-hidden min-h-svh bg-gradient-to-r from-violet-200 to-background">
			<div className=" flex flex-col flex-grow overflow-y-auto">
				<NavBar />
				<div className="relative flex flex-col flex-grow overflow-y-auto">
					<div className="flex-grow">
						<Section>
							{isMobile ? (
								<Accordion ref={ref} type="single" collapsible className="w-full">
									{data.docs.map((ticket: ITicket) => (
										<AccordionItem value={ticket._id as string} key={ticket._id}>
											<AccordionTrigger>
												<div className="flex justify-between pe-2 w-full">
													<strong>{ticket.title}</strong>
													<Badge
														variant={getBadgeVariant(ticket.status)}
														className="min-w-24 h-fit w-24 items-center justify-center flex"
													>
														{ticket.status}
													</Badge>
												</div>
											</AccordionTrigger>
											<AccordionContent className="">
												<div className="flex flex-col w-full h-full gap-4">
													<div className="flex flex-col gap-2">
														<p className="text-xs">
															<strong>ID: </strong>
															{ticket._id}
														</p>
														<p className="text-xs font-semibold">{ticket.description}</p>
														<p className="text-xs">
															<strong>Última atualização: </strong>
															{formatDate(ticket.updatedAt as StatusEnum)}
														</p>
													</div>

													<div className="flex gap-4 items-center ">
														<DialogTicketDetails ticket={ticket} />
														<Button type="button" variant="outline" title="Editar" className="text-violet-600 p-2">
															<Icon name="Edit" className="w-4 h-4" />
														</Button>
														<DialogTicketConfirmDelete ticket={ticket} onConfirm={handleDelete} />
													</div>
												</div>
											</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>
							) : (
								<div>
									{isLoading && <p>Loading...</p>}
									<Table ref={ref} className="min-w-full h-full">
										<TableHeader>
											<TableRow>
												<TableHead className="w-1/12 px-2 py-2 text-xs sm:text-sm">ID</TableHead>
												<TableHead className="w-1/12 px-2 py-2 text-xs sm:text-sm">Status</TableHead>
												<TableHead className="w-5/12 px-2 py-2 text-xs sm:text-sm">Title</TableHead>
												<TableHead className="w-3/12 px-2 py-2 text-xs sm:text-sm">Última atualização</TableHead>
												<TableHead className="w-2/12 px-2 py-2 text-xs sm:text-sm"></TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{data.docs.map((ticket: ITicket) => (
												<TableRow key={ticket._id}>
													<TableCell className="px-2 py-2 text-xs sm:text-sm">
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger asChild>
																	<div className="flex gap-1">
																		<span>{ticket._id?.slice(0, 3)}...</span>
																		<Icon name="Info" className="w-4 h-4 text-accent" />
																	</div>
																</TooltipTrigger>
																<TooltipContent>
																	<p>{ticket._id}</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</TableCell>
													<TableCell className="px-2 py-2 text-xs sm:text-sm">
														<Badge variant={getBadgeVariant(ticket.status)} className="w-24 items-center justify-center flex">
															{ticket.status}
														</Badge>
													</TableCell>
													<TableCell className="px-2 py-2 text-xs sm:text-sm">{ticket.title}</TableCell>
													<TableCell className="px-2 py-2 text-xs sm:text-sm">{formatDate(ticket.updatedAt as StatusEnum)}</TableCell>
													<TableCell className="px-2 py-2 text-xs sm:text-sm">
														<div className="flex gap-2 sm:gap-4 items-center justify-end">
															<DialogTicketDetails ticket={ticket} />
															<Button type="button" variant="outline" title="Editar" className="text-violet-600 p-2">
																<Icon name="Edit" className="w-4 h-4" />
															</Button>
															<DialogTicketConfirmDelete ticket={ticket} onConfirm={handleDelete} />
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							)}
						</Section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

'use client';
import DialogTicketAdd from '@/components/dialogs/DialogTicketAdd';
import DialogTicketComment from '@/components/dialogs/DialogTicketComment';
import DialogTicketConfirmDelete from '@/components/dialogs/DialogTicketConfirmDelete';
import DialogTicketEdit from '@/components/dialogs/DialogTicketEdit';
import DropdownUpdateStatusComponent from '@/components/DropdownUpdateStatusComponent';
import IconComponent from '@/components/IconComponent';
import NavbarComponent from '@/components/NavbarComponent';
import React from 'react';
import SectionComponent from '@/components/SectionComponent';
import SelectFilterComponent from '@/components/SelectFilterComponent';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ITicket } from '@/interfaces';
import { pipeDateTimeLabel, styleStatusVariant } from '@/utils';
import { StatusEnum } from '@/enums/status.enum';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useBreakpoint } from '@/components/context/breakpoint';
import { useInView } from 'react-intersection-observer';
import { useTickets } from '@/hooks/useTickets';

const Dashboard: React.FC = () => {
	const { isMobile } = useBreakpoint();
	const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });
	const { data, isLoading, error } = useTickets(inView);

	const message = error ? error : isLoading ? 'Carregando...' : 'Nada por aqui';

	return (
		<div className="flex flex-col w-full max-h-screen overflow-hidden min-h-svh bg-gradient-to-r from-surface to-background">
			<div className="flex flex-col flex-grow overflow-y-auto">
				<NavbarComponent />
				<div className="relative flex flex-col flex-grow overflow-y-auto">
					<div className="flex-grow">
						<SectionComponent>
							<div className="mb-6 max-sm:flex-col-reverse flex justify-between gap-4">
								<div className="flex items-center gap-2">
									<SelectFilterComponent />
									<IconComponent name="RefreshCw" className={`w-4 h-4  text-secondary ${isLoading ? 'animate-spin' : 'opacity-30'}`} />
								</div>
								<DialogTicketAdd />
							</div>

							{isMobile ? (
								<Accordion ref={ref} type="single" collapsible className="w-full">
									{data.docs.length === 0 ? (
										<p className="text-center max-sm:py-4">{message}</p>
									) : (
										data.docs.map((ticket: ITicket) => (
											<AccordionItem value={ticket._id as string} key={ticket._id}>
												<AccordionTrigger>
													<div className="flex gap-3 pe-2 w-full">
														<Badge
															variant={styleStatusVariant(ticket.status as Exclude<StatusEnum, StatusEnum.ALL>)}
															className="min-w-24 h-fit w-24 items-center justify-center flex px-0"
														>
															<DropdownUpdateStatusComponent ticket={ticket} />
														</Badge>
														<strong>{ticket.title}</strong>
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
																{pipeDateTimeLabel(ticket.updatedAt as StatusEnum)}
															</p>
														</div>

														<div className="flex gap-4 items-center">
															<DialogTicketComment ticket={ticket}>
																<Button type="button" variant="ghost" title="Detalhes" className="text-yellow-600 p-2">
																	<IconComponent name="Eye" className="w-4 h-4" />
																</Button>
															</DialogTicketComment>
															<DialogTicketEdit ticket={ticket} />
															<DialogTicketConfirmDelete ticket={ticket} />
														</div>
													</div>
												</AccordionContent>
											</AccordionItem>
										))
									)}
								</Accordion>
							) : (
								<div>
									<Table ref={ref} className="min-w-full h-full">
										<TableHeader>
											<TableRow>
												<TableHead className="w-1/12 px-2 py-2 text-xs sm:text-sm">ID</TableHead>
												<TableHead className="w-1/12 px-2 py-2 text-xs sm:text-sm">Status</TableHead>
												<TableHead className="w-5/12 px-2 py-2 text-xs sm:text-sm">Título</TableHead>
												<TableHead className="w-3/12 px-2 py-2 text-xs sm:text-sm">Última atualização</TableHead>
												<TableHead className="w-2/12 px-2 py-2 text-xs sm:text-sm"></TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{data.docs.length === 0 ? (
												<TableRow>
													<TableCell colSpan={5} className="text-center py-4">
														<p className="text-center max-sm:py-4">{message}</p>
													</TableCell>
												</TableRow>
											) : (
												data.docs.map((ticket: ITicket) => (
													<TableRow key={ticket._id}>
														<TableCell className="px-2 py-2 text-xs sm:text-sm">
															<TooltipProvider>
																<Tooltip>
																	<TooltipTrigger asChild>
																		<div className="flex gap-1">
																			<span>{ticket._id?.slice(0, 3)}...</span>
																			<IconComponent name="Info" className="w-4 h-4 text-accent" />
																		</div>
																	</TooltipTrigger>
																	<TooltipContent>
																		<p>{ticket._id}</p>
																	</TooltipContent>
																</Tooltip>
															</TooltipProvider>
														</TableCell>
														<TableCell className="px-2 py-2 text-xs sm:text-sm">
															<Badge
																variant={styleStatusVariant(ticket.status as Exclude<StatusEnum, StatusEnum.ALL>)}
																className="min-w-24 h-fit w-24 items-center justify-center flex px-0"
															>
																<DropdownUpdateStatusComponent ticket={ticket} />
															</Badge>
														</TableCell>
														<TableCell className="px-2 py-2 text-xs sm:text-sm">
															<DialogTicketComment ticket={ticket}>{ticket.title}</DialogTicketComment>
														</TableCell>
														<TableCell className="px-2 py-2 text-xs sm:text-sm">
															{pipeDateTimeLabel(ticket.updatedAt as StatusEnum)}
														</TableCell>
														<TableCell className="px-2 py-2 text-xs sm:text-sm">
															<div className="flex gap-2 sm:gap-4 items-center justify-end">
																<DialogTicketComment ticket={ticket}>
																	<Button type="button" variant="ghost" title="Detalhes" className="text-yellow-600 p-2">
																		<IconComponent name="Eye" className="w-4 h-4" />
																	</Button>
																</DialogTicketComment>
																<DialogTicketEdit ticket={ticket} />
																<DialogTicketConfirmDelete ticket={ticket} />
															</div>
														</TableCell>
													</TableRow>
												))
											)}
										</TableBody>
									</Table>
								</div>
							)}
						</SectionComponent>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

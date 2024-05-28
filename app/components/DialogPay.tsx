'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { mercadopayment } from '../lib/actions';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect } from 'react';

export function DialogPay() {
	useEffect(() => {
		initMercadoPago(process.env.MERCADO_PUBLIC_KEY!, {
			locale: 'es-AR',
		});
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Comprar consultas</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Comprar consultas</DialogTitle>
					<DialogDescription>comprar mas consultas</DialogDescription>
				</DialogHeader>
				<form action={mercadopayment} className="flex flex-col gap-8">
					<Select name="cantidad" required>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Selecciona una cantidad" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="1000">
									$1000 - 30 consultas
								</SelectItem>
								<SelectItem value="2000">
									$2000 - 60 consultas
								</SelectItem>
								<SelectItem value="5000">
									$5000 - 200 consultas
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					<Button type="submit">Ir a mercadopago</Button>
					<div id="wallet_container"></div>
				</form>

				<Wallet
					initialization={{ preferenceId: 'consultas' }}
					customization={{ texts: { valueProp: 'smart_option' } }}
				/>

				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

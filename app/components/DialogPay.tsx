'use client';
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
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { uuid } from 'uuidv4';

import { mercadopayment } from '../lib/actions';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';
import { headers } from 'next/headers';

export function DialogPay() {
	const [preferenceId, setPreferenceId] = useState<null | string>(null);
	useEffect(() => {
		initMercadoPago(process.env.MERCADO_PUBLIC_KEY!, {
			locale: 'es-AR',
		});
	}, []);

	const createPreference = async () => {
		try {
			const idempotencyKey = uuid();

			const response = await axios.post(
				'',
				{
					title: 'compra consultas',
					cantidad: 1,
					precio: 3000,
					description:
						'Dispositivo de tienda móvil de comercio electrónico',
					imagen: '/public/vercel.svg',
				},
				{
					headers: {
						'X-Idempotency-Key': idempotencyKey,
					},
				}
			);

			const { id } = response.data;
			return id;
		} catch (error) {
			console.log('Error ejecutando post' + error);
		}
	};

	const handleClick = async () => {
		const id: string = await createPreference();
		if (id) setPreferenceId(id);
	};

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

					<Button type="submit" onClick={handleClick}>
						Ir a mercadopago
					</Button>
				</form>
				{preferenceId && (
					<Wallet
						initialization={{ preferenceId: preferenceId }}
						customization={{ texts: { valueProp: 'smart_option' } }}
					/>
				)}

				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

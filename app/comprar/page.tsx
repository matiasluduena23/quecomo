import React from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { redirect } from 'next/navigation';

const client = new MercadoPagoConfig({
	accessToken: process.env.MERCADO_ACCESS_TOKEN!,
	options: {
		integratorId: process.env.MERCADO_INTEGRATOR_ID,
	},
});

export default function page() {
	async function payment(formData: FormData) {
		'use server';
		const preference = await new Preference(client).create({
			body: {
				items: [
					{
						id: '1234',
						title: 'celular',
						quantity: 1,
						unit_price: 5000,
						description:
							'Dispositivo de tienda móvil de comercio electrónico',
						picture_url: '/cellphone.jpg',
					},
				],
				payment_methods: {
					excluded_payment_methods: [
						{
							id: 'visa',
						},
					],
					installments: 6,
				},
				back_urls: {
					success:
						'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
					pending:
						'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
					failure:
						'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
				},
				auto_return: 'approved',
				external_reference: 'matiaslredes@gmail.com',
			},
		});

		redirect(preference.sandbox_init_point!);
	}
	return (
		<div className="container mx-auto max-w-md mt-[7rem]">
			<form action={payment} className="flex flex-col gap-8 ">
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
			</form>
		</div>
	);
}

'use server';
import { revalidatePath } from 'next/cache';
import prisma from './db';
import { MercadoPagoConfig, PaymentMethod, Preference } from 'mercadopago';
import image from '@/public/vercel.svg';

export async function updateUser(user: User) {
	try {
		if (user.consultas) {
			await prisma.user.update({
				where: {
					email: user.email,
				},
				data: {
					consultas: user.consultas - 1,
				},
			});
		}
	} catch (error) {
		console.log(
			'Something went wrong saving your data on database ' + error
		);
	} finally {
		revalidatePath('/chat');
	}
}

// SDK de Mercado Pago
// Agrega credenciales
const client = new MercadoPagoConfig({
	accessToken: process.env.MERCADO_ACCESS_TOKEN!,
	options: {
		integratorId: process.env.MERCADO_INTEGRATOR_ID!,
	},
});

export async function mercadopayment(formData: FormData) {
	const preference = new Preference(client);

	const cantidad = Number(formData.get('cantidad'));

	preference
		.create({
			body: {
				items: [
					{
						title: 'compra consultas',
						quantity: 1,
						unit_price: 3000,
						id: '1234',
						description:
							'Dispositivo de tienda móvil de comercio electrónico',
						picture_url: '/public/vercel.svg',
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
					success: '',
					failure: '',
					pending: '',
				},
			},
		})

		.then((data) => data.id);
}

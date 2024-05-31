'use server';
import { revalidatePath } from 'next/cache';
import prisma from './db';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import image from '@/public/vercel.svg';
import { redirect } from 'next/navigation';

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

export async function mercadopayment(formData: FormData) {
	const client = new MercadoPagoConfig({
		accessToken: process.env.MERCADO_ACCESS_TOKEN!,
	});

	try {
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
					},
				],
			},
		});
		console.log('preference: ' + preference);

		redirect(preference.sandbox_init_point!);
	} catch (error) {
		console.log('Error in the server' + error);
	}
}

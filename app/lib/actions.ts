'use server';
import { revalidatePath } from 'next/cache';
import prisma from './db';
import { MercadoPagoConfig, Preference } from 'mercadopago';

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
						unit_price: cantidad,
						id: cantidad.toString(),
					},
				],
			},
		})

		.then((data) => data.id);
}

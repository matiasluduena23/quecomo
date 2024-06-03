'use server';
import { revalidatePath } from 'next/cache';
import prisma from './db';
import { redirect } from 'next/navigation';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

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

const client = new MercadoPagoConfig({
	accessToken: process.env.MERCADO_ACCESS_TOKEN!,
	options: {
		integratorId: process.env.MERCADO_INTEGRATOR_ID,
		idempotencyKey: uuidv4(),
	},
});

export type State = {
	message: string | null;
};

export async function mercadopayment(
	prevState: State,
	formData: FormData
): Promise<State> {
	const formSchema = z.object({
		cantidad: z.coerce.number().gt(0),
	});

	const cantidad = Number(formData.get('cantidad'));
	const validateField = formSchema.safeParse({ cantidad });

	if (!validateField.success) {
		return { message: 'Seleccione una opcion' };
	}

	const preference = await new Preference(client).create({
		body: {
			items: [
				{
					id: uuidv4(),
					title: 'consultas',
					quantity: 1,
					unit_price: cantidad,
					description: 'Carga de ' + cantidad + ' consultas',
					currency_id: 'ARS',
				},
			],
			back_urls: {
				success:
					'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
				pending:
					'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
				failure:
					'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
			},
			auto_return: 'approved',
		},
	});

	redirect(preference.sandbox_init_point!);
}

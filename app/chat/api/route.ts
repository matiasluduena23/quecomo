import { MercadoPagoConfig, PaymentMethod, Preference } from 'mercadopago';
import { headers } from 'next/headers';

// SDK de Mercado Pago
// Agrega credenciales
const client = new MercadoPagoConfig({
	accessToken: process.env.MERCADO_ACCESS_TOKEN!,
	options: {
		integratorId: process.env.MERCADO_INTEGRATOR_ID!,
	},
});

export async function POST(req: Request) {
	const { title, cantidad, precio, description, image } = await req.json();
	const headersList = headers();
	const idempotencyKey = headersList.get('x-idempotency-key')!;
	try {
		const body = {
			items: [
				{
					title: title,
					quantity: Number(cantidad),
					unit_price: Number(precio),
					id: '1234',
					description: description,
					picture_url: image,
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
				success: 'https://axios-http.com/es/docs/example',
				failure: 'https://axios-http.com/es/docs/example',
				pending: 'https://axios-http.com/es/docs/example',
			},
		};

		const preference = new Preference(client);
		const result = await preference.create({
			body,
			requestOptions: { idempotencyKey: idempotencyKey },
		});

		return Response.json({ id: result.id });
	} catch (error) {
		console.log('Error in the server' + error);
		return new Response('Error ', { status: 500 });
	}
}

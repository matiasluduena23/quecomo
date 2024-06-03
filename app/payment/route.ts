'use server';

import { Payment } from 'mercadopago';
import { NextRequest } from 'next/server';
import { client } from '../lib/utils';

export async function POST(req: NextRequest) {
	const body = await req
		.json()
		.then((data) => data as { data: { id: string } });

	const payment = await new Payment(client).get({ id: body.data.id });

	console.log(payment.transaction_amount);
	if (payment.status === 'approved') {
		//save data
		let consultas = 0;

		switch (payment.transaction_amount) {
			case 1000: {
				consultas = 30;
				break;
			}
			case 2000: {
				consultas = 50;
				break;
			}
			case 5000: {
				consultas = 200;
				break;
			}
			default:
				break;
		}
	}

	return Response.json({ success: true });
}

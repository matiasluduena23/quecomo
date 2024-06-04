'use server';

import { Payment } from 'mercadopago';
import { NextRequest } from 'next/server';
import { checkHash, client } from '../lib/utils';
import { addConsultas } from '../lib/actions';

export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const searchParams = new URLSearchParams(url.search);
	const dataID = searchParams.get('data.id')!;
	const xSignature = req.headers.get('x-signature')!;
	const xRequestId = req.headers.get('x-request-id')!;

	if (!checkHash(xSignature, xRequestId, dataID)) {
		return Response.json({ success: false }, { status: 401 });
	}

	const body = await req
		.json()
		.then((data) => data as { data: { id: string } });
	const payment = await new Payment(client).get({ id: body.data.id });

	if (payment.status === 'approved') {
		const email = payment.additional_info?.items![0].description!;

		switch (payment.transaction_amount) {
			case 1000: {
				await addConsultas(email, 30);
				break;
			}
			case 2000: {
				await addConsultas(email, 70);
				break;
			}
			case 5000: {
				await addConsultas(email, 300);
				break;
			}
			default:
				break;
		}
	}

	return Response.json({ success: true });
}

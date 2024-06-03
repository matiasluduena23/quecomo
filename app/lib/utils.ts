import MercadoPagoConfig from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';

export const client = new MercadoPagoConfig({
	accessToken: process.env.MERCADO_ACCESS_TOKEN!,
	options: {
		integratorId: process.env.MERCADO_INTEGRATOR_ID,
		idempotencyKey: uuidv4(),
	},
});

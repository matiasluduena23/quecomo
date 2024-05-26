'use server';
import prisma from './db';

export async function updateUser(user: User) {
	if (user.consultas) {
		return await prisma.user.update({
			where: {
				email: user.email,
			},
			data: {
				consultas: user.consultas - 1,
			},
		});
	} else {
		throw new Error('something went wrong');
	}
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.upsert({
		where: {
			email: 'matias@gmail.com',
		},
		update: {},
		create: {
			email: 'matias@gmail.com',
			name: 'Matias Luduena',
		},
	});
	console.log(user);
}

main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

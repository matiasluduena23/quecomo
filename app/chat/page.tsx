import { auth } from '@/auth';
import Chat from '../components/Chat';
import Image from 'next/image';
import prisma from '../lib/db';
import { DialogPay } from '../components/DialogPay';
import { UserCardPopOver } from '../components/UserCard';

export default async function page() {
	const session = await auth();

	if (!session) return null;
	const email = session.user?.email ? session.user?.email : undefined;

	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	return (
		<main>
			<div className="container mx-auto relative">
				<nav className="flex justify-end py-4">
					{user && <UserCardPopOver user={user} />}
				</nav>

				<h1 className="text-center text-4xl uppercase">Chat Page</h1>
				{user && <Chat user={user} />}
			</div>
		</main>
	);
}

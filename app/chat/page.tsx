import { auth } from '@/auth';
import Chat from '../components/Chat';
import Image from 'next/image';
import prisma from '../lib/db';
import { DialogPay } from '../components/DialogPay';

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
			<div className="container mx-auto">
				<div className="flex flex-col items-end gap-2">
					{user?.avatar && (
						<Image
							src={user.avatar}
							alt="user image"
							width={60}
							height={60}
							className="rounded-full w-[80px] h-[80px] "
						/>
					)}
					<p>{user?.name}</p>
					<p>{email}</p>
					<p>consultas disponibles: {user?.consultas}</p>
					<DialogPay email={user?.email!} />
				</div>

				<h1 className="text-center text-4xl uppercase">Chat Page</h1>
				{user && <Chat user={user} />}
			</div>
		</main>
	);
}

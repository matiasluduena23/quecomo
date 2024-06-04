import { auth } from '@/auth';
import Chat from '../components/Chat';
import Image from 'next/image';
import prisma from '../lib/db';
import { DialogPay } from '../components/DialogPay';

export default async function page() {
	const session = await auth();

	if (!session) return null;
	const email = session.user?.email ? session.user?.email : undefined;

	const userData = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	return (
		<main>
			<div className="container mx-auto">
				<div className="flex flex-col items-end gap-2">
					{userData?.avatar && (
						<Image
							src={userData.avatar}
							alt="user image"
							width={60}
							height={60}
							className="rounded-full w-[80px] h-[80px] "
						/>
					)}
					<p>{session?.user?.name}</p>
					<p>{session?.user?.email}</p>
					<p>consultas disponibles: {userData?.consultas}</p>
					<DialogPay email={userData?.email!} />
				</div>

				<h1 className="text-center text-4xl uppercase">Chat Page</h1>
				{userData && <Chat user={userData} />}
			</div>
		</main>
	);
}

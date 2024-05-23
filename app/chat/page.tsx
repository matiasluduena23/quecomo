import { auth } from '@/auth';
import Chat from '../components/Chat';
import Image from 'next/image';

export default async function page() {
	const session = await auth();

	if (!session) return null;

	return (
		<main>
			<div className="container mx-auto">
				<div className="flex flex-col items-end gap-2">
					{session.user?.image && (
						<Image
							src={session.user.image}
							alt="user image"
							width={60}
							height={60}
							className="rounded-full w-[80px] h-[80px] "
						/>
					)}
					<p>{session?.user?.name}</p>
					<p>{session?.user?.email}</p>
				</div>

				<h1 className="text-center text-4xl uppercase">Chat Page</h1>
				<Chat />
			</div>
		</main>
	);
}

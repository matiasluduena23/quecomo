import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { MenuIcon } from 'lucide-react';
import { DialogPay } from './DialogPay';
import { SignOut } from './signOut';

export function UserCardPopOver({ user }: { user: User }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Image
					src={user.avatar!}
					alt="user image"
					width={50}
					height={50}
					className="rounded-full hover:opacity-90 cursor-pointer "
				/>
			</PopoverTrigger>
			<PopoverContent className="w-70 mr-8">
				<div className="flex flex-col items-end gap-2">
					<p className="capitalize">{user?.name}</p>
					<p>{user.email}</p>
					<p>consultas disponibles: {user?.consultas}</p>
					<DialogPay email={user?.email!} />
					<SignOut />
				</div>
			</PopoverContent>
		</Popover>
	);
}

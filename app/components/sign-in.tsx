import { signIn } from '@/auth';

export function SignIn() {
	return (
		<form
			action={async () => {
				'use server';
				await signIn('google', { redirectTo: '/chat' });
			}}
			className="mx-auto"
		>
			<button
				type="submit"
				className="border border-gray-100 p-2 rounded-md"
			>
				Signin with Google
			</button>
		</form>
	);
}

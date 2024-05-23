import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import prisma from './app/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	callbacks: {
		async signIn({ account, profile }) {
			if (!profile?.email) {
				throw new Error('No profile');
			}

			const userName = profile.name ? profile.name : '';
			await prisma.user.upsert({
				where: {
					email: profile.email,
				},
				update: {},
				create: {
					email: profile.email,
					name: userName,
					consultas: 20,
				},
			});
			return true;
		},
	},
});

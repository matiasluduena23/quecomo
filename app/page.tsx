import Chat from './components/Chat';
import { SignIn } from './components/sign-in';

export default function Home() {
	return (
		<main>
			<div className="container mx-auto">
				<h1 className="text-center text-4xl mt-[7rem]">Que como</h1>
				<div className="flex items-center justify-center mt-[10rem] ">
					<SignIn />
				</div>
			</div>
		</main>
	);
}

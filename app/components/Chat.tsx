'use client';

import { useChat } from 'ai/react';
import { updateUser } from '../lib/actions';
import { FormEvent, useState } from 'react';

export default function Chat({ user }: { user: User }) {
	const { messages, input, handleInputChange, handleSubmit } = useChat();
	const [consultas, setConsultas] = useState(user.consultas);
	const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		update();
		handleSubmit(e);
	};

	async function update() {
		const update = await updateUser(user);
		setConsultas(update.consultas);
	}

	return (
		<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch text-white">
			<p>consultas: {consultas}</p>
			{messages.map((m) => (
				<div key={m.id} className="whitespace-pre-wrap">
					{m.role === 'user' ? 'User: ' : 'AI: '}
					{m.content}
				</div>
			))}

			<form onSubmit={onSubmitForm}>
				<input
					className="fixed bottom-0 w-full max-w-md p-2 mb-8 border  text-black border-gray-300 rounded shadow-xl"
					value={input}
					placeholder="Say something..."
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}

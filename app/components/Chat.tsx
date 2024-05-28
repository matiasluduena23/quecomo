'use client';

import { useChat } from 'ai/react';
import { updateUser } from '../lib/actions';
import { FormEvent, useOptimistic, useState } from 'react';
import { DialogPay } from './DialogPay';

export default function Chat({ user }: { user: User }) {
	const { isLoading, messages, input, handleInputChange, handleSubmit } =
		useChat();
	const [open, setOpen] = useState(true);
	const [optimisticConsultas, addOptimisticConsultas] = useOptimistic(
		user,
		(state, consulta: number) => {
			return { ...state, consultas: consulta };
		}
	);

	const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		addOptimisticConsultas(optimisticConsultas.consultas! - 1);
		handleSubmit(e);
		update();
	};

	async function update() {
		await updateUser(user);
	}

	return (
		<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch ">
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
					placeholder={
						optimisticConsultas.consultas === 0
							? 'Carga consultas para empezar a cocinar'
							: 'Que ingredintes tienes ?'
					}
					onChange={handleInputChange}
					disabled={optimisticConsultas.consultas === 0}
				/>
			</form>

			{user.consultas === 0 && <DialogPay />}
		</div>
	);
}

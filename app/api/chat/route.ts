import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

export async function POST(req: Request) {
	const { messages } = await req.json();

	const result = await streamText({
		model: openai('gpt-3.5-turbo'),
		system:
			'ayuda con recetas' +
			'responder al usuario con una lista' +
			'con las mejores recetas con los ingredientes que te indica' +
			'al final de la lista preguntar si quiere los pasos de alguna de las recetas',
		messages,
	});

	return new StreamingTextResponse(result.toAIStream());
}

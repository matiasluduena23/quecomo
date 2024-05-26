import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

export async function POST(req: Request) {
	const { messages } = await req.json();

	const result = await streamText({
		model: openai('gpt-3.5-turbo'),
		system:
			'ayuda con recetas' +
			'respondes al usuario con una lista' +
			'con las mejores recetas con los ingredientes que te indica',
		messages,
	});

	return new StreamingTextResponse(result.toAIStream());
}

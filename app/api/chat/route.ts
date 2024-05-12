import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

export async function POST(req: Request) {
	const { messages } = await req.json();

	const result = await streamText({
		model: openai('gpt-3.5-turbo'),
		system:
			'You help with recipes' +
			'Respond to the users with a list' +
			'of the best recipes to cook with their ingredients',
		messages,
	});

	return new StreamingTextResponse(result.toAIStream());
}

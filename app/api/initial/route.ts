import { openai } from "@ai-sdk/openai";
import { Message, StreamingTextResponse, streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const messageLength = (messages as Message[]).filter(
    (item: { role: string; content: string }) => item.role === "user"
  ).length;

  const result = await streamText({
    model: openai("gpt-4o"),
    system:
      "saluda al usuario por su nombre y solo hazle una pregunta, consulta si tiene alguna dieta particular, condimentos o ingredientes que prefieras evitar para tener en cuenta al enviarle recetas" +
      "luego que te envie la dieta,  dile que vas a tener en cuenta su dieta y envia el mensaje  Empecemos a cocinar!",
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
}

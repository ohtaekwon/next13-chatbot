import openAiApis from "@/lib/modules/openAi.api";
import {
  ChatGPTMessage,
  OpenAIStreamPayload,
} from "@/lib/types/openai-stream.types";
import MessageValidators from "@/lib/validators/messages.validator";
import chatbotConstant from "@/utils/constants/chatbot-prompt.constant";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const parseMessages = MessageValidators.MessageArraySchema.parse(messages);

  const outBoundMessages: ChatGPTMessage[] = parseMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

  outBoundMessages.unshift({
    role: "system",
    content: chatbotConstant.chatbotPrompt,
  });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: outBoundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await openAiApis.openAIStream(payload);

  return new Response(stream);
}

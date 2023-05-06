import { z } from "zod";

const MessageSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(),
  text: z.string(),
});

const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;

export default { MessageSchema, MessageArraySchema };

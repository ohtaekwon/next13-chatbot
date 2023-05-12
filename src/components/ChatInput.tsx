import React from "react";
import helpers from "@/lib/utils/helpers";
import TextAreaAutoSize from "react-textarea-autosize";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { Message } from "@/lib/validators/messages.validator";
import { messageApiRoutes } from "@/lib/modules/messages.api";
import MsgContext from "@/components/context/Messages";
import { toast } from "react-hot-toast";
import { CornerDownLeft, Loader2 } from "lucide-react";

interface ChatInputProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatInput: React.FC<ChatInputProps> = ({ className, ...props }) => {
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = React.useContext(MsgContext.MessagesContext);

  const [input, setInput] = React.useState<string>("");
  const textareaRef = React.useRef<null | HTMLTextAreaElement>(null);

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (message: Message) => {
      const response = await fetch(messageApiRoutes.message, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [message] }),
      });

      return response.body;
    },
    onMutate: async (variables) => {
      addMessage(variables);
    },
    onSuccess: async (data, variables, context) => {
      if (!data) throw new Error("스트림을 찾지 못했습니다.");

      // construct new message to add
      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };
      // add new message to state
      addMessage(responseMessage);
      setIsMessageUpdating(true);

      const reader = data.getReader();
      const decoder = new TextDecoder();

      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
        console.log(chunkValue);
      }
      // clean-up
      setIsMessageUpdating(false);
      setInput("");

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
    onError: (_, variables) => {
      toast.error("문제가 발생하였습니다. 다시 시도해주세요");
      removeMessage(variables.id);
      textareaRef.current?.focus();
    },
  });

  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const message: Message = {
        id: nanoid(),
        isUserMessage: true,
        text: input,
      };

      sendMessage(message);
    }
  };
  return (
    <div
      {...props}
      className={helpers.cn("border-t border-zinc-300", className)}
    >
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextAreaAutoSize
          ref={textareaRef}
          disabled={isLoading}
          rows={2}
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onEnter}
          autoFocus
          placeholder="메시지를 작성해주세요"
          className="peer block w-full resize-none border-0 bg-zinc-100 py-1.5 pr-14 text-sm text-gray-900 focus:ring-0 disabled:opacity-50 sm:leading-6"
        />

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 bg-white px-1 font-sans text-xs text-gray-400">
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <CornerDownLeft className="h-3 w-3" />
            )}
          </kbd>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
export default ChatInput;

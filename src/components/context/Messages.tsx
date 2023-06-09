import React from "react";

import { Message } from "@/lib/validators/messages.validator";
import { nanoid } from "nanoid";

const MessagesContext = React.createContext<{
  messages: Message[];
  isMessageUpdating: boolean;
  addMessage: (message: Message) => void;
  removeMessage: (messageId: string) => void;
  updateMessage: (
    messageId: string,
    updateFn: (prevText: string) => string
  ) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

function MessageProvider({ children }: { children: React.ReactNode }) {
  const [isMessageUpdating, setIsMessageUpdating] =
    React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: nanoid(),
      text: "뭐? 도와줘?",
      isUserMessage: false,
    },
  ]);

  console.log(messages)
  const addMessage = (message: Message) => {
    setMessages((allMessages) => [...allMessages, message]);
  };

  const removeMessage = (messageId: string) => {
    setMessages((allMessages) =>
      allMessages.filter((message, index) => message.id !== messageId)
    );
  };

  const updateMessage = (
    messageId: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((allMessages) =>
      allMessages.map((message, index) => {
        if (message.id === messageId) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      })
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export default { MessagesContext, MessageProvider };

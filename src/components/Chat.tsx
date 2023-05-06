"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/Accordion";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

interface ChatProps {}

const Chat: React.FC<ChatProps> = ({}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="relative z-40 bg-white shadow"
    >
      <AccordionItem value="item-1">
        <div className="overflow:hidden fixed bottom-8 right-8 w-80 rounded-md border border-gray-200 bg-white">
          <div className="flex h-full w-full flex-col">
            <AccordionTrigger className="border-b border-zinc-300 px-6">
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex h-80 flex-col">
                <ChatInput className="px-4" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};
export default Chat;

"use client";
import React from "react";
import { Accordion, AccordionTrigger } from "./ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import ChatHeader from "./ChatHeader";

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
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};
export default Chat;

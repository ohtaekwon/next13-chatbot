import React from "react";

interface ChatHeaderProps {}

const ChatHeader: React.FC<ChatHeaderProps> = () => {
  return (
    <div className="item-center flex w-full justify-start gap-3 text-zinc-800">
      <div className="flex flex-col items-start text-sm">
        <p className="text-xs">Chat with</p>
        <div className="flex items-center gap-1.5">
          <p className="h-2 w-2 rounded-full bg-lime-500" />
          <p className="font-medium	">챗봇 지원중..</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

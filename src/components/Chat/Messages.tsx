import React from "react";
import ChatBubble from "./ChatBubble";

export const Messages: React.FC = () => {
  return (
    <div className="flex-grow bg-base-300">
      <ChatBubble />{" "}
    </div>
  );
};

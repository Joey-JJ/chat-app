import React from "react";
import ChatBubble from "./ChatBubble";

export const Messages: React.FC = () => {
  return (
    <div className="flex max-h-[calc(100vh-128px)] flex-col overflow-scroll bg-base-300">
      <ChatBubble text={"Hello, this is a message."} own={false} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
      <ChatBubble text={"Hello, this is another message."} own={true} />
    </div>
  );
};

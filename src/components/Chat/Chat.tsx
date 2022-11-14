import React from "react";
import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";

const Chat: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col">
      <Messages />
      <ChatForm />
    </div>
  );
};

export default Chat;

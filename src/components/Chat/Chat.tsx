import React from "react";
import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";

interface Props {
  session: any;
}

const Chat: React.FC<Props> = ({ session }) => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col">
      <Messages session={session} />
      <ChatForm session={session} />
    </div>
  );
};

export default Chat;

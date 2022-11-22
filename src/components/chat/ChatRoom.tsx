import React from "react";
import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";

interface Props {
  session: any;
  username: string;
}

const ChatRoom: React.FC<Props> = ({ session, username }) => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col">
      <Messages session={session} />
      <ChatForm session={session} username={username} />
    </div>
  );
};

export default ChatRoom;

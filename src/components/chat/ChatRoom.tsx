import React from "react";
import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";

interface Props {
  session: any;
  username: string;
}

const ChatRoom: React.FC<Props> = ({ session, username }) => {
  return (
    <>
      <Messages session={session} />
      <ChatForm session={session} username={username} />
    </>
  );
};

export default ChatRoom;

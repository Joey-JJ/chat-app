import React from "react";
import { ChatForm } from "./ChatForm";
import { Messages } from "./Messages";
import type { Session } from "@supabase/supabase-js";
interface Props {
  session: Session | null;
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

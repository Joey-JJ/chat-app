import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import ChatBubble from "./ChatBubble";

interface Props {
  session: any;
}

export const Messages: React.FC<Props> = ({ session }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true })
      .then((res) => {
        setMessages(res.data as any);
      });
    setLoading(false);
  }, []);

  supabase
    .channel("public:messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        setMessages((messages) => [...messages, payload.new]);
      }
    )
    .subscribe();

  return (
    <div className="flex h-[calc(100vh-128px)] flex-col overflow-scroll bg-base-300">
      {loading && <div className="mt-4 text-center">Loading...</div>}
      {!loading && messages.length === 0 && (
        <div className="mt-4 text-center">No messages yet</div>
      )}
      {messages.length > 0 &&
        !loading &&
        messages.map((message) => (
          <ChatBubble
            key={message.id}
            text={message.message}
            own={message.senderId === session.user.id}
          />
        ))}
      <div className="focus" />
    </div>
  );
};

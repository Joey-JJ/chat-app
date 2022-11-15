import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import ChatBubble from "./ChatBubble";

export const Messages: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("messages")
      .select("*")
      .then((res) => {
        setMessages(res.data as any);
      });
    setLoading(false);
  }, []);

  return (
    <div className="flex h-[calc(100vh-128px)] flex-col overflow-scroll bg-base-300">
      {loading && <div className="mt-4 text-center">Loading...</div>}
      {!loading && messages.length === 0 && (
        <div className="mt-4 text-center">No messages yet</div>
      )}
      {messages.length > 0 &&
        !loading &&
        messages.map((message) => (
          <ChatBubble key={message.id} text={message.message} own={false} />
        ))}
    </div>
  );
};

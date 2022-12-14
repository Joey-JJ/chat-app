import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../utils/supabaseClient";
import ChatBubble from "./ChatBubble";

import { toast } from "react-toastify";
import type { Session } from "@supabase/supabase-js";
interface Props {
  session: Session | null;
}

export const Messages: React.FC<Props> = ({ session }) => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if ("Notification" in window) Notification.requestPermission();

    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        setLoading(false);
        setError(true);
        toast.error("An error occured, please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        throw error;
      }

      if (!error) setMessages(data as any);

      setLoading(false);
    };

    fetchMessages();

    supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((messages) => [...messages, payload.new]);
          if (
            "Notification" in window &&
            document.visibilityState === "hidden" &&
            Notification.permission === "granted"
          ) {
            new Notification("New message(s)", {
              body: "You have new message(s)",
              tag: "new-message",
            });
          }
        }
      )
      .subscribe();
  }, []);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    (messagesEndRef as any).current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex grow flex-col overflow-scroll bg-base-300">
      {error && <div className="mt-4 text-center">Could not load messages</div>}

      {loading && <div className="mt-4 text-center">Loading...</div>}
      {!loading && !error && messages.length === 0 && (
        <div className="mt-4 text-center">No messages yet</div>
      )}
      {messages.length > 0 &&
        !loading &&
        messages.map((message) => (
          <ChatBubble
            key={message.id}
            username={message.username}
            text={message.message}
            own={message.senderId === session?.user.id}
          />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

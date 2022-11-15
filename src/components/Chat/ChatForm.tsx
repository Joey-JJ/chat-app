import React, { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

interface Props {
  session: any;
}

export const ChatForm: React.FC<Props> = ({ session }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const { error } = await supabase
      .from("messages")
      .insert({ message, senderId: session.user.id });
    if (error) throw error;

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-16 flex items-center justify-center gap-5"
    >
      <input
        type="text"
        placeholder="Type here"
        className="input-bordered input-accent input input-sm w-full max-w-xs"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn-accent btn-sm btn">Send</button>
    </form>
  );
};

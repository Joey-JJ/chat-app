import React, { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { toast } from "react-toastify";

interface Props {
  session: any;
  username: string;
}

export const ChatForm: React.FC<Props> = ({ session, username }) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (message.trim().length === 0) {
      setMessage("");
      return;
    }

    const { error } = await supabase
      .from("messages")
      .insert({ message, senderId: session.user.id, username });

    if (error) {
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

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-16 grow-0 flex items-center justify-center gap-5"
    >
      <input
        type="text"
        placeholder="Type here"
        className="input-bordered input-primary input input-sm w-full max-w-xs"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn-primary btn-sm btn">Send</button>
    </form>
  );
};

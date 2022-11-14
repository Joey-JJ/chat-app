import React, { useState } from "react";

export const ChatForm: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
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

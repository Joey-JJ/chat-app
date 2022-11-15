import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

interface Props {
  session: any;
}

export const ChatForm: React.FC<Props> = ({ session }) => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let timer: any;
    if (error) {
      timer = setTimeout(() => {
        setError(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (message.trim().length === 0) {
      setMessage("");
      return;
    }

    const { error } = await supabase
      .from("messages")
      .insert({ message, senderId: session.user.id });

    if (error) {
      setError(true);
    }

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-16 flex items-center justify-center gap-5"
    >
      {error && (
        <div className="toast-end toast toast-top mt-16">
          <div className="alert alert-error">
            <div>
              <span>Message failed to deliver, please try again.</span>
            </div>
          </div>
        </div>
      )}

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

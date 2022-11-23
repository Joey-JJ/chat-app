import React, { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import Auth from "./components/auth/Auth";
import Navbar from "./components/layout/Navbar";
import ChatRoom from "./components/chat/ChatRoom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as any);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as any);
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    const checkForUsername = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", ((session as any).user as any).id)
        .single();

      if (error) throw error;
      if (!data.username) setOpenModal(true);
      else setUsername(data.username);
    };

    if (session) {
      checkForUsername();
    }
  }, [session]);

  if (loading) return <div>Loading...</div>;

  const submitHandler = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (username.trim().length === 0 || username.trim().length > 8) {
      toast.error("Username must be between 1 and 8 characters.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if ((session as any).user) {
      const { error } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", ((session as any).user as any).id);

      if (error) throw error;
    }
    setOpenModal(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar session={session} />
      {session && <ChatRoom session={session} username={username} />}
      {!session && <Auth />}

      <ToastContainer />
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={openModal}
        onChange={() => setOpenModal((prev) => prev)}
      />
      <div className="modal">
        <div className="modal-box max-w-xs p-10">
          <h3 className="font-bold text-lg">You need a username to chat!</h3>
          <p className="py-4">
            Please enter a username (max 8 characters) below to start chatting.
          </p>
          <form
            onSubmit={submitHandler}
            className="modal-action place-content-center flex flex-col mx-auto gap-2"
          >
            <input
              type="text"
              placeholder="Username"
              className="input input-primary input-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="btn btn-primary btn-md" type="submit">
              Start chatting!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;

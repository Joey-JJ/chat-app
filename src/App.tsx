import React, { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import Auth from "./components/auth/Auth";
import Navbar from "./components/layout/Navbar";
import UsernameModal from "./components/layout/UsernameModal";
import ChatRoom from "./components/chat/ChatRoom";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Session } from "@supabase/supabase-js";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");

  // Retrieve user session on page load and subscribe to auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    setLoading(false);
  }, []);

  // Check if current user has a username
  useEffect(() => {
    const checkForUsername = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", ((session as any).user as any).id)
          .single();

        if (error) throw error;
        if (!data.username) setOpenModal(true);
        else setUsername(data.username);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      checkForUsername();
    }
  }, [session]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="hsl(var(--p))"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  }

  // Username modal submit handler
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
    if (session?.user) {
      const { error } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", (session?.user as any).id);

      if (error) throw error;
    }
    setOpenModal(false);
  };

  return (
    <div className="h-screen max-w-screen overflow-hidden flex flex-col">
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
      <UsernameModal
        username={username}
        submitHandler={submitHandler}
        setUsername={setUsername}
      />
    </div>
  );
};

export default App;

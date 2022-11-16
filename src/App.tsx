import React, { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import Auth from "./components/auth/Auth";
import Navbar from "./components/layout/Navbar";
import Chat from "./components/chat/Chat";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as any);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as any);
    });

    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar session={session} />
      {session ? <Chat session={session} /> : <Auth />}
      <ToastContainer />
    </>
  );
};

export default App;

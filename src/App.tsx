import React, { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import { sessionContext } from "./utils/sessionContext";
import Auth from "./components/Auth";
import Navbar from "./components/layout/Navbar";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchSession = async () => {
      const {
        data: { session: any },
      } = await supabase.auth.getSession();

      if (mounted) {
        if (session) {
          setSession(session);
        }

        setIsLoading(false);
      }
    };

    fetchSession();

    const { subscription }: any = supabase.auth.onAuthStateChange(
      (_event, session: any) => {
        setSession(session);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <sessionContext.Provider value={{ session, setSession }}>
      <Navbar />
      <div className="App">{session ? <></> : <Auth />}</div>
    </sessionContext.Provider>
  );
};

export default App;

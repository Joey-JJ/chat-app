import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <section className=" mx-auto my-20 flex max-w-sm flex-col items-center justify-center gap-5">
      <article className="px-2">
        <h1 className="mb-3 text-5xl">Sign in</h1>
        <p>
          To be able to access the chatroom, you will need to log in. Please
          enter your email below. You will receive a magic link so you can log
          in without the use of a password.
        </p>
      </article>
      <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
        <form className="card-body" onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input-bordered input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control mt-6">
            <button className={`btn-primary btn ${loading ? "disabled" : ""}`}>
              {!loading ? "Login" : "Loading..."}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;

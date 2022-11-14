import React from "react";

const Auth: React.FC = () => {
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
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              className="input-bordered input"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn-primary btn">Login</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;

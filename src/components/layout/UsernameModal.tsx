import React from "react";

interface Props {
  username: string;
  submitHandler: (e: React.FormEvent<EventTarget>) => void;
  setUsername: (username: string) => void;
}

const UsernameModal: React.FC<Props> = ({
  username,
  submitHandler,
  setUsername,
}) => {
  return (
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
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
          />
          <button className="btn btn-primary btn-md" type="submit">
            Start chatting!
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;

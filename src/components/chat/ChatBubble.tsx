import React from "react";

interface Props {
  username: string;
  text: string;
  own: boolean;
}

const ChatBubble: React.FC<Props> = ({ username, text, own }) => {
  if (!own)
    return (
      <div>
        <div className="mx-4 mt-3 w-max max-w-lg rounded-lg bg-primary p-4 text-white">
          {text}
        </div>
        <p className="ml-6 text-xs text-slate-500">{username}</p>
      </div>
    );
  else
    return (
      <div className="self-end flex flex-col">
        <div className="mx-4 mt-3 w-max max-w-lg  rounded-lg bg-primary-focus p-4 text-white">
          {text}
        </div>
        <p className="self-end mr-4 text-xs text-slate-500">Me</p>
      </div>
    );
};

export default ChatBubble;

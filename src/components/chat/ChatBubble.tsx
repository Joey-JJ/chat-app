import React from "react";

interface Props {
  username: string;
  text: string;
  own: boolean;
}

const ChatBubble: React.FC<Props> = ({ username, text, own }) => {
  return (
    <div className={`flex flex-col my-2 ${own ? "self-end" : ""}`}>
      <div
        className={`mx-4 mt-3 w-max max-w-[18rem] sm:max-w-lg rounded-lg ${
          own ? "bg-primary-focus" : "bg-primary"
        } p-4 text-white break-words`}
      >
        {text}
      </div>
      <p className={`mx-4 text-xs text-slate-500 ${own ? "self-end" : ""} `}>
        {own ? "Me" : username}
      </p>
    </div>
  );
};

export default ChatBubble;

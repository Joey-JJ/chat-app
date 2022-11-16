import React from "react";

interface Props {
  text: string;
  own: boolean;
}

const ChatBubble: React.FC<Props> = ({ text, own }) => {
  if (!own)
    return (
      <div className="mx-4 my-3 w-max max-w-lg rounded-lg bg-primary p-4 text-white">
        {text}
      </div>
    );
  else
    return (
      <div className="mx-4 my-3 w-max max-w-lg self-end rounded-lg bg-primary-focus p-4 text-white">
        {text}
      </div>
    );
};

export default ChatBubble;

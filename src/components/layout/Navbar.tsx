import React from "react";
import { BsGithub } from "react-icons/bs";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-base-100 border-b border-base-content">
      <div className="container flex justify-between items-center mx-auto">
        <a className="btn btn-ghost text-xl lowercase">Chat-app</a>

        <a
          href="https://github.com/Joey-JJ/chat-app"
          className="btn btn-ghost text-xl lowercase"
        >
          <BsGithub />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

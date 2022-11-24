import React, { useState, useEffect } from "react";
import { BsGithub } from "react-icons/bs";
import { BiLogOut, BiSun, BiMoon } from "react-icons/bi";
import { supabase } from "../../utils/supabaseClient";

interface Props {
  session: any;
}

const Navbar: React.FC<Props> = ({ session }) => {
  const html = document.getElementsByTagName("html")[0];
  const [theme, setTheme] = useState(html.getAttribute("data-theme") as string);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
      html.setAttribute("data-theme", theme);
    }
  }, [html]);

  const switchTheme = () => {
    if (theme === "light") {
      html.setAttribute("data-theme", "dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <nav className="navbar grow-0 bg-base-100">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="btn-ghost btn text-xl sm:text-4xl lowercase">
          Chat-app
        </a>
        <div className="flex items-center">
          {session && (
            <div className="tooltip tooltip-bottom" data-tip="Log out">
              <button
                className="btn-ghost btn text-2xl sm:text-4xl"
                onClick={async () => await supabase.auth.signOut()}
              >
                <BiLogOut />
              </button>
            </div>
          )}
          <div className="tooltip tooltip-bottom" data-tip="GitHub">
            <a
              href="https://github.com/Joey-JJ/chat-app"
              className="btn-ghost btn text-2xl lowercase"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub />
            </a>
          </div>
          <div className="tooltip tooltip-bottom" data-tip="Change theme">
            <button
              onClick={switchTheme}
              className="btn-ghost btn text-2xl sm:text-4xl"
            >
              {theme === "light" ? <BiMoon /> : <BiSun />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

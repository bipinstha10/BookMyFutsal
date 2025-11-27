import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Header = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
        fixed left-0 z-50 w-full h-[4.5rem] backdrop-blur-md shadow
        transition-transform duration-500 ease-in-out
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
      >
        <Navbar />
      </header>
    </>
  );
};

export default Header;

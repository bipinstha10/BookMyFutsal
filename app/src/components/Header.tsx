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
      <header className={`shadow bg-green-700 absolute left-0 right-0 z-50 w-[90vw] rounded-xl mx-auto ${hidden ? "-translate-y-full top-0" : "translate-y-0 top-4"} duration-500 ease-in-out`}>
        <Navbar />
      </header>
    </>
  );
};

export default Header;

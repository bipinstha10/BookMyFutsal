import { useState } from "react";
import { Link, NavLink } from "react-router";
import Form from "./Form";

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <header className="shadow bg-green-700 absolute top-4 left-0 right-0 z-50 w-[90vw] rounded-xl mx-auto">
        <nav className="navbar container mx-auto px-4 py-2">
          <div className="flex justify-between items-center w-full">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="font-[Teko] text-2xl">BookMyFutsal</span>
            </Link>

            {/* Navigation Links */}
            <ul className="flex space-x-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-200 font-semibold"
                      : "text-white hover:text-green-900 transition"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/futsal"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-200 font-semibold"
                      : "text-white hover:text-green-900 transition"
                  }
                >
                  Futsals
                </NavLink>
              </li>
            </ul>

            {/* Login Link */}
            <button
              onClick={() => setShowForm(true)}
              className="text-white font-[Roboto] font-bold bg-green-900 px-4 py-2 rounded hover:bg-green-800 transition"
            >
              Log in
            </button>
          </div>
        </nav>
      </header>

      {showForm && <Form onClose={() => setShowForm(false)} />}
    </>
  );
};

export default Header;

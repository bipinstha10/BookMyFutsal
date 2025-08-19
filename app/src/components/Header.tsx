import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import Form from "./Form";

const Header = () => {
  const [showForm, setShowForm] = useState(false);


  const navClass = (isActive: boolean) =>
    isActive
      ? "text-yellow-200 font-semibold"
      : "text-white hover:text-green-200 transition";

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
                  className={({ isActive }) => navClass(isActive)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/futsal"
                  className={({ isActive }) => navClass(isActive)}
                >
                  Futsals
                </NavLink>
              </li>
              <SignedIn>
              <li>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    Dashboard
                  </NavLink>
                </li>
            </SignedIn>
            </ul>

            <SignedOut>
              <span className="cusoror-pointer">
              <SignInButton />
              </span>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </header>

      {showForm && <Form onClose={() => setShowForm(false)} />}
    </>
  );
};

export default Header;

import { Link, NavLink } from "react-router";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import Form from "./Form";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);

  const navClass = (isActive: boolean) => (isActive ? "text-yellow-200 font-semibold" : "text-white hover:text-green-200 transition");

  return (
    <div>
      <nav className="navbar container mx-auto px-4 py-2">
        <div className="flex justify-between items-center w-full">
          <Link to="/" className="flex items-center">
            <span className="font-[Teko] text-2xl">BookMyFutsal</span>
          </Link>

          <ul className="flex space-x-6">
            <li>
              <NavLink to="/" className={({ isActive }) => navClass(isActive)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/futsal" className={({ isActive }) => navClass(isActive)}>
                Futsals
              </NavLink>
            </li>
            <SignedIn>
              <li>
                <NavLink to="/admin" className={({ isActive }) => navClass(isActive)}>
                  Dashboard
                </NavLink>
              </li>
            </SignedIn>
          </ul>

          <SignedOut>
            <button className="p-2 bg-[#63D0A6] text-black rounded">
              <SignInButton />
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      {showForm && <Form onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Navbar;

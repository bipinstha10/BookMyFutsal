import { Link, NavLink } from "react-router";

const Navbar = () => {
  const navClass = (isActive: boolean) => (isActive ? "text-yellow-200 font-semibold" : "text-white hover:text-green-200 transition");

  return (
    <div className="w-full h-full flex items-center">
      <nav className="w-[90vw] mx-auto flex justify-between">
        <div className="left">
          <Link to="/">
            <h1 className="font-[Teko] text-4xl">BookMyFutsal</h1>
          </Link>
        </div>
        <div className="right">
          <ul className="text-[15px] flex items-center gap-20">
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
            <li>
              <NavLink to="/admin" className={({ isActive }) => navClass(isActive)}>
                Dashboard
              </NavLink>
            </li>
            <NavLink to="/signin">
              <button className="btn bg-[#24cfa6] text-[15.4px] text-black px-6 py-2 border-0">Sign In</button>
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center px-10 py-4 shadow-md bg-white">

      {/* Logo */}
      <div className="text-2xl font-bold text-indigo-600">
        <Link to="/">Career.</Link>
      </div>

      {/* Menu - shifted slightly to the right + bigger spacing */}
      <ul className="flex gap-14 ml-44 text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-indigo-500">Home</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-indigo-500">About</Link>
        </li>
        <li>
          <Link to="/mental-health" className="hover:text-indigo-500">
            Wellness & Support
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-indigo-500">Register</Link>
        </li>
        <li>
          <Link to="/contactus" className="hover:text-indigo-500">Contact</Link>
        </li>
      </ul>

    </div>
  );
}

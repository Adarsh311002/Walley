import React from "react";
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white/10 backdrop-blur-md">
      <Link href="/" className="flex items-center justify-center">
        <Wallet className="h-6 w-6 text-white" />
        <span className="ml-2 text-2xl font-bold text-white">Walley</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          href="#"
          className="text-sm font-medium text-white hover:text-blue-600"
        >
          Contact
        </Link>
        <Link to="/signin">
          <button className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            SignIn
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

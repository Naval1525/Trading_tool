import React, { useState } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "./../assets/assets";

const Navbar = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/10 from-[40%] backdrop-blur-sm shadow-md z-50">
      <div className="flex justify-between items-center py-6 px-6 max-w-7xl mx-auto">
        <Link to="/">
          <div
            className="flex items-center"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div
              className={`
              w-12 h-12 inline-block
              transition-transform duration-500 ease-in-out
              ${isLogoHovered ? "rotate-180" : "rotate-0"}
            `}
            >
              <img
                src={assets.Logo}
                alt="Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div
              className={`
              text-white text-3xl font-normal whitespace-nowrap
              transition-all duration-500 ease-linear overflow-hidden
              ${
                isLogoHovered
                  ? "max-w-full opacity-100 ml-2"
                  : "max-w-0 opacity-0 ml-0"
              }
            `}
            >
              | Virtual Ventures
            </div>
          </div>
        </Link>

        <div className="flex items-center space-x-6 text-white">
          <Link
            to="/market"
            className="text-2xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            Market
          </Link>
          <Link
            to="/news"
            className="text-2xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            News
          </Link>
          <Link to="/profile"
            className="text-2xl font-normal tracking-wide hover:text-gray-300 transition-colors">Portfolio</Link>
          <Link to="/signup" className="hover:text-gray-300 transition-colors">
            <User size={28} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

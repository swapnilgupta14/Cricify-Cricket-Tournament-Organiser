import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-primary-light to-primary shadow-lg w-[80%] mx-auto mt-3 rounded-3xl fixed left-0 right-0 top-3">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-2">
        <div className="flex justify-between items-center h-10">
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-3xl font-bold text-white tracking-wide hover:text-gray-100 transition duration-300"
            >
              🏏 CricketApp
            </a>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#home"
              className="text-white hover:bg-white hover:text-primary px-3 py-2 rounded-lg transition duration-300"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white hover:bg-white hover:text-primary px-3 py-2 rounded-lg transition duration-300"
            >
              About
            </a>
            <a
              href="#tournaments"
              className="text-white hover:bg-white hover:text-primary px-3 py-2 rounded-lg transition duration-300"
            >
              Tournaments
            </a>
            <a
              href="#contact"
              className="text-white hover:bg-white hover:text-primary px-3 py-2 rounded-lg transition duration-300"
            >
              Contact
            </a>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white hover:bg-white hover:text-primary px-3 py-2 rounded-lg transition duration-300 focus:outline-none"
              >
                More
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-lg overflow-hidden animate-fadeIn">
                  <a
                    href="#services"
                    className="block px-4 py-2 hover:bg-primary-light hover:text-white transition duration-300"
                  >
                    Services
                  </a>
                  <a
                    href="#blog"
                    className="block px-4 py-2 hover:bg-primary-light hover:text-white transition duration-300"
                  >
                    Blog
                  </a>
                  <a
                    href="#careers"
                    className="block px-4 py-2 hover:bg-primary-light hover:text-white transition duration-300"
                  >
                    Careers
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-100 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-primary-light to-primary">
          <a
            href="#home"
            className="block px-4 py-2 text-white hover:bg-white hover:text-primary transition duration-300"
          >
            Home
          </a>
          <a
            href="#about"
            className="block px-4 py-2 text-white hover:bg-white hover:text-primary transition duration-300"
          >
            About
          </a>
          <a
            href="#tournaments"
            className="block px-4 py-2 text-white hover:bg-white hover:text-primary transition duration-300"
          >
            Tournaments
          </a>
          <a
            href="#contact"
            className="block px-4 py-2 text-white hover:bg-white hover:text-primary transition duration-300"
          >
            Contact
          </a>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block px-4 py-2 text-white hover:bg-white hover:text-primary transition duration-300 focus:outline-none"
            >
              More
            </button>
            {dropdownOpen && (
              <div className="bg-white rounded-lg shadow-lg">
                <a
                  href="#services"
                  className="block px-4 py-2 text-gray-700 hover:bg-primary-light hover:text-white transition duration-300"
                >
                  Services
                </a>
                <a
                  href="#blog"
                  className="block px-4 py-2 text-gray-700 hover:bg-primary-light hover:text-white transition duration-300"
                >
                  Blog
                </a>
                <a
                  href="#careers"
                  className="block px-4 py-2 text-gray-700 hover:bg-primary-light hover:text-white transition duration-300"
                >
                  Careers
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

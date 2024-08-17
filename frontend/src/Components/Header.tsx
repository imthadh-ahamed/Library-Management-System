import { FC, useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header: FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Function to close the dropdown when clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Effect to add event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-black text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Library Management System</h1>
        <nav className="relative inline-block text-left">
            {/* Button to toggle the dropdown */}
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center items-center rounded-full border border-gray-300 shadow-sm p-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-400"
            type="button"
            title="User Menu"
          >
            <FaUserCircle className="h-8 w-8 text-gray-700" />
          </button>

        {/* Dropdown menu */}
          {isOpen && (
            <div
            // Dropdown menu ref
              ref={dropdownRef}
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <ul
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <li className="text-gray-900 block px-4 py-2 text-sm font-semibold">
                  User Name
                </li>
                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-white"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 dark:hover:bg-red-500 hover:text-white"
                    role="menuitem"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

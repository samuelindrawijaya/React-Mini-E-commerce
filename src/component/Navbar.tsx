// src/component/Navbar.tsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { BsBag } from "react-icons/bs";
import { SidebarContext } from "../context/sideBarContext";
import useProductDataCart from "../hooks/useCartController";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const context = useContext(SidebarContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  if (context === undefined) {
    throw new Error("SomeComponent must be used within a SidebarProvider");
  }

  const { isOpen, setIsOpen } = context;
  const { itemAmount } = useProductDataCart();
  return (
    <nav
      className={`${
        isActive ? "bg-pink-200 py-3 shadow-md" : "bg-none py-5"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">My App</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-black hover:text-gray-400">
              Home
            </Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login" className="text-black hover:text-gray-400">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-black hover:text-gray-400">
                  Register
                </Link>
              </li>
              {/* /checkoutPages */}
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/categorylist"
                  className="text-black hover:text-gray-400"
                >
                  Category
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-black hover:text-gray-400"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-2xl" color="red" />
            <div className="bg-red-500 absolute right-2 bottom-2 text-[12px] w-[18px] h-[18px] text-black rounded-full justify-center items-center">
              <div>{itemAmount}</div>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

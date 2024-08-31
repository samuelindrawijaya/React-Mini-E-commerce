// src/component/Navbar.tsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsBag } from "react-icons/bs";
import { SidebarContext } from "../context/sideBarContext";
import useProductDataCart from "../hooks/useCartController";

const Navbar: React.FC = () => {
  const { isAuthenticated, fetchWithBearerToken, logout } = useAuth();
  const context = useContext(SidebarContext);
  const [isActive, setIsActive] = useState(false);
  const [img, setimg] = useState();
  const { clearCart } = useProductDataCart();
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const itemsJson = localStorage.getItem("authToken") || "";
          if (itemsJson) {
            const token = JSON.parse(itemsJson);
            await fetchWithBearerToken(
              "https://api.escuelajs.co/api/v1/auth/profile",
              token
            );

            const imgJson = localStorage.getItem("imgUser") || "";
            if (imgJson) {
              const userImg = JSON.parse(imgJson);
              setimg(userImg);
            }
          }
        } catch (error) {
          console.error("Error fetching user profile or parsing JSON:", error);
        }
      }
    };
    fetchUserProfile();
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (context === undefined) {
    throw new Error("SomeComponent must be used within a SidebarProvider");
  }


  const handleLogout = () => {
     logout();
     clearCart();
     localStorage.removeItem("imgUser");
     setimg(undefined);
  };


  const { isOpen, setIsOpen } = context;
  const { itemAmount } = useProductDataCart();

  return (
    <nav
      className={`${
        isActive ? "bg-pink-200 py-3 shadow-md" : "bg-none py-5"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">Bela Beli</div>
        <ul className="flex items-center space-x-4">
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
            </>
          ) : (
            <>
              {/* <li>
                <Link
                  to="/categorylist"
                  className="text-black hover:text-gray-400"
                >
                  Category
                </Link>
              </li> */}
              <li className="relative group">
                <img
                  src={img}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="block w-full text-center px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </li>
              <li
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex relative"
              >
                <BsBag className="text-2xl" color="red" />
                <div className="bg-red-500 absolute right-2 bottom-2 text-[12px] w-[18px] h-[18px] text-black rounded-full flex justify-center items-center">
                  <div>{itemAmount}</div>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

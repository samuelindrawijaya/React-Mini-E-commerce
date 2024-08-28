import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { SidebarContext } from "../context/sideBarContext";
import useProductDataCart from "../hooks/useCartController";
import { ProductContext } from "../context/productContext";
import CartData from "./Cartdatas";

const Sidebar = () => {
  const context = useContext(SidebarContext);
  const productContext = useContext(ProductContext);
  const navigate = useNavigate();

  if (context === undefined) {
    throw new Error("SidebarContext must be used within a SidebarProvider");
  }

  if (!productContext) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const { isOpen, handleClose,handleOpen } = context; // Ensure handleOpen is available if needed
  const { total, itemAmount, product, clearCart } = useProductDataCart();


  // Handle navigation and close sidebar
  const handleCheckout = () => {
    handleClose(); // Close the sidebar
    setTimeout(() => {
      navigate("/checkoutPages"); // Navigate to checkoutPages
    }, 300); // Adjust the timeout duration to match the transition time
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw]
      transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
          onClick={handleClose}
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div
        className="
        flex flex-col gap-y-2
        h-[320px] lg:h-[380px]
        overflow-y-auto overflow-x-hidden border-b
        "
      >
        {product.map((item) => (
          <CartData item={item} key={item.id} />
        ))}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase text-semibold">
            <span className="mr-2">Total:</span>${total.toFixed(2)}
          </div>
          <div
            className="
            cursor-pointer py-4 bg-red-500 text-white w-12 h-12
            flex justify-center items-center text-xl
            "
            onClick={clearCart}
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to={"/checkoutPages"}
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium"
          onClick={handleCheckout} // Use handleCheckout for this link
        >
          View Cart
        </Link>
        <Link
          to={"/"}
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
          onClick={handleCheckout} // Use handleCheckout for this link
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

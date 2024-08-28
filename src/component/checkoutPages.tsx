import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { ProductContext } from "../context/productContext";
import useProductDataCart from "../hooks/useCartController";
import CheckoutData from "./checkoutData";

const CheckoutPages = () => {

  const productContext = useContext(ProductContext);
  if (!productContext) {
    throw new Error("ProductList must be used within a ProductProvider");
  }

  const { total, itemAmount, product } = useProductDataCart();

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="h-[100px] bg-hero bg-no-repeat bg-cover bg-center py-19"></section>
      <div className="container mx-auto px-4 mt-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {product.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-60 bg-white rounded-lg shadow-md p-6">
              <p className="text-lg font-semibold">Shopping Cart is Empty</p>
              <Link to="/" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
                Go to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="md:w-3/4">
                {product.map((item) => (
                  <CheckoutData item={item} key={item.id} />
                ))}
              </div>
              <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Item Amount</span>
                    <span>{itemAmount}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>${total / itemAmount}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${(total + total / itemAmount).toFixed(2)}</span>
                  </div>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPages;

import { useEffect, useState } from "react";
import { CategoryProduct } from "../interface/CategoryProductInterface";
import { ProductModel } from "../interface/ProductModel";
import Swal from "sweetalert2";

interface item {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryProduct;
  images: string[];
  total: number;
}

const useProductDataCart = () => {
  // Function to fetch items from local storage
  const fetchItemsFromLocalStorage = () => {
    const itemsJson = localStorage.getItem("carted") || "[]";
    return JSON.parse(itemsJson) as item[];
  };

  // Initial state
  const [product, setCartProduct] = useState<item[]>(fetchItemsFromLocalStorage);
  const [total, setTotal] = useState(0);
  const [itemAmount, setItemAmount] = useState(0);

  // Add to cart
  const addToCart = (value: number, data: ProductModel) => {
    const items = fetchItemsFromLocalStorage();
    const itemIndex = items.findIndex((item) => item.id === data.id);

    if (itemIndex === -1) {
      const newItem: item = {
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        images: data.images,
        total: value,
      };
      items.push(newItem);
    } else {
      items[itemIndex].total += value;
    }

    localStorage.setItem("carted", JSON.stringify(items));
    window.dispatchEvent(new Event('local-storage-update')); // Dispatch custom event
  };

  // Remove from cart
  const removeFromCart = (id: number) => {
    let items = fetchItemsFromLocalStorage();
    items = items.filter((item) => item.id !== id);
    localStorage.setItem("carted", JSON.stringify(items));
    window.dispatchEvent(new Event('local-storage-update')); // Dispatch custom event
  };

  // Increase amount of a product
  const increaseAmount = (id: number, amount: number) => {
    let items = fetchItemsFromLocalStorage();
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      items[itemIndex].total += amount;
      if (items[itemIndex].total <= 0) {
        // Remove the item if the total is less than or equal to zero
        items = items.filter((item) => item.id !== id);
      }

      localStorage.setItem("carted", JSON.stringify(items));
      window.dispatchEvent(new Event('local-storage-update')); // Dispatch custom event
    }
    else{
        Swal.fire("ERROR!  ", "Cart is empty , please add this item to cart first !!", "error");
    }
  };

  // Decrease amount of a product
  const decreaseAmount = (id: number, amount: number) => {
    let items = fetchItemsFromLocalStorage();
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      items[itemIndex].total -= amount;
      if (items[itemIndex].total <= 0) {
        // Remove the item if the total is less than or equal to zero
        items = items.filter((item) => item.id !== id);
      }

      localStorage.setItem("carted", JSON.stringify(items));
      window.dispatchEvent(new Event('local-storage-update')); // Dispatch custom event
    }
    else{
        Swal.fire("ERROR!  ", "Item cannot below zero !!", "error");
    }
  };

  // Clear local storage and update state
  const clearCart = () => {
    localStorage.removeItem("carted");
    setCartProduct([]);
    setTotal(0);
    setItemAmount(0);
  };

  // Update state when local storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setCartProduct(fetchItemsFromLocalStorage());
    };

    window.addEventListener('local-storage-update', handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('local-storage-update', handleStorageChange);
    };
  }, []);

  // Calculate total price
  useEffect(() => {
    const totalValue = product.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.total;
    }, 0);

    setTotal(totalValue);
  }, [product]);

  // Calculate item amount
  useEffect(() => {
    const amount = product.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.total;
    }, 0);

    setItemAmount(amount);
  }, [product]);

  return {
    addToCart,
    removeFromCart,
    increaseAmount, // Add increaseAmount function to returned object
    decreaseAmount, // Add decreaseAmount function to returned object
    clearCart,
    total,
    itemAmount,
    product,
  };
};

export default useProductDataCart;

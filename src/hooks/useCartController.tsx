import { useEffect, useState } from "react";
import { CategoryProduct } from "../interface/CategoryProductInterface";
import { ProductModel } from "../interface/ProductModel";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Item {
    id: number;
    title: string;
    price: number;
    description: string;
    category: CategoryProduct;
    images: string[];
    total: number;
}

const useProductDataCart = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Fetch items from local storage
    const fetchItemsFromLocalStorage = () => {
        const itemsJson = localStorage.getItem("carted") || "[]";
        return JSON.parse(itemsJson) as Item[];
    };

    const [product, setCartProduct] = useState<Item[]>(
        fetchItemsFromLocalStorage()
    );
    const [total, setTotal] = useState(0);
    const [itemAmount, setItemAmount] = useState(0);

    // Add to cart
    const addToCart = (value: number, data: ProductModel) => {
        const items = fetchItemsFromLocalStorage();
        const itemIndex = items.findIndex((item) => item.id === data.id);

        if (itemIndex === -1) {
            const newItem: Item = {
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
        if (isAuthenticated) {
            localStorage.setItem("carted", JSON.stringify(items));
            window.dispatchEvent(new Event("local-storage-update"));
        } else {
            navigate("/login");
        }
    };

    // Remove from cart
    const removeFromCart = (id: number) => {
        let items = fetchItemsFromLocalStorage();
        items = items.filter((item) => item.id !== id);
        localStorage.setItem("carted", JSON.stringify(items));
        // ini buat selalu bisa ngecek update data / flow di local storage
        window.dispatchEvent(new Event("local-storage-update"));
    };

    const increaseAmount = (id: number, amount: number) => {
        let items = fetchItemsFromLocalStorage();
        const itemIndex = items.findIndex((item) => item.id === id);
        if (isAuthenticated) {
            if (itemIndex !== -1) {
                items[itemIndex].total += amount;
                if (items[itemIndex].total <= 0) {
                    items = items.filter((item) => item.id !== id);
                }
                localStorage.setItem("carted", JSON.stringify(items));
                window.dispatchEvent(new Event("local-storage-update"));
            } else {
                Swal.fire(
                    "ERROR!",
                    "Cart is empty, please add this item to cart first!",
                    "error"
                );
            }
        } else {
            navigate("/login");
        }
    };

    const decreaseAmount = (id: number, amount: number) => {
        let items = fetchItemsFromLocalStorage();
        const itemIndex = items.findIndex((item) => item.id === id);
        if (isAuthenticated) {
            if (itemIndex !== -1) {
                items[itemIndex].total -= amount;
                if (items[itemIndex].total <= 0) {
                    items = items.filter((item) => item.id !== id);
                }
                localStorage.setItem("carted", JSON.stringify(items));
                window.dispatchEvent(new Event("local-storage-update"));
            } else {
                Swal.fire("ERROR!", "Item cannot be below zero!", "error");
            }
        } else {
            navigate("/login");
        }
    };

    // Clear cart
    const clearCart = () => {
        if (isAuthenticated) {
            localStorage.removeItem("carted");
            setCartProduct([]);
            setTotal(0);
            setItemAmount(0);
            window.dispatchEvent(new Event("local-storage-update"));
        } else {
            navigate("/login");
        }
    };

    // Update state when local storage changes
    useEffect(() => {
        const handleStorageChange = () => {
            setCartProduct(fetchItemsFromLocalStorage());
        };

        window.addEventListener("local-storage-update", handleStorageChange);

        return () => {
            window.removeEventListener("local-storage-update", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const totalValue = product.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.total;
        }, 0);

        setTotal(totalValue);
    }, [product]);

    useEffect(() => {
        const amount = product.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.total;
        }, 0);

        setItemAmount(amount);
    }, [product]);

    return {
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
        clearCart,
        total,
        itemAmount,
        product,
        fetchItemsFromLocalStorage,
    };
};

export default useProductDataCart;

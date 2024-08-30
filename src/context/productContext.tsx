import { createContext, useState, useEffect, ReactNode } from "react";
import { ProductModel } from "../interface/ProductModel";
import { CategoryProduct } from "../interface/CategoryProductInterface";

interface ProductContextType {
    products: ProductModel[];
    categories: CategoryProduct[];
    fetchCategories: () => void;
    fetchProducts: () => void;
  }
//   export interface CartProps extends ProductModel {
//     quantity: number
//   }

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

 const [products, setProducts] = useState<ProductModel[]>([]);
 const [categories, setCategories] = useState<CategoryProduct[]>([]);

 useEffect(() => {
    fetchProducts(); 
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products?limit=100`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("ERROR fetching products:", error);
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/categories?limit=10`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("ERROR fetching categories:", error);
    }
  };


  return (

    <ProductContext.Provider value={{ products, fetchProducts , categories, fetchCategories }}>
      {children}
    </ProductContext.Provider>

  );
};

export default ProductProvider;

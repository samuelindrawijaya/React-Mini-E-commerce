import { createContext, useState, useEffect, ReactNode } from "react";
import { ProductModel } from "../interface/ProductModel";

interface ProductContextType {
    products: ProductModel[];
  }
//   export interface CartProps extends ProductModel {
//     quantity: number
//   }

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

 const [products, setProducts] = useState<ProductModel[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/?limit=25&offset=1`);
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (

    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>

  );
};

export default ProductProvider;

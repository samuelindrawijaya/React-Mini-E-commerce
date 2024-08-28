import React, { useState, useEffect, useContext } from "react";
// import { ProductContext } from '../contexts/ProductContext';
// import Product from '../components/Product';
import Hero from "./Hero";
import Product from "./productlist";
import { ProductModel } from "../interface/ProductModel";
import { CategoryProduct } from "../interface/CategoryProductInterface";
import ProductsFilter from "./ProductFilter";
import { ProductContext } from "../context/productContext";

const Home = () => {
  // const { products,selectedCategory, setSelectedCategory} = useContext(ProductContext);
  
  const [category, setCategory] = useState<CategoryProduct[]>([]);
  const productContext = useContext(ProductContext);
  if (!productContext) {
    throw new Error("ProductList must be used within a ProductProvider");
  }

  const { products } = productContext;

  useEffect(() => {
    fetchCategory(); 
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories?limit=10`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const [items, setItems] = useState<ProductModel[]>([]);

  useEffect(() => {
    setItems(products);
  }, [products]);

  

  const filterItems = (filter : string) => {
    const productFilter = products.filter((productFilter) => {
      return productFilter.category.name === filter;
    });
    console.log(productFilter);
    setItems(productFilter);
  };

  
  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="w-full mb-4">
          <ProductsFilter
            setItems={setItems}
            menuItems={category}
            filterItems={filterItems}
            products={products}
          />
        </div>
        <div className="container mx-auto">
          <div
            className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] 
            max-w-sm mx-auto md:max-w-none md:mx-0
                        "
          >
            {items.map((product) => {
              return <Product data={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import  { ProductContext } from "../context/productContext";
import useProductDataCart from "../hooks/useCartController";
import { ProductModel } from "../interface/ProductModel";

const ProductPage = () => {
  const { id } = useParams();
  let ids: string = "1";
  if (id) {
    ids = id;
  }
  const productContext = useContext(ProductContext);
  if (!productContext) {
    throw new Error("ProductList must be used within a ProductProvider");
  }

  const { products } = productContext;
  const productData = products.find((item) => {
    return item.id === parseInt(ids);
  });



  const { decreaseAmount,increaseAmount,product,addToCart } = useProductDataCart();


  
  const Totalproducts = product.find((item) => {
    return item.id === parseInt(ids);
  });





  let fixedImg: any[] = [];
  const [activeImg, setActiveImage] = useState(productData?.images[0]);
  if(productData?.images)
  {
    console.log('masuk');
    const brokenImg = productData?.images.join("");
    let regexImg = brokenImg.replace(/\\|"/g, "");
    regexImg = regexImg.substring(1, regexImg.length - 1);
    fixedImg = regexImg.split(',').map((url: string) => url.trim());
  }




  const handleDataPlus = ( id: number | undefined , value : number) => {
    if(id)
    {
        increaseAmount(id, value)
    }
  };


  const handleDataMinus = ( id: number | undefined , value : number) => {
    if(id)
    {
        decreaseAmount(id , 1)
    }
  };

  const handlecart = (value : number, data : ProductModel | undefined) => {
    if(data)
    {
        addToCart(value,data);
    }
    
  };

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }
  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <div className="flex flex-2 justify-center items-center mb-8 lg:mb-0">
          <div className="flex flex-col gap-1 lg:w-2/4">
            <img
              src={activeImg}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row justify gap-6 h-24">
              {productData?.images.map((item) => (
                <img
                  key={item}
                  src={item}
                  alt=""
                  className="w-24 h-24 rounded-md cursor-pointer"
                  onClick={() => setActiveImage(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:w-2/5">
        <div>
          <span className=" text-violet-600 font-semibold">
            {productData?.category.name}
          </span>
          <h1 className="text-3xl font-bold">{productData?.title}</h1>
        </div>
        <p className="text-gray-700">{productData?.description}</p>
        <h6 className="text-2xl font-semibold">${productData?.price}</h6>
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-row items-center">
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                onClick={() => handleDataMinus(productData?.id, 1)}
            >
              -
            </button>
            <span className="py-4 px-6 rounded-lg">{Totalproducts?.total ? Totalproducts?.total : 1 }</span>
            <button
              className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
            onClick={() => handleDataPlus(productData?.id,1)}
            >
              +
            </button>
          </div>
          <button 
           onClick={() => handlecart(1,productData)}
            className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

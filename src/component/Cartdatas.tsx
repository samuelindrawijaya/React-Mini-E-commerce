
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import useProductDataCart from "../hooks/useCartController";

const CartData = ({ item } : any) => {
  const { id
    ,title
    ,price
    ,images
    ,total } = item;

   //manggil hooks lagi
   const { removeFromCart,decreaseAmount,increaseAmount } = useProductDataCart();

  return (
    <div
      className="
                flex gap-x-4 py-2 lg:px-6 
                border-b border-gray-200 w-full 
                font-light text-gray-500
                "
    >
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/productList/${id}`}>
          <img className="max-w-[80px]" src={images[0]} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
              to={`/productList/${id}`}
            >
              {title}
            </Link>
            <div
              className="text-xl cursor-pointer"
              onClick={() => removeFromCart(id)}
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div
              className="
                        flex flex-1 max-w-[100px] items-center 
                        h-full border text-primary font-medium
                        "
            >
              <div
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
                onClick={() => decreaseAmount(id,1)}
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {total}
              </div>
              <div
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
                onClick={() => increaseAmount(id,1)}
              >
                <IoMdAdd />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-around">
              $ {price}
            </div>
            <div className="flex-1 flex justify-end items-center text-primary font-medium">{`$ ${(
              total * price
            )}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartData;

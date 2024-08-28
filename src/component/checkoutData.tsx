
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import useProductDataCart from "../hooks/useCartController";


const CheckoutData = ({ item }: any) => {
  const { id, title, price, images, total } = item;

  // Calling hooks
  const { decreaseAmount, increaseAmount } = useProductDataCart();
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left font-semibold">Product</th>
            <th className="text-left font-semibold">Price</th>
            <th className="text-left font-semibold">Quantity</th>
            <th className="text-left font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-4">
              <div className="flex items-center">
                <img
                  className="h-16 w-16 mr-4"
                  src={images[0]}
                  alt={title}
                />
                <span className="font-semibold text-gray-800">{title}</span>
              </div>
            </td>
            <td className="py-4">${price.toFixed(2)}</td>
            <td className="py-4">
              <div className="flex items-center">
                <button 
                  className="border rounded-md py-2 px-4 mr-2"
                  onClick={() => decreaseAmount(id,1)}
                >
                  <IoMdRemove />
                </button>
                <span className="text-center w-8">{total}</span>
                <button 
                  className="border rounded-md py-2 px-4 ml-2"
                  onClick={() => increaseAmount(id,1)}
                >
                  <IoMdAdd />
                </button>
              </div>
            </td>
            <td className="py-4">${(price * total).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutData;

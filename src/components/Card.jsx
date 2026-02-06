import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatchCart } from "./ContextReducer";

const Card = ({ product }) => {
  const dispatch = useDispatchCart();

  const initialSize = Object.keys(product.options)[0] || "";
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    setSize(Object.keys(product.options)[0] || "");
    setQty(1);
  }, [product]);

  if (!product || Object.keys(product).length === 0)
    return <div>Loading...</div>;

  const handleAddToCart = () => {
    const price = Number(product.options[size]) * Number(qty);

    dispatch({
      type: "ADD",
      payload: {
        id: product._id,
        name: product.name,
        img: product.img,
        qty: Number(qty),
        size,
        price
      }
    });

    toast.success(`${product.name} added to cart 🛒`);
    setQty(1);
    setSize(Object.keys(product.options)[0] || "");
  };

  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
      <img
        src={product.img}
        alt="food"
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h5 className="text-xl font-semibold">{product.name}</h5>
        <p className="text-gray-600 text-sm">{product.description}</p>

        <div className="flex gap-3 mt-3">
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="border px-2 py-1"
          >
            {[1,2,3,4,5,6].map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>

          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border px-2 py-1"
          >
            {Object.keys(product.options).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold">
            ₹ {Number(product.options[size]) * qty}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-orange-600 text-white px-4 py-1 rounded-md hover:bg-orange-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

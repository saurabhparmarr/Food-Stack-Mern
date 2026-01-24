import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const CartPage = () => {
  const context = useCart();
  const cart = context?.cart || [];
  const dispatch = useDispatchCart();

  const handlePlaceOrder = () => {
    if(cart.length === 0){
      alert("Cart is empty!");
      return;
    }
    dispatch({ type: "PLACE_ORDER" });
    alert("Order placed successfully!");
  };

  const handleRemoveItem = (item) => {
    dispatch({ type: "REMOVE", id: item.id, size: item.size });
  };

const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);


  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, idx) => (
            <div key={idx} className="border p-2 mb-2 flex justify-between items-center">
              <div>
                <p>{item.name} ({item.size}) x {item.qty}</p>
                <p>₹{item.price}</p>
              </div>
              <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleRemoveItem(item)}>Remove</button>
            </div>
          ))}

          <div className="flex justify-between mt-4 font-semibold text-lg">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>

          <button onClick={handlePlaceOrder} className="bg-green-600 text-white px-4 py-2 rounded mt-4">Place Order</button>
        </>
      )}
    </div>
  );
};

export default CartPage;

import React from "react";
import { useCart } from "../components/ContextReducer";

const Orders = () => {
  const context = useCart();  // useCart() returns the whole state object
  const orders = context?.orders || [];  // fallback to empty array

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet!</p>
      ) : (
        orders.map((item, idx) => (
          <div key={idx} className="border p-2 rounded mb-2">
            <p>{item.name} ({item.size}) x {item.qty}</p>
            <p>₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;

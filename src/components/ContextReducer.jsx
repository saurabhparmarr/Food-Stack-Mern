import React, { createContext, useReducer, useContext } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = {
  cart: [],
  orders: []
};

const reducer = (state, action) => {
  switch(action.type){
    case "ADD":
      const existingIndex = state.cart.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size
      );
     if(existingIndex !== -1){
  const newCart = [...state.cart];
  newCart[existingIndex].qty += action.payload.qty;
  const unitPrice = action.payload.price / action.payload.qty; 
  newCart[existingIndex].price = newCart[existingIndex].qty * unitPrice;
  return { ...state, cart: newCart };
} else {
  return { ...state, cart: [...state.cart, action.payload] };
}


    case "REMOVE":
      return { ...state, cart: state.cart.filter(
        item => !(item.id === action.id && item.size === action.size)
      ) };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "PLACE_ORDER":
      return { ...state, orders: [...state.orders, ...state.cart], cart: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

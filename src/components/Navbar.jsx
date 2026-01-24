import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer"; 

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("authToken");
  
  const { cart } = useCart(); 
  const cartCount = cart ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="bg-orange-500 text-white px-6 py-4 flex items-center">
      <Link to="/" className="text-2xl font-bold">Food Stack</Link>

      <div className="flex gap-6 ml-auto items-center">
        <Link to="/" className="hover:underline">Home</Link>

        {!isAuth ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">SignUp</Link>
          </>
        ) : (
          <>
            <Link to="/orders" className="hover:underline">My Orders</Link>
            
            <Link to="/cart" className="relative hover:underline">
              My Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

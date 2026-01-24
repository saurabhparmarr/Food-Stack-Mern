import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("authToken");
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Food Stack</h2>
          <p className="text-sm leading-relaxed">
            Food Stack Is Your Go-To Platform For Ordering Delicious Meals From
            Your Favorite Restaurants, Delivered Fast And Fresh.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>{" "}
          {!isAuth ? (
            <>
              <li>
                {" "}
                <Link to="/login" className="hover:text-white cursor-pointer">
                  Login
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/signup" className="hover:text-white cursor-pointer">
                  SignUp
                </Link>
              </li>
            </>
          ) : (
            <ul className="space-y-2 text-sm">
              <li>
                {" "}
                <Link to="/orders" className="hover:text-white cursor-pointer">
                  My Order
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/login" className="hover:text-white cursor-pointer">
                  Login
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/signup" className="hover:text-white cursor-pointer">
                  SignUp
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm">📍 India</p>
          <p className="text-sm">
            📧{" "}
            <a
              href="mailto:support@foodstack.com"
              className="ml-1 text-blue-300 hover:underline"
            >
              support@foodstack.com
            </a>
          </p>
          <p className="text-sm">📞 +91 6390235842</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Food Stack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

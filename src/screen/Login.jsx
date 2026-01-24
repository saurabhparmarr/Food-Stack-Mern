import React from 'react'
import { useState } from 'react';
import { Link , useNavigate } from "react-router-dom";

const Login = () => {
   const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
     
      email: "",
      password: "",
      
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      
      if (!json.success) {
        alert("Enter Valid Credentials");
      }
      if(json.success){
        localStorage.setItem("authToken" , json.authToken)
        console.log(localStorage.getItem("authToken"));
        navigate("/")
      }
    };
    const onChnage = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };


  return (
     <form className="space-y-5" onSubmit={handleSubmit}>
          

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={onChnage}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={onChnage}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

            

          <button
            type="submit"
            disabled={!credentials.email || !credentials.password}
            className="w-full bg-orange-400 text-white py-3 rounded-xl font-bold text-lg 
             hover:bg-orange-500 transition-colors cursor-pointer"
          >
            Login
          </button>

               <Link to="/signup" className="text-orange-400 font-semibold hover:underline"
                    >
                    I am new user
                  </Link>
        </form>
  )
}

export default Login
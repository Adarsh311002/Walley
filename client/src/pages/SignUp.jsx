import React, { useState } from "react";
import { Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
 

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-green-400">
      <div className="m-auto w-full max-w-md p-8 rounded-xl bg-white/80 backdrop-blur-md shadow-2xl">
         <Link to="/">
                <div className="flex items-center justify-center mb-8">
                  <Wallet className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-3xl font-bold text-blue-600">Walley</span>
                </div>
                </Link>
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create your account
        </h1>
        <div >
          <div className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                placeholder="John Doe"
                required
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/*username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                username
              </label>
              <input
                id="username"
                placeholder="john@example.com"
                required
                onChange={(e) => setUserName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                placeholder="john@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={async () => {
                const response = await axios.post("http://localhost:5001/api/v1/users/signup",{
                    username : userName,
                    email : email,
                    password : password,
                    fullname : fullName


                });
                localStorage.setItem("token",response.data.token)
                navigate("/dashboard")
              }}
             
              className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow-md transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                `}
            >
               Sign Up
            </button>
          </div>
        </div>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

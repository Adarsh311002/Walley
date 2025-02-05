import React, { useState } from "react";
import { Wallet } from "lucide-react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    
    setTimeout(() => {
      setIsLoading(false);
      alert("Signed in successfully!");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-green-400">
      <div className="m-auto w-full max-w-md p-8 rounded-xl bg-white/80 backdrop-blur-md shadow-2xl">
        {/* Logo and Title */}
        <Link to="/">
        <div className="flex items-center justify-center mb-8">
          <Wallet className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-3xl font-bold text-blue-600">Walley</span>
        </div>
        </Link>
        <h1 className="text-2xl font-semibold text-center mb-6">Sign in to your account</h1>
        
        {/* Sign In Form */}
        <div onSubmit={onSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label  className="block text-sm font-medium text-gray-700">
                username
              </label>
              <input
                id="username"
                
                placeholder="john31"
                required
                onChange={(e) => setUserName(e.target.value)}
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

            {/* Sign In Button */}
            <button
            
              type="submit"
              onClick={async () => {
                const response = await axios.post("http://localhost:5001/api/v1/users/login",{
                    username : userName,
                    password : password
                })
                localStorage.setItem("token",response.data.token)
                navigate("/dashboard")

              }}
              disabled={isLoading}
              className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow-md transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

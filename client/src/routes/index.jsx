import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import { SendMoney } from "../components/SendMoney";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="signin" replace />;
  }

  return <Outlet />;
};

const AuthRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    element: <AuthRoute />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },

  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/send-money",
        element: <SendMoney />,
      },
    ],
  },
]);

export default router;

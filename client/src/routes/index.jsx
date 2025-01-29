import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import { SendMoney } from "../components/SendMoney";



const router = createBrowserRouter([
    {
        path : "/",
        element  : <Home />

    },
    {
        path : "/signup",
        element : <SignUp />
    },
    {
        path : "/signin",
        element : <SignIn />
    },
    {
        path : "/dashboard",
        element : <Dashboard />
    },
    {
        path : "/send-money",
        element : <SendMoney />
    }
]) 

export default router;
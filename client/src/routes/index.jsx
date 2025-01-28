import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";



const router = createBrowserRouter([
    {
        path : "/",
        element  : <Home />

    },
    {
        path : "/signup",
        element : <SignUp />
    },
    // {
    //     path : "/signin",
    //     element : <SignIn />
    // },
    // {
    //     path : "/dashboard",
    //     element : <DashBoard />
    // },
    // {
    //     path : "/send",
    //     element : <SendMoney />
    // }
]) 

export default router;
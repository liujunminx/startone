import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import SignIn from "./user/SignIn";
import Home from "./home/Home";
import SignUp from "./user/SignUp";

const route = createBrowserRouter([
    {
        path: '/sign-in',
        element: <SignIn/>
    },
    {
        path: '/sign-up',
        element: <SignUp/>
    },
    {
        path: '/',
        element: <Home/>
    },
])

export default function Router(){
    return(
        <RouterProvider router={route}/>
    )
}
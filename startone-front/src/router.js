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
        path: '/',
        element: <Home/>
    },
    {
        path: '/sign-up',
        element: <SignUp/>
    }
])

export default function Router(){
    return(
        <RouterProvider router={route}/>
    )
}
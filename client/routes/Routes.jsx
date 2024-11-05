import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../src/layouts/MainLayout";
import HomePage from "../src/pages/HomePage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        // errorElement:
        children: [
            {
                path: '/',
                element: <HomePage/>
            }
        ]
    }
])
import { createBrowserRouter,Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Dashboard from "./views/Dashboard";
import Customers from "./views/Customers";
import Customer from "./views/Customer";
import Login from "./views/Login";
import Messages from "./views/Messages";
import NotFound from "./views/NotFound";
import Orders from "./views/Orders";
import OrderDetail from "./views/OrderDetail";
import Product from "./views/Product";
import Products from "./views/Products";
import AddProduct from "./views/AddProduct";
import Users from "./views/Users";
import UserUpdate from "./views/UserUpdate";
import Metrics from "./views/Metrics";
import Profile from "./views/Profile";

const router = createBrowserRouter([
    {
        path:'/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard"/>
            },
            {
                path:'/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/customers',
                element: <Customers/>
            },
            {
                path:'/customers/:id',
                element: <Customer/>
            },
          
            {
                path: '/messages',
                element: <Messages/>
            },
            {
                path: '/products/:id',
                element: <Product/>
            },
            {
                path: '/products',
                element: <Products/>
            },
            {
                path:'/products/add',
                element: <AddProduct/>
            },
            {
                path: '/orders',
                element: <Orders/>
            },
            {
                path:'/orders/:id',
                element: <OrderDetail/>
            },
            {
                path: '/user_update',
                element: <UserUpdate/>
            },
            {
                path: '/metrics',
                element: <Metrics/>
            },
            {
                path: '/profile',
                element: <Profile/>
            },
        ]
    },
    {
        path:'/',
        element: <GuestLayout/>,
        children:[
            {
                path:'/login',
                element: <Login/>
            }
        ]
    },
    {
        path:'*',
        element:<NotFound/>
    }
]);

export default router;
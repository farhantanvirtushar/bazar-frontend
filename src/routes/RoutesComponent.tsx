/* eslint-disable */
import path from "node:path/win32";
import React from "react";
import { Navigate, Outlet, RouteObject, useRoutes } from "react-router-dom";
import isAuthenticatedAdmin from "../auth-guard/AdminAuthenticate";
import AdminLayout from "../components/admin/layout/AdminLayout";
import NavLayout from "../components/layouts/nav-layout/NavLayout";
import AdminCategories from "../pages/admin/categories/AdminCategories";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import AdminDepartments from "../pages/admin/departments/AdminDepartments";
import AdminLogin from "../pages/admin/login/AdminLogin";
import Orders from "../pages/admin/orders/Orders";
import AdminProducts from "../pages/admin/products/AdminProducts";
import Cart from "../pages/cart/Cart";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import ProductDetais from "../pages/product-details/ProductDetais";
import Products from "../pages/products/Products";
import Register from "../pages/register/Register";

export default function RoutesComponent() {
  const routes = useRoutes([
    {
      path: "/",
      element: <NavLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "categories/:id",
          element: <Products />,
        },
        {
          path: "product/:id",
          element: <ProductDetais />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
    {
      path: "/",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/admin/",
      element: isAuthenticatedAdmin() ? (
        <AdminLayout />
      ) : (
        <Navigate to="/admin/login" />
      ),
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "departments",
          element: <AdminDepartments />,
        },
        {
          path: "categories",
          element: <AdminCategories />,
        },
        {
          path: "products",
          element: <AdminProducts />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
      ],
    },
    {
      path: "/admin/",
      children: [
        {
          path: "login",
          element: <AdminLogin />,
        },
      ],
    },
  ]);
  return routes;
}

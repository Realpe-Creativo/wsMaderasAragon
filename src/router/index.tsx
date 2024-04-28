import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Landing from './../pages/landing'
import Auth from "../pages/auth";
import Home from "../pages/home";
import Books from "../pages/books";
import Products from "../pages/products";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout tab="index"><Landing/></PublicLayout>,
  },
  {
    path: "/products",
    element: <PublicLayout tab="products"><Products/></PublicLayout>,
  },
  {
    path: "/know",
    element: <PublicLayout tab="know"><Products/></PublicLayout>,
  },
  {
    path: "/contact",
    element: <PublicLayout tab="contact"><Products/></PublicLayout>,
  },
  {
    path: "/auth",
    element: <PublicLayout tab="auth"><Auth/></PublicLayout>
  },
  {
    path: "/home",
    element: <PublicLayout tab="home"><Home/></PublicLayout>
  },
  {
    path: "/books",
    element: <PublicLayout tab="books:books"><Books/></PublicLayout>
  },
  {
    path: "*",
    element: <PublicLayout tab="">Not Found</PublicLayout>
  }

]);
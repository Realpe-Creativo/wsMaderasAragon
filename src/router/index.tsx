import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Landing from './../pages/landing'
import Auth from "../pages/auth";
import Know from "../pages/know";
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
    element: <PublicLayout tab="know"><Know/></PublicLayout>,
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
    path: "*",
    element: <PublicLayout tab="">Not Found</PublicLayout>
  }

]);
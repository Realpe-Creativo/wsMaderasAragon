import { createBrowserRouter } from "react-router-dom";
import MasterLayout from "../layouts/MasterLayout";
import Landing from './../pages/landing'
import Auth from "../pages/auth";
import Home from "../pages/home";
import Books from "../pages/books";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout tab="index"><Landing/></MasterLayout>,
  },
  {
    path: "/auth",
    element: <MasterLayout tab="auth"><Auth/></MasterLayout>
  },
  {
    path: "/home",
    element: <MasterLayout tab="home"><Home/></MasterLayout>
  },
  {
    path: "/books",
    element: <MasterLayout tab="books:books"><Books/></MasterLayout>
  },
  {
    path: "*",
    element: <MasterLayout tab="">Not Found</MasterLayout>
  }

]);
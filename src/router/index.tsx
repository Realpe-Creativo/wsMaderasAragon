import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Landing from '../pages/landing'
import { lazy, Suspense } from "react";

const Auth = lazy(() => import("../pages/auth"));
const Know = lazy(() => import("../pages/know"));
const Products = lazy(() => import("../pages/productPage"));
const Legal = lazy(() => import("../pages/legal"));
const Contact = lazy(() => import("../pages/contact"));
const Checkout = lazy(() => import("../pages/checkout"));
const News = lazy(() => import("../pages/news"));
const NewsDetail = lazy(() => import("../pages/newsDetail"));
const NotFound = lazy(() => import("../pages/notFound"));
const Orders  = lazy(() => import("../pages/orders/orders"));
const Categories = lazy(() => import("../pages/categories"));
const Livestock = lazy(() => import("../pages/livestock"));
const Structural = lazy(() => import("../pages/structural"));


const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <PublicLayout tab="index">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Landing/>
        </Suspense>
      </PublicLayout>,
  },
  {
    path: "/products",
    element: 
      <PublicLayout tab="products">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Products/>
        </Suspense>
      </PublicLayout>,
  },
  {
    path: "/legal",
    element: 
      <PublicLayout tab="legal">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Legal/>
        </Suspense>
      </PublicLayout>,
  },
  {
    path: "/know",
    element: 
      <PublicLayout tab="know">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Know/>
        </Suspense>
      </PublicLayout>,
  },
  {
    path: "/news",
    element: 
      <PublicLayout tab="news">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <News/>
        </Suspense>
      </PublicLayout>,
  },
  {
    path: "/checkout",
    element: 
      <PublicLayout tab="checkout">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Checkout/>
        </Suspense>
      </PublicLayout>,
  },
  {
    path: "/contact",
    element: 
      <PublicLayout tab="contact">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Contact/>
        </Suspense>
      </PublicLayout>,
  },
  {
    path: "/auth",
    element: 
      <PublicLayout tab="auth">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Auth/>
        </Suspense>
      </PublicLayout>
  },
  {
    path: "/orders",
    element: 
      <PublicLayout tab="auth">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Orders/>
        </Suspense>
      </PublicLayout>
  },
  {
    path: "/categories",
    element: 
      <PublicLayout tab="auth">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Categories/>
        </Suspense>
      </PublicLayout>
  },
  {
    path: "/categories/livestock",
    element: 
      <PublicLayout tab="auth">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Livestock/>
        </Suspense>
      </PublicLayout>
  },
  {
    path: "/products/:slug",
    element:
      <PublicLayout tab="products">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Products />
        </Suspense>
      </PublicLayout>
  },
  {
    path: "/categories/structural",
    element: 
      <PublicLayout tab="auth">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <Structural/>
        </Suspense>
      </PublicLayout>
  },
  {
    path: "/news/newsDetail/:id",
    element: 
      <PublicLayout tab="auth">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <NewsDetail/>
        </Suspense>
      </PublicLayout>
  },
  {
    path: "*",
    element: 
      <PublicLayout tab="">
        <Suspense fallback={<div className="flex h-full">Loading...</div>}>
          <NotFound/>
        </Suspense>
      </PublicLayout>
  }
  
]);

export default router;
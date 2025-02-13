import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "@/layouts/LayoutPublic";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const LayoutPrivate = lazy(() => import("@/layouts/LayoutPrivate"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Inventory = lazy(() => import("@/pages/Inventory"));
const Products = lazy(() => import("@/pages/Products"));
const Suppliers = lazy(() => import("@/pages/Suppliers"));
const Customers = lazy(() => import("@/pages/Customers"));
const Sales = lazy(() => import("@/pages/Sales"));
const Purchase = lazy(() => import("@/pages/Purchase"));
const Expenses = lazy(() => import("@/pages/Expenses"));
const Employees = lazy(() => import("@/pages/Employees"));
const Profile = lazy(() => import("@/pages/Profile"));
const Admin = lazy(() => import("@/pages/Admin"));
const Settings = lazy(() => import("@/pages/Settings"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense fallback={""}>
        <LayoutPrivate />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={""}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "inventario",
        element: (
          <Suspense fallback={""}>
            <Inventory />
          </Suspense>
        ),
      },
      {
        path: "productos",
        element: (
          <Suspense fallback={""}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "proveedores",
        element: (
          <Suspense fallback={""}>
            <Suppliers />
          </Suspense>
        ),
      },
      {
        path: "clientes",
        element: (
          <Suspense fallback={""}>
            <Customers />
          </Suspense>
        ),
      },
      {
        path: "ventas",
        element: (
          <Suspense fallback={""}>
            <Sales />
          </Suspense>
        ),
      },
      {
        path: "compras",
        element: (
          <Suspense fallback={""}>
            <Purchase />
          </Suspense>
        ),
      },
      {
        path: "finanzas",
        element: (
          <Suspense fallback={""}>
            <Expenses />
          </Suspense>
        ),
      },
      {
        path: "empleados",
        element: (
          <Suspense fallback={""}>
            <Employees />
          </Suspense>
        ),
      },
      {
        path: "Perfil",
        element: (
          <Suspense fallback={""}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "administracion",
        element: (
          <Suspense fallback={""}>
            <Admin />
          </Suspense>
        ),
      },
      {
        path: "configuracion",
        element: (
          <Suspense fallback={""}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
]);

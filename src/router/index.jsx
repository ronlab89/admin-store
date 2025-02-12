import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "@/layouts/LayoutPublic";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
const LayoutPrivate = lazy(() => import("@/layouts/LayoutPrivate"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Suppliers = lazy(() => import("../pages/Suppliers"));
const Employees = lazy(() => import("../pages/Employees"));
const Inventory = lazy(() => import("../pages/Inventory"));

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
        path: "proveedores",
        element: (
          <Suspense fallback={""}>
            <Suppliers />
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
    ],
  },
]);

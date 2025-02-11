import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useToggleStore } from "@/store/toggle.store";
import { useShallow } from "zustand/shallow";

import Sidebar from "@/components/navs/Sidebar";
import Navbar from "@/components/navs/Navbar";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
const Modal = lazy(() => import("@/components/Modal"));
const Delete = lazy(() => import("@/components/modals/Delete"));

const LayoutPrivate = () => {
  const { logged, token } = useAuthStore(
    useShallow((state) => ({
      logged: state.logged,
      token: state.token,
    }))
  );
  const { toggleSidebar } = useToggleStore(
    useShallow((state) => ({
      toggleSidebar: state.toggleSidebar,
    }))
  );

  if (token === null && !logged) return <Navigate to={"/"} />;

  return (
    <main className="w-screen h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 relative z-10 font-adminstore-body">
      <Sidebar />
      <Navbar />
      <section
        className={`${
          toggleSidebar
            ? "w-[84.5vw] min-h-[100vh] ml-[240px] pt-[75px]"
            : "w-[98.9vw] min-h-[100vh] ml-[72px] pt-[75px]"
        } relative overflow-x-hidden overflow-y-auto transition-transform duration-300 min-h-[88vh] max-h-[90vh] p-4 rounded-none flex justify-start items-start`}
      >
        <Outlet />
        <Suspense fallback={""}>
          <Modal />
        </Suspense>
        <Suspense fallback={""}>
          <Delete />
        </Suspense>
      </section>
      <Toaster />
    </main>
  );
};

export default LayoutPrivate;

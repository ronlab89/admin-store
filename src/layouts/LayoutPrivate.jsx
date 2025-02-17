import { lazy, Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { Toaster } from "sonner";

import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";

import Sidebar from "@/components/navs/Sidebar";
import Navbar from "@/components/navs/Navbar";
const Modal = lazy(() => import("@/components/modals/Modal"));
const Delete = lazy(() => import("@/components/modals/Delete"));

const LayoutPrivate = () => {
  const { logged, token } = useAuthStore(
    useShallow((state) => ({
      logged: state.logged,
      token: state.token,
    }))
  );
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);

  if (token === null && !logged) return <Navigate to={"/"} />;

  return (
    <>
      <main className="hidden lg:block w-screen h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 relative z-10 font-adminstore-body">
        <Sidebar />
        <Navbar />
        <section
          className={`${
            toggleSidebar
              ? "w-[84.5vw] min-h-[100vh] ml-[240px] pt-[75px]"
              : "w-[98.9vw] min-h-[100vh] ml-[72px] pt-[75px]"
          } relative overflow-hidden transition-transform duration-300 min-h-[88vh] max-h-[90vh] p-4 rounded-none flex justify-start items-start`}
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
      <main className="lg:hidden w-screen h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 relative z-10 font-adminstore-body flex flex-col justify-center items-center">
        <div
          className={`h-screen w-screen absolute top-0 left-0 pattern z-[1]`}
        ></div>
        <p className="text-center text-lg font-medium text-slate-800 dark:text-slate-200 sm:px-[150px] z-50">
          La aplicación actualmente está optimizada para resoluciones de laptop.
          Próximamente, tendrá compatibilidad para tablets y móviles.
        </p>
        <p className="text-center text-lg font-medium text-slate-800 dark:text-slate-200 px-[150px] mt-10 z-50">
          ¡Gracias por tu paciencia!
        </p>
      </main>
    </>
  );
};

export default LayoutPrivate;

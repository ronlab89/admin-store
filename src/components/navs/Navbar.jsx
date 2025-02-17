import { lazy, Suspense } from "react";

import { useToggleStore } from "@/store/toggle.store";

const UserDropdown = lazy(() => import("@/components/navs/UserDropdown"));
import ToggleDarkMode from "@/components/ToggleDarkMode";

const Navbar = () => {
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);

  return (
    <nav
      className={`${
        toggleSidebar
          ? "lg:ml-[240px] lg:w-[76.5vw] xl:w-[81.2vw] min-[90rem]:w-[83.5vw] 2xl:w-[84.5vw] mt-[0px] px-[20px]"
          : "lg:ml-[72px] lg:w-[92.9vw] xl:w-[94.3vw] min-[90rem]:w-[95.15vw] 2xl:w-[95.45vw] px-[20px]"
      } fixed top-0 left-0 right-0 mx-auto flex justify-between items-center min-h-[50px] max-h-[50px] bg-transparent border-none z-50`}
    >
      <div></div>
      <div className="w-[5%] h-[48px] flex justify-end items-center absolute top-[0px] right-[20px]">
        <span className="absolute top-[0px] right-[70px]">
          <ToggleDarkMode />
        </span>
        <Suspense fallback={""}>
          <UserDropdown />
        </Suspense>
      </div>
    </nav>
  );
};

export default Navbar;

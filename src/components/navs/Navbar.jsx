import { lazy, Suspense, useEffect } from "react";

import { useToggleStore } from "@/store/toggle.store";

const UserDropdown = lazy(() => import("@/components/navs/UserDropdown"));

import ToggleDarkMode from "@/components/ToggleDarkMode";
import { getUserLogged } from "../../utils/authMethods";
import { useAuthStore } from "../../store/auth.store";

const Navbar = () => {
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);
  const token = useAuthStore((state) => state.token);
  const handleuser = useAuthStore((state) => state.handleuser);
  console.log({ token, handleuser });
  useEffect(() => {
    getUserLogged({ tokenlogin: token, handleuser: handleuser });
  }, []);
  return (
    <nav
      className={`${
        toggleSidebar
          ? "ml-[300px] w-[81vw] mt-[0px] px-[20px]"
          : "ml-[90px] w-[94.7vw] px-[20px]"
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

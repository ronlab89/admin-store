import { Outlet } from "react-router-dom";

import ToggleDarkMode from "@/components/ToggleDarkMode";

const LayoutPublic = () => {
  return (
    <section className="w-screen h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 relative z-10 font-adminstore-body">
      <div
        className={`h-screen w-screen absolute top-0 left-0 pattern z-[1]`}
      ></div>
      <div className="absolute top-[0px] right-[60px] z-50">
        <ToggleDarkMode right={60} top={0} />
      </div>
      <Outlet />
    </section>
  );
};

export default LayoutPublic;

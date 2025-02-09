import { Outlet } from "react-router-dom";

const LayoutPublic = () => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default LayoutPublic;

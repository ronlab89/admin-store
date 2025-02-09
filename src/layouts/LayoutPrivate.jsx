import { Navigate, Outlet } from "react-router-dom";

const LayoutPrivate = () => {
  const { logged, token } = [null, false];

  if (token === null && !logged) return <Navigate to={"/"} />;

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default LayoutPrivate;

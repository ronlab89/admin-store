import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>404</h1>
      <p>Page not found</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default NotFound;

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Root() {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default Root;

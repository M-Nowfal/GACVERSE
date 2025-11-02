import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default HomeLayout;

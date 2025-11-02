import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import HomeLayout from "./layouts/HomeLayout";
import PageNotFound from "./pages/PageNotFound";
import Course from "./pages/Course";
import Testimonials from "./pages/Testimonials";

const Router = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { 
          index: true,
          element: <Home />
        },
        {
          path: "courses",
          element: <Course />
        },
        {
          path: "reviews",
          element: <Testimonials />
        }
      ]
    },
    {
      path: "*",
      element: <PageNotFound />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default Router;

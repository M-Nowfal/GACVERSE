import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { 
  Home, PageNotFound, 
  Course, Testimonials, 
  LearnMore, GetStart, 
  VerifyOtp 
} from "./pages";
import HomeLayout from "./layouts/HomeLayout";

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
        },
        {
          path: "learnmore",
          element: <LearnMore />
        },
        {
          path: "getstart",
          element: <GetStart />
        },
        {
          path: "verify-otp",
          element: <VerifyOtp />
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

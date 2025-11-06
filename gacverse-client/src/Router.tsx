import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home, PageNotFound,
  Course, Testimonials,
  LearnMore, GetStart,
  VerifyOtp
} from "./pages";
import HomeLayout from "./layouts/HomeLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import CourseEnrollment from "./pages/CourseEnrollment";

const Router = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "courses", element: <Course /> },
        { path: "course/:id", element: <CourseEnrollment /> },
        { path: "reviews", element: <Testimonials /> },
        { path: "learnmore", element: <LearnMore /> },
        { path: "getstart", element: <GetStart /> },
        { path: "verify-otp", element: <VerifyOtp /> }
      ]
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: []
    },
    {
      path: "*",
      element: <PageNotFound />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default Router;

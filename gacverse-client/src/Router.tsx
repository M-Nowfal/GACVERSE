import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
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
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;

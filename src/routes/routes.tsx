import App from "@/App";
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import SecondaryLayout from "@/components/layout/SecondaryLayout";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { routesGenerator } from "@/utils/routesGenerator";
import { createBrowserRouter } from "react-router-dom";

import { managerPaths } from "./manager.routes";
import { userPaths } from "./user.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard/manager",
    element: (
      <>
        <ProtectedRoute>
          {" "}
          <SecondaryLayout />
        </ProtectedRoute>
      </>
    ),
    children: routesGenerator(managerPaths),
  },
  {
    path: "dashboard/user",
    element: (
      <>
        <ProtectedRoute>
          <SecondaryLayout />
        </ProtectedRoute>
      </>
    ),
    children: routesGenerator(userPaths),
  },
]);

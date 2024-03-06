import App from "@/App";
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import SecondaryLayout from "@/components/layout/SecondaryLayout";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { routesGenerator } from "@/utils/routesGenerator";
import { createBrowserRouter } from "react-router-dom";
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
    path: "dashboard",
    element: (
      <>
        <ProtectedRoute>
          {" "}
          <SecondaryLayout />
        </ProtectedRoute>
      </>
    ),
    children: routesGenerator(userPaths),
  },
]);

// import { createBrowserRouter } from "react-router-dom";
// import App from "../App";

// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import { routesGenerator } from "../utils/routesGenerator";
// import { adminPaths } from "./admin.routes";
// import { facultyPaths } from "./faculty.routes";
// import { studentPaths } from "./student.routes";
// import ProtectedRoute from "../components/layout/ProtectedRoute";
// import ChangePassword from "../pages/admin/ChangePassword";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/admin",
//     element: (
//       <ProtectedRoute role="admin">
//         <App />
//       </ProtectedRoute>
//     ),
//     children: routesGenerator(adminPaths),
//   },
//   {
//     path: "/faculty",
//     element: (
//       <ProtectedRoute role="faculty">
//         <App />
//       </ProtectedRoute>
//     ),
//     children: routesGenerator(facultyPaths),
//   },
//   {
//     path: "/student",
//     element: (
//       <ProtectedRoute role="student">
//         <App />
//       </ProtectedRoute>
//     ),
//     children: routesGenerator(studentPaths),
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/change-password",
//     element: <ChangePassword />,
//   },
// ]);

// export default router;

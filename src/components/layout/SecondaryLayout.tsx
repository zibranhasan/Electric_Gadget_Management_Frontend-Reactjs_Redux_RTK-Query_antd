const { Header, Content } = Layout;
import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./Sidebar";

// // const items: MenuProps["items"] = [
// //   {
// //     key: "Dashboard",
// //     label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
// //   },
// //   {
// //     key: "User Management",
// //     label: "User Management",
// //     children: [
// //       {
// //         key: "Create Admin",
// //         label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
// //       },
// //       {
// //         key: "Create Faculty",
// //         label: <NavLink to="/admin/create-faculty">Create Faculty</NavLink>,
// //       },
// //       {
// //         key: "Create Student",
// //         label: <NavLink to="/admin/create-student">Create Student</NavLink>,
// //       },
// //     ],
// //   },
// // ];

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header>
          {" "}
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

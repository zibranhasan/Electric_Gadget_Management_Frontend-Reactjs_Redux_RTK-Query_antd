const { Header, Content } = Layout;
import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, userCurrentToken } from "../../redux/features/auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./Sidebar";
import { useEffect, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { useGetOrdersByUserIdQuery } from "@/redux/features/cartApi";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(userCurrentToken);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      setUserId(decoded.userId);
    }
  }, [token]);

  const { data: ordersData } = useGetOrdersByUserIdQuery(userId, {
    skip: !userId,
  });

  const itemCount = useMemo(() => {
    if (!ordersData) return 0;
    return ordersData.reduce((count: number, order: any) => {
      return (
        count +
        order.items.reduce((sum: number, item: any) => sum + item.quantity, 0)
      );
    }, 0);
  }, [ordersData]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#001529",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            Items in Cart: {itemCount}
          </div>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
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

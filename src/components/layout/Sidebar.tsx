import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { TUser, userCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import { userPaths } from "@/routes/user.routes";

const { Sider } = Layout;

const userRole = {
  USER: "user",
};

const Sidebar = () => {
  const token = useAppSelector(userCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  console.log("user from sidebar", user);

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths);
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "Flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Electric Gadgets Shop</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;

import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { TUser, userCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import { userPaths } from "@/routes/user.routes";
import { Key } from "antd/es/table/interface";

const { Sider } = Layout;

const userRole = {
  USER: "user",
};

interface MenuItemType {
  key: Key;
  // Other properties specific to your MenuItemType
}

type ItemType<T = MenuItemType> = {
  key: Key;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  disabled?: boolean;
  // Other properties specific to your ItemType
  children?: ItemType<T>[];
} & T;

const Sidebar = () => {
  const token = useAppSelector(userCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  console.log("user from sidebar", user);

  let sidebarItems:
    | import("antd/es/menu/hooks/useItems").ItemType<MenuItemType>[]
    | undefined;

  switch ((user as TUser)!.role) {
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(
        userPaths
      ) as ItemType<MenuItemType>[];
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

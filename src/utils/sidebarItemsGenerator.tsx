import { TSidebarItem, TUserPath } from "@/types/sidebar.types";
import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: (
          <NavLink to={`/dashboard/${role}/${item.path}`}>{item.name}</NavLink>
        ),
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/dashboard/${role}/${child.path}`}>
                  {child.name}
                </NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc; // Ensure you return acc at the end of the reduce callback
  }, [] as TSidebarItem[]); // Initialize acc as an empty array with the correct type

  return sidebarItems;
};

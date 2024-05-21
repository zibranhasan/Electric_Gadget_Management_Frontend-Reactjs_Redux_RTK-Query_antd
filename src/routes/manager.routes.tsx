import AllElectricGadgets from "@/pages/AllElectricGadgets";
import CreateElectricGadgets from "@/pages/CreateElectricGadgets";
import DeleteElectricGadgets from "@/pages/DeleteElectricGadgets";
import DuplicateElectricGadgets from "@/pages/DuplicateElectricGadgets";
import OrderList from "@/pages/OrderList";
import SalesHistory from "@/pages/SalesHistory";
import ElectricGadgetFilter from "@/pages/SearchingGadgetsByFiltering";
import SingleElectricGadgetsDetails from "@/pages/SingleElectricGadgetsDetails";
import UpdateElectricGadgets from "@/pages/UpdateElectricGadgets";

export const managerPaths = [
  {
    name: "Electric gadgets Management",
    children: [
      {
        name: "All Electric Gadgets",
        path: "get-electric-gadgets",
        element: <AllElectricGadgets />,
      },
      {
        name: "Create Electric Gadgets",
        path: "create-electric-gadgets",
        element: <CreateElectricGadgets />,
      },
      {
        // name: "Academic Semester",
        path: "delete-electric-gadgets",
        element: <DeleteElectricGadgets />,
      },

      {
        name: "Get Electric Gadgets By Filtering",
        path: "get-electric-gadgets-by-filtering",
        element: <ElectricGadgetFilter />,
      },
      {
        path: "get-electric-gadgets-by-filtering/gadget-details/:_id",
        element: <SingleElectricGadgetsDetails />,
      },
      {
        path: "get-electric-gadgets-by-filtering/gadget-details/:gadgetId/update",
        element: <UpdateElectricGadgets />,
      },
      {
        path: "get-electric-gadgets/duplicateform",
        element: <DuplicateElectricGadgets />,
      },
      {
        name: "Sales History",
        path: "sales-history",
        element: <SalesHistory />,
      },
      {
        name: "Order List",
        path: "order-list",
        element: <OrderList />,
      },
    ],
  },
];

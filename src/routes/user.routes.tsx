import AllElectricGadgets from "@/pages/AllElectricGadgets";
import CreateElectricGadgets from "@/pages/CreateElectricGadgets";
import DeleteElectricGadgets from "@/pages/DeleteElectricGadgets";
import DuplicateElectricGadgets from "@/pages/DuplicateElectricGadgets";
import SalesHistory from "@/pages/SalesHistory";
import ElectricGadgetFilter from "@/pages/SearchingGadgetsByFiltering";
import SingleElectricGadgetsDetails from "@/pages/SingleElectricGadgetsDetails";
import UpdateElectricGadgets from "@/pages/UpdateElectricGadgets";

export const userPaths = [
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
    ],
  },
];

// Initialize acc as an empty array with the correct type

//Route banai nici union type thake.
// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }

//   return acc;
// }, []);

// //eirkm korle thik ace, valo korei kaj kortece
// export const adminRoute = [
//   {
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
// ];

import AllProducts from "@/pages/AllProducts";

import Checkout from "@/pages/Checkout";

export const userPaths = [
  {
    children: [
      {
        name: "Products",
        path: "products",
        element: <AllProducts />,
      },
      {
        name: "Checkout",
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
];

import {
  useDeleteCartMutation,
  useGetAllOrdersQuery,
  useUpdateCartMutation,
} from "@/redux/features/cartApi";
import { Table, Button } from "antd";

const OrderList = () => {
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    refetch,
  } = useGetAllOrdersQuery(undefined);
  const [deleteCart] = useDeleteCartMutation();
  const [updateCart] = useUpdateCartMutation();

  // Debugging: Log the fetched orders data
  console.log("ordersData:", ordersData?.data);

  const handleUpdateQuantity = async (
    userId: string,
    gadgetsId: string,
    change: number
  ) => {
    const orderContainingGadgetsId = ordersData?.data.find(
      (order) =>
        order.userId._id === userId &&
        order.items.find((i) => i.gadgetsId._id === gadgetsId)
    );

    if (!orderContainingGadgetsId) return;

    const itemContainingGadgetsId = orderContainingGadgetsId.items.find(
      (item) => item.gadgetsId._id === gadgetsId
    );

    if (!itemContainingGadgetsId || !itemContainingGadgetsId.gadgetsId) return;

    const currentQuantity = itemContainingGadgetsId.quantity || 0;
    const availableStock = itemContainingGadgetsId.gadgetsId.quantity || 0;

    const newQuantity = currentQuantity + change;

    if (newQuantity < 0 || newQuantity > availableStock) return;

    if (newQuantity === 0) {
      await handleDeleteItem(userId, gadgetsId);
      return;
    }

    try {
      await updateCart({
        userId,
        gadgetsId,
        quantity: newQuantity,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update cart", error);
    }
  };

  const handleDeleteItem = async (userId: string, gadgetsId: string) => {
    try {
      await deleteCart({ userId, gadgetsId }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const columns = [
    {
      title: "Sequence",
      key: "sequence",
      render: (_, __, index) => index + 1,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      render: (user) => user._id,
    },
    {
      title: "Username",
      dataIndex: "userId",
      key: "username",
      render: (user) => user.username,
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items, record) => (
        <ul>
          {items.map((item, itemIndex) => (
            <li key={item.gadgetsId._id}>
              {itemIndex + 1}. {item.gadgetsId.name} - Quantity: {item.quantity}
              <div>
                <Button
                  onClick={() =>
                    handleUpdateQuantity(
                      record.userId._id,
                      item.gadgetsId._id,
                      -1
                    )
                  }
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleUpdateQuantity(
                      record.userId._id,
                      item.gadgetsId._id,
                      1
                    )
                  }
                  style={{ marginLeft: 8 }}
                >
                  +
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Total Quantity",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];

  const dataSource = ordersData?.data
    ? ordersData.data.map((order, index) => {
        const totalQuantity = order.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        const totalPrice = order.items.reduce(
          (acc, item) => acc + item.quantity * item.gadgetsId.price,
          0
        );

        return {
          key: order._id,
          sequence: index + 1,
          userId: order.userId,
          items: order.items,
          totalQuantity,
          totalPrice,
        };
      })
    : [];

  return (
    <div>
      <h1>Order List</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={isOrdersLoading}
        pagination={false}
      />
    </div>
  );
};

export default OrderList;

import { Modal, Form, Input, DatePicker } from "antd";
import { userCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetOrdersByUserIdQuery,
  useDeleteCartMutation,
  useUpdateCartMutation,
} from "@/redux/features/cartApi";
import { useAppSelector } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "antd";
import { useAddTransactionsMutation } from "@/redux/features/transactionApi";

const Checkout = () => {
  const [addTransaction] = useAddTransactionsMutation();
  const token = useAppSelector(userCurrentToken);
  const [userId, setUserId] = useState<string | null>(null);
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      setUserId(decoded.userId);
    }
  }, [token]);

  const { data: ordersData, refetch } = useGetOrdersByUserIdQuery(userId, {
    skip: !userId,
  });

  const handleUpdateQuantity = async (gadgetsId: string, change: number) => {
    if (!userId || !ordersData) return;

    const orderContainingGadgetsId = ordersData.find((order) =>
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
      await handleDeleteItem(gadgetsId);
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

  const handleDeleteItem = async (gadgetsId: string) => {
    try {
      await deleteCart(gadgetsId).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const totalQuantity = ordersData
    ? ordersData.reduce(
        (acc, order) =>
          acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
        0
      )
    : 0;

  const totalPrice = ordersData
    ? ordersData.reduce(
        (acc, order) =>
          acc +
          order.items.reduce(
            (sum, item) => sum + item.quantity * item.gadgetsId.price,
            0
          ),
        0
      )
    : 0;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      await addTransaction({
        ...values,
        userId,
        totalQuantity,
        totalPrice,
      }).unwrap();
      handleCancel();
      refetch();
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div style={{ width: "70%" }}>
        <Row gutter={[16, 16]}>
          {ordersData && ordersData.length > 0 ? (
            ordersData.map((order) =>
              order.items.map((item) => (
                <Col span={8} key={item.gadgetsId._id}>
                  <Card
                    title={item.gadgetsId.name}
                    cover={
                      <img
                        alt={item.gadgetsId.name}
                        src={item.gadgetsId.photo}
                      />
                    }
                  >
                    <p>
                      <strong>Price:</strong> ${item.gadgetsId.price}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Brand:</strong> {item.gadgetsId.brand}
                    </p>
                    <p>
                      <strong>Available Stock:</strong>{" "}
                      {item.gadgetsId.quantity}
                    </p>
                    <p>
                      <strong>Model Number:</strong>{" "}
                      {item.gadgetsId.modelNumber}
                    </p>
                    <p>
                      <strong>Category:</strong> {item.gadgetsId.category}
                    </p>
                    <p>
                      <strong>Connectivity:</strong>{" "}
                      {item.gadgetsId.connectivity.join(", ")}
                    </p>
                    <p>
                      <strong>Power Source:</strong>{" "}
                      {item.gadgetsId.powerSource}
                    </p>
                    <p>
                      <strong>Features:</strong>{" "}
                      {item.gadgetsId.features.join(", ")}
                    </p>
                    <p>
                      <strong>Weight:</strong> {item.gadgetsId.weight} kg
                    </p>
                    <div>
                      <Button
                        onClick={() =>
                          handleUpdateQuantity(item.gadgetsId._id, -1)
                        }
                      >
                        -
                      </Button>
                      <Button
                        onClick={() =>
                          handleUpdateQuantity(item.gadgetsId._id, 1)
                        }
                        style={{ marginLeft: 8 }}
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => handleDeleteItem(item.gadgetsId._id)}
                        style={{ marginLeft: 8, color: "red" }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))
            )
          ) : (
            <p>No items found in your orders.</p>
          )}
        </Row>
      </div>

      {/* Cart Summary */}
      <div style={styles.cartSummary}>
        <h2 style={styles.cartSummaryTitle}>Cart Summary</h2>
        {ordersData && ordersData.length > 0 ? (
          ordersData.map((order) =>
            order.items.map((item) => (
              <div key={item.gadgetsId._id} style={styles.cartSummaryItem}>
                <p style={styles.cartSummaryItemName}>
                  <strong>{item.gadgetsId.name}</strong>
                </p>
                <p>
                  Quantity: {item.quantity} x ${item.gadgetsId.price} = $
                  {(item.quantity * item.gadgetsId.price).toFixed(2)}
                </p>
              </div>
            ))
          )
        ) : (
          <p>No items in the cart.</p>
        )}
        <hr />
        <p>
          <strong>Total Quantity:</strong> {totalQuantity}
        </p>
        <p>
          <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
        </p>
        <Button
          size="large"
          style={styles.transactionButton}
          onClick={showModal}
        >
          Transaction
        </Button>
      </div>

      <Modal
        title="Add Transaction"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Buyer's Name"
            name="buyersName"
            rules={[{ required: true, message: "Please enter buyer's name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[{ required: true, message: "Please enter contact number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Selling Date"
            name="sellingDate"
            rules={[{ required: true, message: "Please select selling date" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Checkout;

const styles = {
  cartSummary: {
    position: "fixed",
    top: "80px", // Adjusted top to account for Navbar height
    right: "20px",
    width: "25%",
    padding: "20px",
    border: "1px solid #e8e8e8",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cartSummaryTitle: {
    marginBottom: "20px",
  },
  cartSummaryItem: {
    marginBottom: "10px",
  },
  cartSummaryItemName: {
    fontSize: "16px",
  },
  transactionButton: {
    width: "100%",
    backgroundColor: "#4CAF50",
    color: "white",
  },
};

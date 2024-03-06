/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, DatePicker, Checkbox, Button } from "antd";
import dayjs from "dayjs";

const ElectricGadgetForm = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Ensure the container takes at least the full height of the viewport
  };

  const formStyle = {
    width: "400px", // Set a fixed width for the form if needed
  };

  // Format releaseDate to MM-DD-YY

  const onFinish = (values: any) => {
    // Convert releaseDate from moment to dayjs object
    const releaseDate = dayjs(values.releaseDate);

    // Format releaseDate to MM-DD-YY
    const formattedReleaseDate = releaseDate.format("MM-DD-YY");

    console.log("Success:", values);
    console.log("Formatted Release Date:", formattedReleaseDate);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={containerStyle}>
      <Form
        name="electricGadgetForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={formStyle}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              message: "Please input a valid price!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Quantity" name="quantity">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Release Date" name="releaseDate">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Brand" name="brand">
          <Input />
        </Form.Item>

        <Form.Item label="Model Number" name="modelNumber">
          <Input />
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Input />
        </Form.Item>

        <Form.Item label="Operating System" name="operatingSystem">
          <Input />
        </Form.Item>

        <Form.Item label="Connectivity" name="connectivity">
          <Checkbox.Group>
            <Checkbox value="wifi">Wi-Fi</Checkbox>
            <Checkbox value="bluetooth">Bluetooth</Checkbox>
            {/* Add more checkboxes as needed */}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="Power Source" name="powerSource">
          <Input />
        </Form.Item>

        <Form.Item label="Features" name="features">
          <Checkbox.Group>
            <Checkbox value="touchscreen">Touchscreen</Checkbox>
            <Checkbox value="waterproof">Waterproof</Checkbox>
            {/* Add more checkboxes as needed */}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="Weight" name="weight">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Dimensions" name="dimensions">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ElectricGadgetForm;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Form, Input } from "antd";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";

const commonFormStyles = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "400px",
  width: "100%",
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const [register, { error }] = useRegisterMutation();
  console.log(error);

  const onFinish = async (values: FieldType) => {
    try {
      const res = await register(values).unwrap();
      console.log(res);
      navigate("/login");
      // Handle successful registration if needed
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username: string;
    email: string;
    password: string;
    remember: boolean;
  };

  return (
    <Form
      style={{ ...commonFormStyles, margin: "auto" }}
      name="userForm"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Please enter your username!" },
          { whitespace: true, message: "Username cannot be empty!" },
          { max: 50, message: "Username cannot exceed 50 characters!" },
        ]}
      >
        <Input placeholder="Enter your username" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Please enter a valid email address!" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please enter your password!" },
          { min: 6, message: "Password must be at least 6 characters!" },
        ]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
            backgroundColor: "#1890ff",
            borderColor: "#1890ff",
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;

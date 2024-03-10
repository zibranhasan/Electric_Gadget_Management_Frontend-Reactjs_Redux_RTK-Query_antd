import { useAddGadgetsMutation } from "@/redux/features/electricGadgetsManagement.Api";
import { Form, Input, Button, DatePicker, message } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface ElectricGadget {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  modelNumber: string;
  category: string;
  operatingSystem?: string;
  connectivity?: string;
  powerSource?: string;
  features?: string;
  weight?: number;
  dimensions?: string;
}

interface FormData extends ElectricGadget {
  releaseDate: string; // Adjust the type of releaseDate to string
}

const CreateElectricGadgets = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [addGadgets, { isLoading }] = useAddGadgetsMutation(); //eta hocce main.
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Convert comma-separated strings to arrays
    const formattedData = {
      ...data,
      connectivity: data.connectivity ? data.connectivity.split(", ") : [],
      features: data.features ? data.features.split(", ") : [],
    };
    try {
      // Trigger the mutation
      await addGadgets(formattedData);

      // Check if the mutation was successful

      message.success("Gadgets created successfully");
      // Redirect to the specified URL after successful creation
      navigate("/dashboard/get-electric-gadgets-by-filtering");

      // Submit data to backend or perform necessary action
    } catch (error) {
      // Handle error if the mutation fails
      message.error("Error creating gadget");
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Name">
        <Input
          {...register("name")}
          onChange={(e) => setValue("name", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Price">
        <Input
          type="number" // Set type to "number"
          {...register("price", { valueAsNumber: true })} // Use valueAsNumber option
          onChange={(e) => setValue("price", parseFloat(e.target.value))}
        />
      </Form.Item>
      <Form.Item label="Quantity">
        <Input
          type="number" // Set type to "number"
          {...register("quantity", { valueAsNumber: true })} // Use valueAsNumber option
          onChange={(e) => setValue("quantity", parseFloat(e.target.value))}
        />
      </Form.Item>
      <DatePicker
        style={{ width: "100%" }}
        format="YYYY-MM-DD"
        {...register("releaseDate")}
        onChange={(_date, dateString) =>
          setValue("releaseDate", dateString, { shouldDirty: true })
        }
      />
      <Form.Item label="Brand">
        <Input
          {...register("brand")}
          onChange={(e) => setValue("brand", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Model-Number">
        <Input
          {...register("modelNumber")}
          onChange={(e) => setValue("modelNumber", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Category">
        <Input
          {...register("category")}
          onChange={(e) => setValue("category", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Operating System">
        <Input
          {...register("operatingSystem")}
          onChange={(e) => setValue("operatingSystem", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Connectivity">
        <Input
          {...register("connectivity")}
          onChange={(e) => setValue("connectivity", e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Power Source">
        <Input
          {...register("powerSource")}
          onChange={(e) => setValue("powerSource", e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Features">
        <Input
          {...register("features")}
          onChange={(e) => setValue("features", e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Weight">
        <Input
          type="number" // Set type to "number"
          {...register("weight", { valueAsNumber: true })} // Use valueAsNumber option
          onChange={(e) => setValue("weight", parseFloat(e.target.value))}
        />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateElectricGadgets;

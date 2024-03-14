import { useAddGadgetsMutation } from "@/redux/features/electricGadgetsManagement.Api";
import { Form, Input, Button, DatePicker, message } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";

export interface ElectricGadget {
  _id: string;
  name: string;
  photo: File | null;
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
  // Move the function declaration to the top of the component

  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [addGadgets, { isLoading }] = useAddGadgetsMutation(); //eta hocce main.
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("image", data.photo);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=963ca9297bc7cea248773301a33b8428",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set proper content type for FormData
        },
      }
    );

    // Convert comma-separated strings to arrays
    const formattedData = {
      ...data,
      photo: response.data.data.display_url,
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
      {/* Photo field using react-dropzone */}
      <Form.Item label="Photo">
        <Dropzone
          onDrop={(acceptedFiles) => {
            setValue("photo", acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              style={{
                border: "1px dashed #ccc",
                padding: "20px",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
      </Form.Item>

      <Form.Item label="Price">
        <Input
          type="number" // Set type to "number"
          {...register("price")} // Use valueAsNumber option
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
        {/* <Button loading={isLoading} htmlType="submit">
          Submit
        </Button> */}
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default CreateElectricGadgets;

import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, DatePicker, message } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import {
  useGetGadgetsByIdQuery,
  useUpdateGadgetsMutation,
} from "@/redux/features/electricGadgetsManagement.Api";
import { useNavigate, useParams } from "react-router-dom";

type FormData = {
  name: string;
  price: string;
  quantity: number;
  releaseDate: Date;
  brand: string;
  modelNumber: string;
  category: string;
  operatingSystem: string;
  powerSource: string;
  connectivity: string | string[];
  features: string | string[];
  weight: number;
  photo: File | null;
};

const UpdateElectricGadgets = () => {
  const { gadgetId } = useParams();
  const navigate = useNavigate();
  const { data: singleGadgetData, isLoading } =
    useGetGadgetsByIdQuery(gadgetId);

  const [updateGadgets] = useUpdateGadgetsMutation();

  const { register, handleSubmit, setValue, control } = useForm<FormData>();

  useEffect(() => {
    if (!isLoading && singleGadgetData) {
      const {
        name,
        price,
        quantity,
        releaseDate,
        brand,
        modelNumber,
        category,
        operatingSystem,
        connectivity,
        powerSource,
        features,
        weight,
      } = singleGadgetData.data;

      // Set form values using setValue
      setValue("name", name);
      setValue("price", price);
      setValue("quantity", quantity);
      setValue("releaseDate", new Date(releaseDate)); // Convert to Date
      setValue("brand", brand);
      setValue("modelNumber", modelNumber);
      setValue("category", category);
      setValue("operatingSystem", operatingSystem);
      setValue("connectivity", connectivity);
      setValue("powerSource", powerSource);
      setValue("features", features);
      setValue("weight", weight);
    }
  }, [isLoading, singleGadgetData, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      let photoURL = singleGadgetData.data.photo;

      if (formData.photo) {
        const formDataToSend = new FormData();
        formDataToSend.append("image", formData.photo);

        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=963ca9297bc7cea248773301a33b8428",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        photoURL = response.data.data.display_url;
      }

      const connectivityArray = Array.isArray(formData.connectivity)
        ? formData.connectivity
        : formData.connectivity.split(",");

      const featuresArray = Array.isArray(formData.features)
        ? formData.features
        : formData.features.split(",");

      const dataToSend = {
        ...formData,
        photo: photoURL,
        connectivity: connectivityArray,
        features: featuresArray,
      };

      // console.log("dataToSend", dataToSend);
      await updateGadgets({ _id: gadgetId, data: { ...dataToSend } });

      message.success("Gadgets updated successfully");
      navigate(
        `/dashboard/manager/get-electric-gadgets-by-filtering/gadget-details/${gadgetId}`
      );
    } catch (error) {
      message.error("Error updating gadget");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="name">Name:</label>
        <input
          style={{ width: "100%" }}
          {...register("name")}
          type="text"
          id="name"
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="photo">Photo:</label>
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <Dropzone
              onDrop={(acceptedFiles) => field.onChange(acceptedFiles[0])}
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
                  <p>Drag 'n' drop a file here, or click to select a file</p>
                </div>
              )}
            </Dropzone>
          )}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="price">Price:</label>
        <input
          style={{ width: "100%" }}
          {...register("price")}
          type="number"
          id="price"
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="quantity">Quantity:</label>
        <input
          style={{ width: "100%" }}
          {...register("quantity")}
          type="number"
          id="quantity"
        />
      </div>
      <div>
        <label htmlFor="releaseDate">Release Date:</label>
        <Controller
          name="releaseDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              onChange={(_, dateString) => field.onChange(new Date(dateString))}
            />
          )}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="brand">Brand:</label>
        <input
          style={{ width: "100%" }}
          {...register("brand")}
          type="text"
          id="brand"
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="modelNumber">Model Number:</label>
        <input
          style={{ width: "100%" }}
          {...register("modelNumber")}
          type="text"
          id="modelNumber"
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="category">Category:</label>
        <input
          style={{ width: "100%" }}
          {...register("category")}
          type="text"
          id="category"
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="operatingSystem">Operating System:</label>
        <input
          style={{ width: "100%" }}
          {...register("operatingSystem")}
          type="text"
          id="operatingSystem"
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="powerSource">Power Source:</label>
        <input
          style={{ width: "100%" }}
          {...register("powerSource")}
          type="text"
          id="powerSource"
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="connectivity">Connectivity:</label>
        <input
          style={{ width: "100%" }}
          {...register("connectivity")}
          type="text"
          id="connectivity"
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="features">Features:</label>
        <input
          style={{ width: "100%" }}
          {...register("features")}
          type="text"
          id="features"
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="weight">Weight:</label>
        <input
          style={{ width: "100%" }}
          {...register("weight")}
          type="number"
          id="weight"
        />
      </div>

      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default UpdateElectricGadgets;

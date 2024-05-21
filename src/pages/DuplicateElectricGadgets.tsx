import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, DatePicker, message } from "antd";
import {
  useAddGadgetsMutation,
  useGetGadgetsByIdQuery,
} from "@/redux/features/electricGadgetsManagement.Api";
import { useLocation, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";

type FormDataType = {
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

const DuplicateElectricGadgets = () => {
  const location = useLocation();
  const preFilledData = location.state?.preFilledData || {};
  const navigate = useNavigate();

  const { data: singleGadgetData } = useGetGadgetsByIdQuery(preFilledData?._id);
  const [addGadgets, { isLoading }] = useAddGadgetsMutation();
  const { register, handleSubmit, setValue } = useForm<FormDataType>();

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

      setValue("name", name || "");
      setValue("price", price || "");
      setValue("quantity", quantity || "");
      setValue("releaseDate", new Date(releaseDate));
      setValue("brand", brand || "");
      setValue("modelNumber", modelNumber || "");
      setValue("category", category || "");
      setValue("operatingSystem", operatingSystem || "");
      setValue(
        "connectivity",
        Array.isArray(connectivity)
          ? connectivity
          : connectivity
          ? connectivity.split(",")
          : []
      );
      setValue("powerSource", powerSource || "");
      setValue(
        "features",
        Array.isArray(features) ? features : features ? features.split(",") : []
      );
      setValue("weight", weight || "");
    }
  }, [isLoading, singleGadgetData, setValue]);

  const onSubmit: SubmitHandler<FormDataType> = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.photo || "");

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=963ca9297bc7cea248773301a33b8428",
        formDataToSend
      );
      const connectivityArray = Array.isArray(formData.connectivity)
        ? formData.connectivity
        : formData.connectivity
        ? formData.connectivity.split(",")
        : [];
      const featuresArray = Array.isArray(formData.features)
        ? formData.features
        : formData.features
        ? formData.features.split(",")
        : [];

      const dataToSend = {
        ...formData,
        photo: response.data.data.display_url,
        connectivity: connectivityArray,
        features: featuresArray,
      };

      await addGadgets(dataToSend);
      message.success("Gadget duplicated successfully");
      navigate("/dashboard/manager/get-electric-gadgets-by-filtering");
    } catch (error) {
      message.error("Error duplicating gadget");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="photo">Photo:</label>
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
      </div>

      <div
        style={{ margin: "10px 0", display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="features">Features:</label>
        <input
          style={{ width: "100%", fontSize: "20px" }}
          {...register("features")}
          type="text"
          id="features"
          defaultValue={singleGadgetData?.data?.features.join(",") || ""}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="connectivity">Connectivity:</label>
        <input
          style={{ width: "100%" }}
          {...register("connectivity")}
          type="text"
          id="connectivity"
          defaultValue={singleGadgetData?.data?.connectivity.join(",") || ""}
        />
      </div>
      <div>
        <label htmlFor="releaseDate">Release Date:</label>
        <DatePicker
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
          {...register("releaseDate")}
          onChange={(_date, dateString) =>
            setValue("releaseDate", new Date(dateString), { shouldDirty: true })
          }
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="name">Name:</label>
        <input
          style={{ width: "100%" }}
          {...register("name")}
          type="text"
          id="name"
          defaultValue={singleGadgetData?.data?.name || ""}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="price">Price:</label>
        <input
          style={{ width: "100%" }}
          {...register("price")}
          type="number"
          id="price"
          defaultValue={singleGadgetData?.data?.price || ""}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="brand">Brand:</label>
        <input
          style={{ width: "100%" }}
          {...register("brand")}
          type="text"
          id="brand"
          defaultValue={singleGadgetData?.data?.brand || ""}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="modelNumber">modelNumber:</label>
        <input
          style={{ width: "100%" }}
          {...register("modelNumber")}
          type="text"
          id="modelNumber"
          defaultValue={singleGadgetData?.data?.modelNumber || ""}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="category">Category:</label>
        <input
          style={{ width: "100%" }}
          {...register("category")}
          type="text"
          id="category"
          defaultValue={singleGadgetData?.data?.category || ""}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="operatingSystem">Operating-System:</label>
        <input
          style={{ width: "100%" }}
          {...register("operatingSystem")}
          type="text"
          id="operatingSystem"
          defaultValue={singleGadgetData?.data?.operatingSystem || ""}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="powerSource">Power-Source:</label>
        <input
          style={{ width: "100%" }}
          {...register("powerSource")}
          type="text"
          id="powerSource"
          defaultValue={singleGadgetData?.data?.powerSource || ""}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="weight">Weight:</label>
        <input
          style={{ width: "100%" }}
          {...register("weight")}
          type="number"
          id="weight"
          defaultValue={singleGadgetData?.data?.weight || ""}
        />
      </div>

      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default DuplicateElectricGadgets;

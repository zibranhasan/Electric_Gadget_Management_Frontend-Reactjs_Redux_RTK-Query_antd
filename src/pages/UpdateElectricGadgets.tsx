import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, DatePicker } from "antd";
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
};

const UpdateElectricGadgets = () => {
  const { gadgetId } = useParams();
  const navigate = useNavigate();
  const { data: singleGadgetData, isLoading } =
    useGetGadgetsByIdQuery(gadgetId);

  const [updateGadgets] = useUpdateGadgetsMutation();

  const { register, handleSubmit, setValue } = useForm<FormData>();

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

      // Check if connectivity is a string before splitting
      setValue("connectivity", connectivity);
      // Check if features is a string before splitting
      setValue("powerSource", powerSource);
      setValue("features", features);
      setValue("weight", weight);
    }
  }, [isLoading, singleGadgetData, setValue]);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    // Ensure connectivity is an array
    const connectivityArray = Array.isArray(formData?.connectivity)
      ? formData?.connectivity
      : typeof formData?.connectivity === "string"
      ? formData?.connectivity.split(",")
      : [];

    // Ensure features is an array
    const featuresArray = Array.isArray(formData?.features)
      ? formData?.features
      : typeof formData?.features === "string"
      ? formData?.features.split(",")
      : [];

    const dataToSend = {
      data: {
        ...formData,
        connectivity: connectivityArray,
        features: featuresArray,
      },
      _id: gadgetId,
    };

    updateGadgets(dataToSend);

    navigate(
      `/dashboard/get-electric-gadgets-by-filtering/gadget-details/${gadgetId}`
    );

    // Now you can send `dataToSend` to your backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          onChange={(date, dateString) =>
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

export default UpdateElectricGadgets;
{
  /* <DatePicker
style={{ width: "100%" }}
format="YYYY-MM-DD"
{...register("releaseDate")}
onChange={(date, dateString) =>
  setValue("releaseDate", new Date(dateString), { shouldDirty: true })
}
/> */
}
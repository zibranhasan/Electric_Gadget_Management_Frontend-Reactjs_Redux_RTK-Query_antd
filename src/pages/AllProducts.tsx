import { userCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetOrdersByUserIdQuery,
  useUpdateCartMutation,
} from "@/redux/features/cartApi";
import {
  useGetAllGadgetsQuery,
  useGetGadgetsByFilteringQuery,
} from "@/redux/features/electricGadgetsManagement.Api";
import { useAppSelector } from "@/redux/hooks";
import { Button, Card, Row, Select, Slider, Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  DecodedToken,
  ElectricGadget,
  Order,
  OrderItem,
} from "@/types/cartTypes";

const { Option } = Select;

type FilterOptionsKey =
  | "priceRange"
  | "brand"
  | "modelNumber"
  | "category"
  | "operatingSystem"
  | "connectivity"
  | "powerSource"
  | "features";

const AllProducts: React.FC = () => {
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [brandOptions, setBrandOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [modelNumberOptions, setModelNumberOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [operatingSystemOptions, setOperatingSystemOptions] = useState<
    { value: string | undefined; label: string | undefined }[]
  >([]);
  const [powerSourceOptions, setPowerSourceOptions] = useState<
    { value: string | undefined; label: string | undefined }[]
  >([]);
  const [featuresOptions, setFeaturesOptions] = useState<
    { value: string | undefined; label: string | undefined }[]
  >([]);
  const [connectivityOptions, setConnectivityOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const token = useAppSelector(userCurrentToken);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.userId);
    }
  }, [token]);

  const { data: ordersData, isLoading: isOrdersLoading } =
    useGetOrdersByUserIdQuery(userId, {
      skip: !userId,
    });

  // console.log(ordersData);

  const orderedGadgetIds = useMemo(() => {
    if (!ordersData) return [];
    return ordersData.flatMap((order: Order) =>
      order.items.map((item: OrderItem) => item.gadgetsId._id.toString())
    );
  }, [ordersData]);

  const [updateCart] = useUpdateCartMutation();

  const [filterOptions, setFilterOptions] = useState<{
    priceRange: [number, number];
    brand: string;
    modelNumber: string;
    category: string;
    operatingSystem: string;
    connectivity: string[];
    powerSource: string;
    features: string[];
  }>({
    priceRange: [0, 99990],
    brand: "",
    modelNumber: "",
    category: "",
    operatingSystem: "",
    connectivity: [],
    powerSource: "",
    features: [],
  });

  const { data: gadgetsData } = useGetAllGadgetsQuery("");
  // console.log(gadgetsData);

  //This is for category
  useEffect(() => {
    // Generate options for the Brand Select based on gadgetData
    const categoryOptions = gadgetsData?.data?.map((item) => ({
      value: item.category,
      label: item.category,
    }));
    // Set the brand options in the state
    setCategoryOptions(categoryOptions || []);
  }, [gadgetsData]);
  //This is for brand
  useEffect(() => {
    // Generate options for the Brand Select based on gadgetData
    const options = gadgetsData?.data?.map((item) => ({
      value: item.brand,
      label: item.brand,
    }));
    // Set the brand options in the state
    setBrandOptions(options || []);
  }, [gadgetsData]);
  //This is for model number
  useEffect(() => {
    // Generate options for the Brand Select based on gadgetData
    const options = gadgetsData?.data?.map((item) => ({
      value: item.modelNumber,
      label: item.modelNumber,
    }));
    // Set the brand options in the state
    setModelNumberOptions(options || []);
  }, [gadgetsData]);
  //This is for operating system
  useEffect(() => {
    // Generate options for the Brand Select based on gadgetData
    const options = gadgetsData?.data?.map((item) => ({
      value: item.operatingSystem,
      label: item.operatingSystem,
    }));
    // Set the brand options in the state
    setOperatingSystemOptions(options || []);
  }, [gadgetsData]);
  //This is for power source
  useEffect(() => {
    // Generate options for the Brand Select based on gadgetData
    const options = gadgetsData?.data?.map((item) => ({
      value: item.powerSource,
      label: item.powerSource,
    }));

    setPowerSourceOptions(options || []);
  }, [gadgetsData]);
  //This is for features
  useEffect(() => {
    // Generate options for the Power Source Select based on gadgetData
    const options =
      gadgetsData?.data?.reduce<{ value: string; label: string }[]>(
        (acc, item) => {
          if (Array.isArray(item.features)) {
            item.features.forEach((featuresItem) => {
              acc.push({
                value: featuresItem || "", // Provide a default value if featuresItem is undefined
                label: featuresItem || "",
              });
            });
          }
          return acc;
        },
        []
      ) || [];
    setFeaturesOptions(options);

    setFeaturesOptions(options || []);
  }, [gadgetsData]);

  //This is for connectivity
  useEffect(() => {
    // Generate options for the Power Source Select based on gadgetData
    const options =
      gadgetsData?.data?.reduce<{ value: string; label: string }[]>(
        (acc, item) => {
          if (Array.isArray(item.connectivity)) {
            item.connectivity.forEach((connectivityItem) => {
              acc.push({
                value: connectivityItem || "", // Provide a default value if connectivityItem is undefined
                label: connectivityItem || "",
              });
            });
          }
          return acc;
        },
        []
      ) || [];
    setConnectivityOptions(options);
  }, [gadgetsData]);

  // console.log(categoryOptions);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: FilterOptionsKey, value: any) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMultiSelectChange = (key: FilterOptionsKey, values: any[]) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [key]: values,
    }));
  };

  const handleFilterSubmit = () => {
    // Handle filter submission here
  };

  const { data: gadgetsDataResponse, isLoading: isGadgetsLoading } =
    useGetGadgetsByFilteringQuery(filterOptions);

  const gadgetsDataByFiltering: ElectricGadget[] = Array.isArray(
    gadgetsDataResponse?.data?.response
  )
    ? gadgetsDataResponse.data.response
    : [];

  const handleAddToCart = async (gadget_Id: string) => {
    try {
      await updateCart({ userId, gadgetsId: gadget_Id, quantity: 1 }).unwrap();
      console.log("Cart updated successfully");
    } catch (error) {
      console.error("Failed to update cart", error);
    }
  };

  if (isGadgetsLoading || isOrdersLoading) {
    return <Spin size="large" />;
  }

  const renderFilterOptions = (
    label: string,
    key: FilterOptionsKey,
    options: { value: string | undefined; label: string | undefined }[],
    isMultiSelect = false
  ) => (
    <div style={{ marginBottom: "20px" }}>
      <h1 style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}>
        {label}:
      </h1>
      <Select
        mode={isMultiSelect ? "multiple" : undefined}
        allowClear
        placeholder={`Select ${label}`}
        style={{ width: 200, marginRight: 16 }}
        value={filterOptions[key]}
        onChange={(value) => {
          if (isMultiSelect) {
            if (Array.isArray(value)) {
              handleMultiSelectChange(key, value);
            }
          } else {
            handleFilterChange(key, value);
          }
        }}
      >
        {options.length > 0 && (
          <>
            <Option key="heading" disabled>
              {`Filtering according to ${label.toLowerCase()}`}
            </Option>
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </>
        )}
      </Select>
    </div>
  );

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        <div style={{ marginBottom: "20px" }}>
          {renderFilterOptions("Category", "category", categoryOptions)}
          {renderFilterOptions("Brand", "brand", brandOptions)}
          {renderFilterOptions(
            "Model Number",
            "modelNumber",
            modelNumberOptions
          )}
          {renderFilterOptions(
            "Operating System",
            "operatingSystem",
            operatingSystemOptions
          )}
          {renderFilterOptions(
            "Connectivity",
            "connectivity",
            connectivityOptions,
            true
          )}
          {renderFilterOptions(
            "Power Source",
            "powerSource",
            powerSourceOptions
          )}
          {renderFilterOptions("Features", "features", featuresOptions, true)}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}
            >
              Price:
            </h1>
            <Slider
              range
              defaultValue={[0, 99990]}
              style={{ width: 200, marginRight: 16 }}
              value={filterOptions.priceRange}
              onChange={(value) => handleFilterChange("priceRange", value)}
            />
          </div>
          <Button onClick={handleFilterSubmit}>Filter</Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {gadgetsDataByFiltering.map((gadget: ElectricGadget) => {
            const isAddedToCart = orderedGadgetIds.includes(
              gadget._id.toString()
            );
            return (
              <Card
                key={gadget._id}
                style={{ width: 300, margin: 16 }}
                cover={<img alt={gadget.name} src={gadget.photo} />}
              >
                <h2>{gadget.name}</h2>
                <p>Price: ${gadget.price}</p>
                <p>Brand: {gadget.brand}</p>
                <p>Quantity: {gadget.quantity}</p>
                <Button
                  className="custom-button"
                  onClick={() => handleAddToCart(gadget._id)}
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                </Button>
              </Card>
            );
          })}
        </div>
      </Row>
    </div>
  );
};

export default AllProducts;

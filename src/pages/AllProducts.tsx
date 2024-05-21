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

const { Option } = Select;

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
      const decoded: any = jwtDecode(token);
      setUserId(decoded.userId);
    }
  }, [token]);

  const { data: ordersData, isLoading: isOrdersLoading } =
    useGetOrdersByUserIdQuery(userId, {
      skip: !userId,
    });

  const orderedGadgetIds = useMemo(() => {
    if (!ordersData) return [];
    return ordersData.flatMap((order: any) =>
      order.items.map((item: any) => item.gadgetsId._id.toString())
    );
  }, [ordersData]);

  const [updateCart] = useUpdateCartMutation();

  const [filterOptions, setFilterOptions] = useState({
    priceRange: [0, 99990],
    brand: "",
    modelNumber: "",
    category: "",
    operatingSystem: "",
    connectivity: [],
    powerSource: "",
    features: [],
  });

  const { data: gadgetsData } = useGetAllGadgetsQuery(undefined);

  useEffect(() => {
    if (gadgetsData && Array.isArray(gadgetsData.data)) {
      const uniqueOptions = (key: string) =>
        [...new Set(gadgetsData?.data.map((item) => item[key]))].map(
          (value) => ({ value, label: value })
        );

      setCategoryOptions(uniqueOptions("category"));
      setBrandOptions(uniqueOptions("brand"));
      setModelNumberOptions(uniqueOptions("modelNumber"));
      setOperatingSystemOptions(uniqueOptions("operatingSystem"));
      setPowerSourceOptions(uniqueOptions("powerSource"));

      const mapOptions = (key: string) => {
        const options = gadgetsData.data.reduce(
          (acc: { value: string; label: string }[], item) => {
            if (Array.isArray(item[key])) {
              item[key].forEach((option) => {
                acc.push({ value: option, label: option });
              });
            }
            return acc;
          },
          []
        );
        return [
          ...new Set(options.map((option) => JSON.stringify(option))),
        ].map((option) => JSON.parse(option));
      };

      setFeaturesOptions(mapOptions("features"));
      setConnectivityOptions(mapOptions("connectivity"));
    }
  }, [gadgetsData]);

  const handleFilterChange = (key: string, value: any) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
  };

  const handleMultiSelectChange = (key: string, values: any[]) => {
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

  const gadgetsDataByFiltering = gadgetsDataResponse?.data.response || [];

  const handleAddToCart = async (gadget_Id: any) => {
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
    key: string,
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
        onChange={(value) =>
          isMultiSelect
            ? handleMultiSelectChange(key, value)
            : handleFilterChange(key, value)
        }
      >
        {options.length > 0 && (
          <>
            <Option
              key="heading"
              disabled
            >{`Filtering according to ${label.toLowerCase()}`}</Option>
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
          {gadgetsDataByFiltering.map((gadget) => {
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

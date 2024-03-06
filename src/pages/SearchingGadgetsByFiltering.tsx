import React, { useEffect, useState } from "react";
import { Button, Table, Slider, Select, DatePicker, Modal, Input } from "antd";
import {
  useGetAllGadgetsQuery,
  useGetGadgetsByFilteringQuery,
} from "@/redux/features/electricGadgetsManagement.Api";
const { Option } = Select;
import moment from "moment";
import { useAddsalesMutation } from "@/redux/features/salesManagement.Api";
import { Link } from "react-router-dom";
import { ElectricGadget } from "./CreateElectricGadgets";

const ElectricGadgetFilter: React.FC = () => {
  const [categoryOptions, setcategoryOptions] = useState([]);
  const [brandOptions, setbrandOptions] = useState([]);
  const [modelNumberOptions, setmodelNumberOptions] = useState([]);
  const [operatingSystemOptions, setoperatingSystemOptions] = useState([]);
  const [powerSourceOptions, setpowerSourceOptions] = useState([]);
  const [featuresOptions, setfeaturesOptions] = useState([]);
  const [connectivityOptions, setConnectivityOptions] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    priceRange: [0, 99990],
    releaseDate: undefined,
    brand: "",
    modelNumber: "",
    category: "",
    operatingSystem: "",
    connectivity: [],
    powerSource: "",
    features: [],
  });
  const [sellModalVisible, setSellModalVisible] = useState(false);

  const [sellFormData, setSellFormData] = useState({
    quantity: 1,
    buyerName: "",
    saleDate: null, // Set initial value as null
  });

  const handleSellClick = (product: ElectricGadget) => {
    setSellModalVisible(true);
    // You can set initial quantity based on gadgetsData
    setSellFormData((prevData) => ({
      ...prevData,
      productId: product._id,
      quantity: product.quantity,
    }));
  };

  const handleSellCancel = () => {
    setSellModalVisible(false);
    setSellFormData({
      quantity: 1,
      buyerName: "",
      saleDate: null,
    });
  };

  const [addSales] = useAddsalesMutation();

  const handleSellSubmit = async () => {
    try {
      // Validate form data (add more validation as needed)
      if (sellFormData.quantity <= 0) {
        // You can show an error message or handle it as needed
        return;
      }

      const sellProduct = {
        productId: sellFormData.productId,
        quantity: sellFormData.quantity,
        buyerName: sellFormData.buyerName,
        saleDate: sellFormData.saleDate,
      };
      addSales(sellProduct);
      handleSellCancel();
    } catch (error) {
      // Handle error, show error message, etc.
    }
  };

  const { data: gadgetsData } = useGetAllGadgetsQuery(undefined);
  //This is for category
  useEffect(() => {
    // Generate options for the Brand Select based on gadgetData
    const categoryOptions = gadgetsData?.data?.map((item) => ({
      value: item.category,
      label: item.category,
    }));
    // Set the brand options in the state
    setcategoryOptions(categoryOptions || []);
  }, [gadgetsData]);
  //This is for brand
  useEffect(() => {
    // Generate options for the Brand Select based on gadgetData
    const options = gadgetsData?.data?.map((item) => ({
      value: item.brand,
      label: item.brand,
    }));
    // Set the brand options in the state
    setbrandOptions(options || []);
  }, [gadgetsData]);
  //This is for model number
  useEffect(() => {
    // Generate options for the Brand Select based on gadgetData
    const options = gadgetsData?.data?.map((item) => ({
      value: item.modelNumber,
      label: item.modelNumber,
    }));
    // Set the brand options in the state
    setmodelNumberOptions(options || []);
  }, [gadgetsData]);
  //This is for operating system
  useEffect(() => {
    // Generate options for the Brand Select based on gadgetData
    const options = gadgetsData?.data?.map((item) => ({
      value: item.operatingSystem,
      label: item.operatingSystem,
    }));
    // Set the brand options in the state
    setoperatingSystemOptions(options || []);
  }, [gadgetsData]);
  //This is for power source
  useEffect(() => {
    // Generate options for the Brand Select based on gadgetData
    const options = gadgetsData?.data?.map((item) => ({
      value: item.powerSource,
      label: item.powerSource,
    }));

    setpowerSourceOptions(options || []);
  }, [gadgetsData]);
  //This is for features
  useEffect(() => {
    // Generate options for the Power Source Select based on gadgetData
    const options = gadgetsData?.data?.reduce((acc, item) => {
      // Assuming item.power is an array
      if (Array.isArray(item.features)) {
        item.features.forEach((featuresItem) => {
          acc.push({
            value: featuresItem,
            label: featuresItem,
          });
        });
      }
      return acc;
    }, []);

    setfeaturesOptions(options || []);
  }, [gadgetsData]);

  //This is for connectivity
  useEffect(() => {
    // Generate options for the Power Source Select based on gadgetData
    const options = gadgetsData?.data?.reduce((acc, item) => {
      // Assuming item.power is an array
      if (Array.isArray(item.connectivity)) {
        item.connectivity.forEach((connectivityItem) => {
          acc.push({
            value: connectivityItem,
            label: connectivityItem,
          });
        });
      }
      return acc;
    }, []);

    setConnectivityOptions(options || []);
  }, [gadgetsData]);

  const handleFilterChange = (key: string, value: any) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [key]:
        key === "releaseDate" && value instanceof Date
          ? new Date(value.setUTCHours(0, 0, 0, 0)).toISOString()
          : value,
    }));
  };

  const handleMultiSelectChange = (key: string, values: any[]) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [key]: values,
    }));
  };

  const handleFilterSubmit = () => {
    const formattedFilterOptions = {
      ...filterOptions,
      priceRange: {
        min: filterOptions.priceRange[0],
        max: filterOptions.priceRange[1],
      },
      releaseDate: filterOptions.releaseDate
        ? new Date(filterOptions.releaseDate).toISOString()
        : null,
    };
    console.log(formattedFilterOptions);
  };

  const { data: gadgetsDataByFiltering, isFetching } =
    useGetGadgetsByFilteringQuery(filterOptions);

  console.log("gadgetsDataByFiltering", gadgetsDataByFiltering);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  ];

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1 style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}>
          Category:
        </h1>
        <Select
          allowClear={true}
          placeholder="Select Category"
          style={{ width: 200, marginRight: 16 }}
          value={filterOptions.category}
          onChange={(value) => handleFilterChange("category", value)}
        >
          {categoryOptions.length > 0 && (
            <>
              <Option key="heading" disabled>
                Filtering according to category
              </Option>
              {categoryOptions
                .filter(
                  (option, index, self) =>
                    index === self.findIndex((t) => t.label === option.label)
                )
                .map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
            </>
          )}
        </Select>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1 style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}>
          Brand:
        </h1>
        <Select
          allowClear={true}
          placeholder="Select Brand"
          style={{ width: 200, marginRight: 16 }}
          value={filterOptions.brand}
          onChange={(value) => handleFilterChange("brand", value)}
        >
          {brandOptions.length > 0 && (
            <>
              <Option key="heading" disabled>
                Filtering according to brand
              </Option>
              {brandOptions
                .filter(
                  (option, index, self) =>
                    index === self.findIndex((t) => t.label === option.label)
                )
                .map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
            </>
          )}
        </Select>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1 style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}>
          Model-Number:
        </h1>
        <Select
          allowClear={true}
          placeholder="Select Model-number"
          style={{ width: 200, marginRight: 16 }}
          value={filterOptions.modelNumber}
          onChange={(value) => handleFilterChange("modelNumber", value)}
        >
          {modelNumberOptions.length > 0 && (
            <>
              <Option key="heading" disabled>
                Filtering according to model
              </Option>
              {modelNumberOptions
                .filter(
                  (option, index, self) =>
                    index === self.findIndex((t) => t.label === option.label)
                )
                .map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
            </>
          )}
        </Select>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1 style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}>
          Operating System:
        </h1>
        <Select
          allowClear={true}
          placeholder="Select Operating System"
          style={{ width: 200, marginRight: 16 }}
          value={filterOptions.operatingSystem}
          onChange={(value) => handleFilterChange("operatingSystem", value)}
        >
          {operatingSystemOptions.length > 0 && (
            <>
              <Option key="heading" disabled>
                Filtering according to operatingSystem
              </Option>
              {operatingSystemOptions
                .filter(
                  (option, index, self) =>
                    index === self.findIndex((t) => t.label === option.label)
                )
                .map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
            </>
          )}
        </Select>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1 style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}>
          Power Source:
        </h1>
        <Select
          allowClear={true}
          placeholder="Select Power Source"
          style={{ width: 200, marginRight: 16 }}
          value={filterOptions.powerSource}
          onChange={(value) => handleFilterChange("powerSource", value)}
        >
          {powerSourceOptions.length > 0 && (
            <>
              <Option key="heading" disabled>
                Filtering according to powerSource
              </Option>
              {powerSourceOptions
                .filter(
                  (option, index, self) =>
                    index === self.findIndex((t) => t.label === option.label)
                )
                .map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
            </>
          )}
        </Select>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1 style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}>
          Price Range:
        </h1>
        <div style={{ flex: 1 }}>
          <Slider
            range
            step={1}
            min={0}
            max={9999}
            value={filterOptions.priceRange}
            onChange={(value) => handleFilterChange("priceRange", value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1 style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}>
          Release Date:
        </h1>
        <DatePicker
          style={{ marginRight: 16 }}
          onChange={(date) =>
            handleFilterChange("releaseDate", date?.toISOString() || "")
          }
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1 style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}>
          Features:
        </h1>
        <Select
          mode="multiple"
          placeholder="Select Features"
          style={{ width: 200, marginRight: 16 }}
          value={filterOptions.features}
          onChange={(values) => handleMultiSelectChange("features", values)}
        >
          {featuresOptions.length > 0 && (
            <>
              <Option key="heading" disabled>
                Filtering according to featuresOptions
              </Option>
              {featuresOptions
                .filter(
                  (option, index, self) =>
                    index === self.findIndex((t) => t.label === option.label)
                )
                .map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
            </>
          )}
        </Select>
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h1 style={{ marginRight: "16px", fontSize: "24px", color: "#333" }}>
          Connectivity:
        </h1>
        <Select
          mode="multiple"
          placeholder="Select Connectivity"
          style={{ width: 200, marginRight: 16 }}
          value={filterOptions.connectivity}
          onChange={(values) => handleMultiSelectChange("connectivity", values)}
        >
          {connectivityOptions.length > 0 && (
            <>
              <Option key="heading" disabled>
                Filtering according to connectivityOptions
              </Option>
              {connectivityOptions
                .filter(
                  (option, index, self) =>
                    index === self.findIndex((t) => t.label === option.label)
                )
                .map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
            </>
          )}
        </Select>
      </div>

      <Button onClick={handleFilterSubmit}>Apply Filters</Button>

      <Table
        loading={isFetching}
        columns={[
          ...columns,
          {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
              <>
                <Button onClick={() => handleSellClick(record)}>Sell</Button>
                <Link to={`gadget-details/${record._id}`}>
                  <Button>Details</Button>
                </Link>
              </>
            ),
          },
        ]}
        dataSource={(gadgetsDataByFiltering?.data || []).filter(
          (product) => product.quantity > 0
        )}
      />

      {/* Sell Modal */}
      <Modal
        title="Sell Product"
        visible={sellModalVisible}
        onCancel={handleSellCancel}
        onOk={handleSellSubmit}
      >
        {/* Add your form inputs for quantity, buyerName, and saleDate */}
        <Input
          type="text"
          placeholder="Enter Buyer Name"
          value={sellFormData.buyerName}
          onChange={(e) =>
            setSellFormData({
              ...sellFormData,
              buyerName: e.target.value,
            })
          }
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={sellFormData.quantity}
          onChange={(e) =>
            setSellFormData({
              ...sellFormData,
              quantity: parseInt(e.target.value, 10) || 0,
            })
          }
        />
        <DatePicker
          style={{ marginRight: 16 }}
          placeholder="Sale Date"
          value={sellFormData.saleDate ? moment(sellFormData.saleDate) : null}
          onChange={(date) =>
            setSellFormData({
              ...sellFormData,
              saleDate: date ? moment(date).format("YYYY-MM-DD") : null,
            })
          }
        />
      </Modal>
    </div>
  );
};

export default ElectricGadgetFilter;

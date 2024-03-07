import { Card, Button, Space, Popconfirm, message, Result, Spin } from "antd";
import {
  useDeleteGadgetsMutation,
  useGetGadgetsByIdQuery,
} from "@/redux/features/electricGadgetsManagement.Api";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const SingleElectricGadgetsDetails = () => {
  const { _id } = useParams();
  const { data: singleGadgetData, isLoading } = useGetGadgetsByIdQuery(_id);
  const navigate = useNavigate();

  const [removeGadgets, { isLoading: deleteLoading, isError: deleteError }] =
    useDeleteGadgetsMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = async (gadgetId: any) => {
    try {
      await removeGadgets(gadgetId);
      message.success("Gadget deleted successfully");
      // Redirect to the specified URL after successful creation
      navigate("/dashboard/get-electric-gadgets-by-filtering");
    } catch (error) {
      console.error("Error deleting gadget:", error);
    }
  };

  const {
    brand,
    category,
    connectivity,
    features,
    modelNumber,
    name,
    powerSource,
    price,
    quantity,
    releaseDate,
    weight,
    _id: gadgetId,
  } = singleGadgetData?.data || {};

  if (isLoading) {
    return <Spin />;
  }

  if (deleteError) {
    return (
      <Result
        status="error"
        title="Failed to fetch gadget details"
        subTitle="Please try again later"
      />
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Card title={name} bordered={false}>
        <p>
          <strong>Brand:</strong> {brand}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Model Number:</strong> {modelNumber}
        </p>
        <p>
          <strong>Power Source:</strong> {powerSource}
        </p>
        <p>
          <strong>Price:</strong> {price}
        </p>
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
        <p>
          <strong>Release Date:</strong> {releaseDate}
        </p>
        <p>
          <strong>Weight:</strong> {weight}
        </p>
        <p>
          <strong>Connectivity:</strong>{" "}
          {connectivity && connectivity.join(", ")}
        </p>
        <p>
          <strong>Features:</strong> {features && features.join(", ")}
        </p>

        <Space>
          <Popconfirm
            title="Are you sure you want to delete this gadget?"
            onConfirm={() => handleDelete(gadgetId)}
            okText="Yes"
            cancelText="No"
            disabled={deleteLoading}
          >
            <Button
              loading={deleteLoading}
              disabled={deleteLoading || deleteError}
            >
              Delete
            </Button>
          </Popconfirm>

          <Link
            to={`/dashboard/get-electric-gadgets-by-filtering/gadget-details/${gadgetId}/update`}
          >
            <Button>Update</Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};

export default SingleElectricGadgetsDetails;

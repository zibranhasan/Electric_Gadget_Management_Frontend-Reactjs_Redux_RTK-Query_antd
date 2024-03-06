import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteMulipleGadgetMutation,
  useGetAllGadgetsQuery,
} from "@/redux/features/electricGadgetsManagement.Api";
import { Table, TableColumnsType, Button } from "antd";
import { ElectricGadget } from "@/types/sidebar.types";

interface TTableData {
  key: string;
  name: string;
  price: number;
  brand: string;
  quantity: number;
}

const ElectricGadgetsManagement = () => {
  const {
    data: gadgetsData,
    isLoading,
    isFetching,
  } = useGetAllGadgetsQuery(undefined);
  const [deleteGadgets] = useDeleteMulipleGadgetMutation();

  console.log("Gadgets data", gadgetsData);

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      deleteGadgets({ gadgetIds: selectedRowKeys });
    } catch (error) {
      console.error("Error deleting gadgets:", error);
    }
  };

  const handleDuplicateAndEdit = (productId: string) => {
    // Find the selected product by ID
    const selectedProduct = gadgetsData?.data?.find(
      (product: ElectricGadget | undefined) => product?._id === productId
    );

    // Redirect to the form with pre-filled data
    navigate("/dashboard/get-electric-gadgets/duplicateform", {
      state: { preFilledData: selectedProduct },
    });
  };

  const onSelectChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys as string[]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const tableData = (gadgetsData?.data || []).map(
    ({ _id, name, price, brand, quantity }: ElectricGadget) => ({
      key: _id,
      name,
      price,
      brand,
      quantity,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleDuplicateAndEdit(record.key)}>
          Duplicate & Edit
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <p>Loading......</p>;
  }

  return (
    <div>
      <h1>
        <Button onClick={handleDelete}>Delete Selected Gadgets</Button>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          rowSelection={rowSelection}
        />
      </h1>
    </div>
  );
};

export default ElectricGadgetsManagement;

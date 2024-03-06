import { useGetSalesHistoryQuery } from "@/redux/features/salesManagement.Api";
import { SalesHistoryResponse } from "@/types/sidebar.types";
import { Card, Table, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";

const SalesHistory: React.FC = () => {
  const { data } = useGetSalesHistoryQuery<{ data: SalesHistoryResponse }>(
    undefined
  );

  return (
    <Card>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Weekly" key="1">
          <SalesTable data={data?.data?.weekly} />
        </TabPane>
        <TabPane tab="Daily" key="2">
          <SalesTable data={data?.data?.daily} />
        </TabPane>
        <TabPane tab="Monthly" key="3">
          <SalesTable data={data?.data?.monthly} />
        </TabPane>
        <TabPane tab="Yearly" key="4">
          <SalesTable data={data?.data?.yearly} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

interface SalesTableProps {
  data: Record<string, SalesHistoryResponse[]> | undefined; // Allow data to be undefined
}

const SalesTable: React.FC<SalesTableProps> = ({ data }) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: ["productId", "name"],
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      key: "buyerName",
    },
    {
      title: "Sale Date",
      dataIndex: "saleDate",
      key: "saleDate",
    },
  ];

  const dataSource = data
    ? Object.keys(data).map((key) => ({
        key,
        ...data[key][0], // Assuming the first element in the array has the necessary information
      }))
    : [];

  return <Table columns={columns} dataSource={dataSource} />;
};

export default SalesHistory;

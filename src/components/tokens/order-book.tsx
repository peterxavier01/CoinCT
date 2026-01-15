// import DataTable from "../data-table";

interface OrderBookProps {
  data: CoinDetailsData;
}

const OrderBook = ({ data }: OrderBookProps) => {
  // const columns = [
  //   {
  //     header: "Price (BTC)",
  //     cell: (row: any) => row.price,
  //   },
  //   {
  //     header: "Amount (BTC)",
  //     cell: (row: any) => row.quantity,
  //   },
  //   {
  //     header: "Amuount (ETH)",
  //     cell: (row: any) => row.total,
  //   },
  // ];


  return (
    <section className="mt-9">
      <h3 className="text-2xl font-medium mb-5">Order Book</h3>

      {/* <DataTable columns={columns} data={data.} /> */}
    </section>
  );
};

export default OrderBook;

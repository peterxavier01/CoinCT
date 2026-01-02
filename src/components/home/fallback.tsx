import DataTable from "@/components/data-table";

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-sm skeleton" />
          <div className="header-line-lg skeleton" />
        </div>
      </div>
      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const columns = [
    {
      header: "Name",
      cell: () => (
        <div className="name-link">
          <div className="name-image skeleton" />
          <div className="name-line skeleton" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cell: () => (
        <div className="price-change">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: "Price",
      cell: () => <div className="price-line skeleton" />,
    },
  ];

  const dummyData = Array.from({ length: 6 }, (_, i) => ({ id: i }));

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        data={dummyData}
        columns={columns as DataTableColumn<(typeof dummyData)[number]>[]}
        rowKey={(item: (typeof dummyData)[number]) => item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3! hidden"
        bodyCellClassName="py-2! border-none"
      />
    </div>
  );
};

export const CoinsListFallback = () => {
  const columns = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: () => <div className="category-line skeleton" />,
    },
    {
      header: "Top Gainers",
      cellClassName: "top-gainers-cell",
      cell: () => (
        <div className="flex gap-1">
          <div className="gainer-image skeleton" />
          <div className="gainer-image skeleton" />
          <div className="gainer-image skeleton" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: () => (
        <div className="change-cell">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: () => <div className="value-skeleton-lg skeleton" />,
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: () => <div className="value-skeleton-md skeleton" />,
    },
  ];

  const dummyData = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <div id="categories-fallback">
      <h4>Top Categories</h4>
      <DataTable
        data={dummyData}
        columns={columns as DataTableColumn<(typeof dummyData)[number]>[]}
        rowKey={(item: (typeof dummyData)[number]) => item.id}
        tableClassName="mt-3"
      />
    </div>
  );
};

export const TokensViewFallback = () => {
  const columns = [
    {
      header: "Rank",
      cellClassName: "w-max",
      cell: () => <div className="rank-skeleton skeleton" />,
    },
    {
      header: "Token",
      cell: () => (
        <div className="flex items-center gap-3">
          <div className="token-image skeleton" />
          <div className="token-name skeleton" />
        </div>
      ),
    },
    {
      header: "Price",
      cell: () => <div className="price-skeleton skeleton" />,
    },
    {
      header: "24hr Change",
      cell: () => (
        <div className="flex items-center gap-1">
          <div className="change-skeleton skeleton" />
        </div>
      ),
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: () => <div className="value-skeleton-lg skeleton" />,
    },
  ];

  const dummyData = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <>
      <div className="rounded-[0.625rem] overflow-hidden border border-purple-600">
        <DataTable
          columns={columns as DataTableColumn<(typeof dummyData)[number]>[]}
          data={dummyData}
          rowKey={(item: (typeof dummyData)[number]) => item.id}
          tableClassName="rounded-[10px]!"
          headerCellClassName="py-3! border border-purple-600 px-6!"
          bodyCellClassName="py-2! bg-dark-500 py-6! px-7.5! border border-purple-600"
        />
      </div>

      <div id="tokens-pagination-fallback" className="mt-4">
        <div className="pagination-content flex items-center justify-center gap-2">
          <div className="pagination-control-skeleton skeleton" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="pagination-page-skeleton skeleton" />
            ))}
          </div>
          <div className="pagination-control-skeleton skeleton" />
        </div>
      </div>
    </>
  );
};

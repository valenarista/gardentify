import React from 'react';

type DashboardLatestProps<TData> = {
  name: string;
  loading: boolean;
  data: TData[];
  render: (renderData: TData, index: number) => React.ReactElement;
};

const DashboardLatest = <TData,>(props: DashboardLatestProps<TData>) => {
  const { name, loading, data, render } = props;

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-xl font-semibold md:text-2xl">{name}</h3>
      {!loading ? (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
          }}
        >
          {data.map((entry, index) => render(entry, index))}
        </div>
      ) : (
        <span className="text-center text-xl font-bold text-neutral-800 dark:text-neutral-100">Loading</span>
      )}
    </div>
  );
};

export default DashboardLatest;

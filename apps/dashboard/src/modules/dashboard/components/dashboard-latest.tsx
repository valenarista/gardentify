import React from 'react';

type DashboardLatestProps<TData> = {
  name: string;
  data: TData[];
  render: (renderData: TData, index: number) => React.ReactElement;
};

const DashboardLatest = <TData,>(props: DashboardLatestProps<TData>) => {
  const { name, data, render } = props;

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-lg font-medium md:text-xl">{name}</h3>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
        }}
      >
        {data.map((entry, index) => render(entry, index))}
      </div>
    </div>
  );
};

export default DashboardLatest;

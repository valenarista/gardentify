import React from 'react';

type ChartWrapperProps = {
  children: React.ReactNode;
  height?: number;
};

const ChartWrapper: React.FC<ChartWrapperProps> = (props) => {
  const { children, height = 175 } = props;

  return (
    <div
      className="relative m-auto w-[99%]"
      style={{
        height: `${height}px`,
      }}
    >
      {children}
    </div>
  );
};

export default ChartWrapper;

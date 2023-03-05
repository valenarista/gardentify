import React from 'react';

type UserContainerStatsEntryProps = {
  title: string;
  description: string;
  value: string | number;
  unit?: string;
  icon: React.ReactElement;
};

const UserContainerStatsEntry: React.FC<UserContainerStatsEntryProps> = (props) => {
  const { title, description, value, icon, unit = 'kg' } = props;

  return (
    <div className="flex items-center space-x-2 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      <div className="rounded-lg bg-cyan-300 p-2 dark:bg-cyan-800">{icon}</div>
      <div className="flex grow flex-col items-start justify-center">
        <h4 className="font-semibold">
          {title}: <span className="text-primary-800 dark:text-primary-300 text-lg">{value}</span> {unit}
        </h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default UserContainerStatsEntry;

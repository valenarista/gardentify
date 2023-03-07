import { SelectInput, TextInput } from '@gardentify/ui';
import { PlantType } from '@modules/graphql/@generated/graphql';
import React from 'react';

type UserContainerPlantsDetailedProps = {
  onFilterTypeChanged: (type: string, toggled: boolean) => void;
  onFilterVarietyChanged: (variety: string) => void;
};

const UserContainerPlantsDetailedFiltering: React.FC<UserContainerPlantsDetailedProps> = (props) => {
  const { onFilterTypeChanged, onFilterVarietyChanged } = props;

  const handleTypeChange = (value: string) => {
    onFilterTypeChanged(value, false);
  };

  const handleVarietyChange = (value: string) => {
    onFilterVarietyChanged(value);
  };

  return (
    <div className="grid gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900 md:grid-cols-2">
      <SelectInput
        id="filter-type"
        label="Filter Type"
        reseteable
        error={false}
        onValueChanged={handleTypeChange}
        defaultValue="NONE"
      >
        {Object.values(PlantType).map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </SelectInput>
      <TextInput
        id="filter-variety"
        label="Filter Variety"
        placeholder="Plant Variety"
        error={false}
        reseteable
        onValueChanged={handleVarietyChange}
      />
    </div>
  );
};

export default UserContainerPlantsDetailedFiltering;

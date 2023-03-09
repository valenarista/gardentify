import { SelectInput, TextInput } from '@gardentify/ui';
import { capitalize } from '@gardentify/utils';
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
        value={PlantType.Bean}
        label="Type"
        name="Type"
        reseteable
        error={false}
        onValueChanged={handleTypeChange}
      >
        {Object.values(PlantType).map((type) => {
          return (
            <option key={type} value={type}>
              {capitalize(type)}
            </option>
          );
        })}
      </SelectInput>
      <TextInput
        id="filter-variety"
        value={''}
        label="Variety"
        name="Variety"
        placeholder="Plant Variety"
        error={false}
        reseteable
        onValueChanged={handleVarietyChange}
      />
    </div>
  );
};

export default UserContainerPlantsDetailedFiltering;

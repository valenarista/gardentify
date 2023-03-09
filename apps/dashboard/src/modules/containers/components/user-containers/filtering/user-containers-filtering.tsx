import { SelectInput, TextInput } from '@gardentify/ui';
import { ContainerType } from '@modules/graphql/@generated/graphql';
import React from 'react';

type UserContainersFilteringProps = {
  onFilterTypeChanged: (value: string) => void;
  onFilterDirtDepthChanged: (value: string) => void;
};

const UserContainersFiltering: React.FC<UserContainersFilteringProps> = (props) => {
  const { onFilterTypeChanged, onFilterDirtDepthChanged } = props;

  return (
    <div className="grid gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900 md:grid-cols-2">
      <SelectInput
        id="filter-type"
        label="Type"
        reseteable
        error={false}
        onValueChanged={onFilterTypeChanged}
        name="Type"
        value="all"
      >
        <option value="all">All</option>
        {Object.values(ContainerType).map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </SelectInput>
      <TextInput
        id="filter-dirt-depth"
        label="Dirt Depth"
        placeholder="Dirt Depth"
        name="Dirt Depth"
        value=""
        type="number"
        error={false}
        reseteable
        onValueChanged={onFilterDirtDepthChanged}
      />
    </div>
  );
};

export default UserContainersFiltering;

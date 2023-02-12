import { Button, SelectInput, TextInput } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContainerType } from '@modules/graphql/@generated/graphql';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    type: yup.mixed<ContainerType>().oneOf(Object.values(ContainerType)).required('Container type is required!'),
    dirtDepth: yup
      .number()
      .required('Container dirt depth is required!')
      .min(1, 'The minimum dirt depth is 1')
      .typeError('Dirt depth must be a number!'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const UserContainersManagementCreateForm: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      type: ContainerType.Bag,
      dirtDepth: 10,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleFormReset = () => {
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="type"
        control={control}
        render={({ field, fieldState }) => (
          <SelectInput
            id={field.name}
            label="Type"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
          >
            <option value={ContainerType.Bag}>Bag</option>
            <option value={ContainerType.Plot}>Plot</option>
          </SelectInput>
        )}
      />
      <Controller
        name="dirtDepth"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            id={field.name}
            label="Dirt Depth"
            type="number"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <div className="flex w-full space-x-4 px-6">
        <Button className="w-full" type="submit">
          Create
        </Button>
        <Button className="w-full" type="reset" variant="ghost" colorScheme="danger" onClick={handleFormReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default UserContainersManagementCreateForm;

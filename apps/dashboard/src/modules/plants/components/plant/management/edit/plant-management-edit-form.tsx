import { Button, SelectInput, TextInput, useToast } from '@gardentify/ui';
import { capitalize } from '@gardentify/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { PlantType, useUpdatePlantMutation } from '@modules/graphql/@generated/graphql';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    type: yup.mixed<PlantType>().oneOf(Object.values(PlantType)).required('Plant type is required!'),
    variety: yup.string().required('Plant variety is required!'),
    seedsPlantedAt: yup
      .date()
      .max(yup.ref('seedsSproutedAt'), 'Seeds planted at date must come before the seeds sprouted at date!')
      .required('Seeds planted at is required!'),
    seedsSproutedAt: yup
      .date()
      .min(yup.ref('seedsPlantedAt'), 'Seeds sprouted at date must come after the seeds planted at date!')
      .required('Seeds sprouted at is requireD!'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const PlantManagementEditForm: React.FC = () => {
  const router = useRouter();
  const [updatePlant] = useUpdatePlantMutation();
  const { toast } = useToast();
  const { user } = useAuthContext();
  const { plant } = useContainerPlantContext();
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      variety: plant.variety,
      type: plant.type,
      seedsPlantedAt: new Date(plant.seedsPlantedAt).toISOString().substring(0, 10) as unknown as Date,
      seedsSproutedAt: new Date(plant.seedsSproutedAt).toISOString().substring(0, 10) as unknown as Date,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    try {
      const response = await updatePlant({
        variables: {
          input: {
            ...data,
            uuid: plant.uuid,
          },
        },
      });
      const updatedPlant = response.data;
      if (updatedPlant && updatedPlant.updatePlant.plant && updatedPlant.updatePlant.plant.uuid) {
        await router.push(`/plants/${plant.uuid}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        toast({ variant: 'error', content: errorMessage });
      }
    }
  };

  const handleFormReset = () => {
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="type"
        control={control}
        render={({ field: { name, ref, onBlur, onChange, value }, fieldState }) => (
          <SelectInput
            ref={ref}
            id={name}
            value={value}
            name={name}
            label="Variety"
            placeholder="Plant Variety"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          >
            {Object.values(PlantType).map((type) => {
              return (
                <option key={type} value={type}>
                  {capitalize(type)}
                </option>
              );
            })}
          </SelectInput>
        )}
      />
      <Controller
        name="variety"
        control={control}
        render={({ field: { name, ref, onBlur, onChange, value }, fieldState }) => (
          <TextInput
            ref={ref}
            value={value}
            id={name}
            name={name}
            label="Variety"
            placeholder="Plant Variety"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        name="seedsPlantedAt"
        control={control}
        render={({ field: { name, ref, onBlur, onChange, value }, fieldState }) => (
          <TextInput
            ref={ref}
            value={new Date(value).toISOString().substring(0, 10)}
            id={name}
            name={name}
            label="Seeds Planted At"
            placeholder="Date"
            type="date"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        name="seedsSproutedAt"
        control={control}
        render={({ field: { name, ref, onBlur, onChange, value }, fieldState }) => (
          <TextInput
            ref={ref}
            value={new Date(value).toISOString().substring(0, 10)}
            id={name}
            name={name}
            label="Seeds Planted At"
            type="date"
            placeholder="Date"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <div className="flex w-full space-x-4 px-6">
        <Button className="w-full" type="submit">
          Update
        </Button>
        <Button className="w-full" type="reset" variant="ghost" colorScheme="danger" onClick={handleFormReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default PlantManagementEditForm;

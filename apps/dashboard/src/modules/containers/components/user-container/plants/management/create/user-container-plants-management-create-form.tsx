import { Button, SelectInput, TextInput } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { PlantType, useCreatePlantMutation } from '@modules/graphql/@generated/graphql';
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

const UserContainerPlantsManagementCreateForm: React.FC = () => {
  const router = useRouter();
  const [createPlant] = useCreatePlantMutation();
  const { user } = useAuthContext();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      variety: 'Grand King',
      type: PlantType.Tomato,
      seedsPlantedAt: new Date(),
      seedsSproutedAt: new Date(),
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user.uuid) return;

    const containerUuid = router.query.uuid as string;

    const plant = await createPlant({
      variables: {
        input: {
          ...data,
          container: { uuid: containerUuid },
        },
      },
    })
      .then((response) => {
        return response.data?.createPlant;
      })
      .catch((err) => {
        console.log({ err });
      });

    if (plant?.plant?.uuid) {
      await router.push(`/plants/${plant.plant.uuid}`);
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
        render={({ field, fieldState }) => (
          <SelectInput
            id={field.name}
            label="Type"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
          >
            {Object.values(PlantType).map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </SelectInput>
        )}
      />
      <Controller
        name="variety"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            id={field.name}
            label="Variety"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="seedsPlantedAt"
        control={control}
        render={({ field, fieldState }) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <TextInput
            id={field.name}
            label="Seeds Planted At"
            type="date"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="seedsSproutedAt"
        control={control}
        render={({ field, fieldState }) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <TextInput
            id={field.name}
            label="Seeds Sprouted At"
            type="date"
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

export default UserContainerPlantsManagementCreateForm;

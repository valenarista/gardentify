import { Button, SelectInput, TextInput, useToast } from '@gardentify/ui';
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
      .required('Seeds planted at is required!')
      .typeError('Seeds planted at must be a date!'),
    seedsSproutedAt: yup
      .date()
      .min(yup.ref('seedsPlantedAt'), 'Seeds sprouted at date must come after the seeds planted at date!')
      .required('Seeds sprouted at is requireD!')
      .typeError('Seeds sprouted at must be a date!'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

type UserContainerPlantsManagementCreateFormProps = {
  onSubmitted: () => void;
};

const UserContainerPlantsManagementCreateForm: React.FC<UserContainerPlantsManagementCreateFormProps> = (props) => {
  const { onSubmitted } = props;
  const router = useRouter();
  const { state } = useAuthContext();
  const { toast } = useToast();
  const [createPlant] = useCreatePlantMutation();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    if (!state.user) return;

    try {
      const containerUuid = router.query.uuid as string;

      const response = await createPlant({
        variables: {
          input: {
            ...data,
            container: { uuid: containerUuid },
          },
        },
      });

      const createPlantData = response.data;

      if (createPlantData && createPlantData.createPlant && createPlantData.createPlant.plant) {
        await router.push(`/plants/${createPlantData.createPlant.plant.uuid}`);
        onSubmitted();
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
        render={({ field: { name, onBlur, onChange, ref }, fieldState }) => (
          <SelectInput
            ref={ref}
            id={name}
            name={name}
            label="Type"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Type of the plant"
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
            defaultValue="BEAN"
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
        render={({ field: { ref, name, onBlur, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            name={name}
            label="Variety"
            placeholder="Grand King"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Variety of the plant"
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        name="seedsPlantedAt"
        control={control}
        render={({ field: { ref, name, onBlur, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            name={name}
            label="Seeds Planted At"
            type="date"
            placeholder="10/02/2023"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Date when seeds were planted"
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        name="seedsSproutedAt"
        control={control}
        render={({ field: { ref, name, onBlur, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            name={name}
            label="Seeds Sprouted At"
            type="date"
            placeholder="15/02/2023"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Date when seeds were sprouted"
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
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

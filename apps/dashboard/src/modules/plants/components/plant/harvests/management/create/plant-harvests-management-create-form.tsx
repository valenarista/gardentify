import { Button, TextInput, useToast } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { useCreateHarvestMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    quantity: yup
      .number()
      .typeError('Quantity must be a number!')
      .min(1, 'The minimum quantity is 1 unit!')
      .required('The quantity is required!'),

    weight: yup
      .number()
      .typeError('Weight must be a number!')
      .min(0.1, 'The minimum weight is 0.1 kilograms!')
      .required('The weight is required!'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const PlantHarvestsManagementCreateForm: React.FC = () => {
  const router = useRouter();
  const { state } = useAuthContext();
  const { toast } = useToast();
  const [createHarvest] = useCreateHarvestMutation();

  const {
    handleSubmit,
    reset,
    control,

    formState: { isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    if (!state.user) return;

    try {
      const plantUuid = router.query.uuid as string;

      await createHarvest({
        variables: {
          input: {
            ...data,
            plant: { uuid: plantUuid },
          },
        },
      });
      await router.push(`/plants/${plantUuid}`);
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
        name="quantity"
        control={control}
        render={({ field: { name, value, onChange, onBlur, ref }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            value={value}
            name={name}
            label="Quantity"
            type="number"
            placeholder="Harvest units"
            step="1"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Units harvested"
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        name="weight"
        control={control}
        render={({ field: { name, value, onChange, onBlur, ref }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            value={value}
            name={name}
            label="Weight"
            type="number"
            placeholder="Harvest weight"
            step="0.01"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Weight harvested in kilograms"
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <div className="flex w-full space-x-4 px-6">
        <Button className="w-full" type="submit" disabled={!isValid}>
          Create
        </Button>
        <Button className="w-full" type="reset" variant="ghost" colorScheme="danger" onClick={handleFormReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default PlantHarvestsManagementCreateForm;

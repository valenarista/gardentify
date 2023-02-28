import { Button, TextInput, useToast } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { useCreateHarvestMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
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
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: FormData) => {
    if (!state.user) return;

    const plantUuid = router.query.uuid as string;

    await createHarvest({
      variables: {
        input: {
          ...data,
          plant: { uuid: plantUuid },
        },
      },
    })
      .then((response) => {
        return response.data?.createHarvest;
      })
      .catch((err) => {
        const errorMessage = err.message;
        toast({ variant: 'error', content: errorMessage });
      });

    await router.push(`/plants/${plantUuid}`);
  };

  const handleFormReset = () => {
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="quantity"
        label="Quantity"
        type="number"
        placeholder="Harvest units"
        error={errors.quantity !== undefined}
        errorMessage={errors.quantity?.message}
        help
        helpMessage="Units harvested"
        {...register('quantity')}
      />

      <TextInput
        id="weight"
        label="Weight"
        type="number"
        step="0.01"
        placeholder="Harvest weight"
        error={errors.weight !== undefined}
        errorMessage={errors.weight?.message}
        help
        helpMessage="Weight harvested in kilograms"
        {...register('weight')}
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

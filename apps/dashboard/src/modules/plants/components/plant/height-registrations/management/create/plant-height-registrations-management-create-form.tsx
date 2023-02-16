import { Button, TextInput, useToast } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { useCreateHeightRegistrationMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    height: yup
      .number()
      .typeError('Height registration height must be a number!')
      .min(0.1, 'The minimum height is 0.1 cms!.')
      .required('Height registration height is required!'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const PlantHeightRegistrationsManagementCreateForm: React.FC = () => {
  const router = useRouter();
  const { state } = useAuthContext();
  const { toast } = useToast();
  const [createHeightRegistration] = useCreateHeightRegistrationMutation();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      height: 2,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!state.user) return;

    const plantUuid = router.query.uuid as string;

    await createHeightRegistration({
      variables: {
        input: {
          ...data,
          plantUuid,
        },
      },
    })
      .then((response) => {
        return response.data?.createHeightRegistration;
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
      <Controller
        name="height"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            id={field.name}
            label="Height"
            type="number"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Height in centimeters"
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

export default PlantHeightRegistrationsManagementCreateForm;

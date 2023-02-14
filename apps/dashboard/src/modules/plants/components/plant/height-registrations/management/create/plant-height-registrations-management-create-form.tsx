import { Button, TextInput } from '@gardentify/ui';
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
  const [createHeightRegistration] = useCreateHeightRegistrationMutation();
  const { user } = useAuthContext();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      height: 2,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user.uuid) return;

    const plantUuid = router.query.uuid as string;

    const heightRegistration = await createHeightRegistration({
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
        console.log({ err });
      });

    console.log({ heightRegistration });
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
            label="Type"
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

export default PlantHeightRegistrationsManagementCreateForm;

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
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [createHeightRegistration] = useCreateHeightRegistrationMutation();

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
    if (!user) return;

    const plantUuid = router.query.uuid as string;

    await createHeightRegistration({
      variables: {
        input: {
          ...data,
          plantUuid,
        },
      },
      async onCompleted(createHeightRegistrationResponse) {
        if (createHeightRegistrationResponse.createHeightRegistration.heightRegistration) {
          toast({ variant: 'success', content: 'Height registration created successfully!' });
          await router.push(`/plants/${plantUuid}`);
        }
      },
      onError(error) {
        toast({ variant: 'error', content: error.message });
      },
    });
  };

  const handleFormReset = () => {
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="height"
        control={control}
        render={({ field: { name, onChange, onBlur, ref, value }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            name={name}
            value={value}
            label="Height"
            type="number"
            placeholder="Plant height"
            step="0.01"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Height in centimeters"
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

export default PlantHeightRegistrationsManagementCreateForm;

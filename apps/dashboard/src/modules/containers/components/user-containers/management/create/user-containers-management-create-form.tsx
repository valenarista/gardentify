import { Button, SelectInput, TextInput, useToast } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { ContainerType, useCreateContainerMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
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

type UserContainersManagementCreateFormProps = {
  onSubmitted: () => void;
};

const UserContainersManagementCreateForm: React.FC<UserContainersManagementCreateFormProps> = (props) => {
  const { onSubmitted } = props;
  const router = useRouter();
  const { toast } = useToast();
  const { state } = useAuthContext();
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [createContainer] = useCreateContainerMutation();

  const onSubmit = async (data: FormData) => {
    if (!state.user) return;

    try {
      const response = await createContainer({
        variables: {
          input: {
            ...data,
            userUuid: state.user.uuid,
          },
        },
      });
      const createContainerData = response.data;
      if (createContainerData && createContainerData.createContainer && createContainerData.createContainer.container) {
        await router.push(`/containers/${createContainerData.createContainer.container.uuid}`);
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
        render={({ field: { ref, onChange, onBlur, name }, fieldState }) => (
          <SelectInput
            ref={ref}
            id={name}
            name={name}
            label="Type"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Type of the container"
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          >
            {Object.values(ContainerType).map((type) => {
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
        name="dirtDepth"
        control={control}
        render={({ field: { name, onBlur, onChange, ref }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            name={name}
            label="Dirt Depth"
            inputMode="numeric"
            placeholder="45 cms"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Depth in centimeters of the dirt"
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

export default UserContainersManagementCreateForm;

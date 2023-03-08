import { Button, SelectInput, TextInput, useToast } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import { ContainerType, useUpdateContainerMutation } from '@modules/graphql/@generated/graphql';
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

type UserContainersManagementEditFormProps = {
  onSubmitted: () => void;
};

const UserContainersManagementEditForm: React.FC<UserContainersManagementEditFormProps> = (props) => {
  const { onSubmitted } = props;
  const router = useRouter();
  const { state } = useAuthContext();
  const { toast } = useToast();
  const { container } = useUserContainerContext();
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      ...container,
    },
  });

  const [updateContainer] = useUpdateContainerMutation();

  const onSubmit = async (data: FormData) => {
    if (!state.user) return;
    try {
      await updateContainer({
        variables: {
          input: {
            uuid: container.uuid,
            dirtDepth: data.dirtDepth,
            type: data.type,
          },
        },
      });

      toast({ variant: 'success', content: 'Container updated successfully!' });
      await router.push(`/containers/${container.uuid}`);
      onSubmitted();
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
        render={({ field: { name, onBlur, onChange, ref, value }, fieldState }) => (
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
            defaultValue={value}
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
        render={({ field: { name, onBlur, onChange, ref, value }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            name={name}
            label="Dirt Depth"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Depth in centimeters of the dirt"
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
            defaultValue={value}
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

export default UserContainersManagementEditForm;

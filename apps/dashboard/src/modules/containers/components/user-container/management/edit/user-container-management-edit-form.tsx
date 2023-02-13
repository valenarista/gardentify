import { Button, SelectInput, TextInput } from '@gardentify/ui';
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

const UserContainersManagementEditForm: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { container } = useUserContainerContext();
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...container,
    },
  });

  const [updateContainer] = useUpdateContainerMutation();

  const onSubmit = async (data: FormData) => {
    if (!user.uuid) return;

    await updateContainer({
      variables: {
        input: {
          uuid: container.uuid,
          dirtDepth: data.dirtDepth,
          type: data.type,
        },
      },
    })
      .then((response) => {
        return response.data?.updateContainer;
      })
      .catch((err) => {
        console.log({ err });
      });

    await router.push(`/containers/${container.uuid}`);
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
            <option value={ContainerType.Bag}>Bag</option>
            <option value={ContainerType.Plot}>Plot</option>
          </SelectInput>
        )}
      />
      <Controller
        name="dirtDepth"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            id={field.name}
            label="Dirt Depth"
            type="number"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
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
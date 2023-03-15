import { Button, FileInput, SelectInput, TextInput, useToast } from '@gardentify/ui';
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
    thumbnail: yup.mixed().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

type UserContainersManagementEditFormProps = {
  onSubmitted: () => void;
};

const UserContainersManagementEditForm: React.FC<UserContainersManagementEditFormProps> = (props) => {
  const router = useRouter();
  const { onSubmitted } = props;
  const { user } = useAuthContext();
  const { toast } = useToast();
  const { container } = useUserContainerContext();
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      ...container,
      thumbnail: undefined,
    },
  });

  const [updateContainer] = useUpdateContainerMutation();

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    await updateContainer({
      variables: {
        input: {
          uuid: container.uuid,
          dirtDepth: data.dirtDepth,
          type: data.type,
          thumbnail: data.thumbnail ?? undefined,
        },
      },
      async onCompleted() {
        onSubmitted();
        toast({ variant: 'success', content: 'Container updateed successfully!' });
        await router.push(`/containers/${container.uuid}`);
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
        name="type"
        control={control}
        render={({ field: { name, onBlur, onChange, ref, value }, fieldState }) => (
          <SelectInput
            ref={ref}
            id={name}
            value={value}
            name={name}
            label="Type"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Type of the container"
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
        render={({ field: { name, onBlur, onChange, ref, value }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            name={name}
            value={value}
            label="Dirt Depth"
            type="number"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Depth in centimeters of the dirt"
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        name="thumbnail"
        control={control}
        render={({ field: { name, onBlur, onChange, ref }, fieldState }) => (
          <FileInput
            ref={ref}
            id={name}
            name={name}
            label="Thumbnail"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Optional thumbnail of the container"
            onValueChanged={(files) => {
              if (files.length === 0) return;
              const uniqueFile = files[0];
              onChange(uniqueFile);
            }}
            onBlur={onBlur}
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

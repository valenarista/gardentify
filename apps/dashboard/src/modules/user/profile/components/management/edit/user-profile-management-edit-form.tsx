import { Button, FileInput, TextInput, useToast } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { useUpdateUserMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    username: yup.string().typeError('Username must be a string!').required('Username is required!'),
    avatar: yup.mixed().optional(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

type UserProfileManagementEditFormProps = {
  onSubmitted: () => void;
};

const UserProfileManagementEditForm: React.FC<UserProfileManagementEditFormProps> = (props) => {
  const { onSubmitted } = props;
  const router = useRouter();
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [updateUser] = useUpdateUserMutation();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      username: user?.username,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) return;

    await updateUser({
      variables: {
        input: {
          uuid: user.uuid,
          username: data.username,
        },
      },
      async onCompleted(updateUserResponse) {
        if (updateUserResponse.updateUser.user) {
          onSubmitted();
          toast({ variant: 'success', content: 'User updated successfully!' });
          await router.push(`/users/${user.uuid}`);
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
        name="username"
        control={control}
        defaultValue=""
        render={({ field: { name, onBlur, onChange, ref, value }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            value={value}
            name={name}
            label="Username"
            placeholder="Cool Username"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        name="avatar"
        control={control}
        render={({ field: { name, onBlur, onChange, ref }, fieldState }) => (
          <FileInput
            ref={ref}
            id={name}
            name={name}
            label="Avatar"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            help
            helpMessage="Your personal user avatar"
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

export default UserProfileManagementEditForm;

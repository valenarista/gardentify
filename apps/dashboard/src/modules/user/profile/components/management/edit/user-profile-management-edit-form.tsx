import { Button, TextInput } from '@gardentify/ui';
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
  const [updateUser] = useUpdateUserMutation();
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      username: user.username,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user.uuid) return;

    await updateUser({
      variables: {
        input: {
          uuid: user.uuid,
          username: data.username,
        },
      },
    })
      .then((response) => {
        return response.data?.updateUser;
      })
      .catch((err) => {
        console.log({ err });
      });

    //await router.push(`/users/${user.uuid}`);
    onSubmitted();
  };

  const handleFormReset = () => {
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            id={field.name}
            label="Username"
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

export default UserProfileManagementEditForm;

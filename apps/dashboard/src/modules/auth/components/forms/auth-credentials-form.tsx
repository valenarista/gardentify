import { Button, TextInput } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Email must be of type email'),
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'The minimum lenght is 5 characters')
    .max(32, 'The max lenght is 32 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'The minimum lenght is 8 characters')
    .max(32, 'The max lenght is 32 characters'),
});

export type AuthCredentialsFormData = yup.InferType<typeof schema>;

type AuthCredentialsFormProps = {
  onSubmitted: (data: AuthCredentialsFormData) => void;
};

const AuthCredentialsForm: React.FC<AuthCredentialsFormProps> = (props) => {
  const { onSubmitted } = props;
  const { control, handleSubmit } = useForm<AuthCredentialsFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      email: 'email@mail.com',
      username: 'Username',
      password: 'Password',
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitted)}>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            id={field.name}
            label="Email"
            type="email"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
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
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            id={field.name}
            label="Password"
            type="password"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <div className="!mt-1.5 flex w-full flex-col space-y-1">
        <div className="flex space-x-1 text-sm">
          <p className="font-medium">Forgot your password?</p>
          <Link className="font-bold text-red-800 dark:text-red-400" href="/auth/reset-password">
            Reset it
          </Link>
        </div>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AuthCredentialsForm;

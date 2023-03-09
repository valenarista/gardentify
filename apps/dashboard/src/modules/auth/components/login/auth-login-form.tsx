import { Button, TextInput } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { OtpInput } from '@modules/common/components/otp-input';
import Link from 'next/link';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Email must be of type email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'The minimum lenght is 8 characters')
    .max(32, 'The max lenght is 32 characters'),
  twoFactorCode: yup
    .string()
    .required('Two factor code is required!')
    .notOneOf(['     '], 'Confirmation code is invalid!'),
});

export type AuthSigninFormData = yup.InferType<typeof schema>;

type AuthSigninFormProps = {
  onSubmitted: (data: AuthSigninFormData) => void;
};

const AuthSigninForm: React.FC<AuthSigninFormProps> = (props) => {
  const { onSubmitted } = props;
  const { control, handleSubmit } = useForm<AuthSigninFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      twoFactorCode: '',
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitted)}>
      <Controller
        name="email"
        control={control}
        render={({ field: { name, ref, onBlur, value, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            value={value}
            name={name}
            label="Email"
            type="email"
            inputMode="email"
            placeholder="youremail@mail.com"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { name, ref, onBlur, value, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            value={value}
            name={name}
            label="Password"
            type="password"
            placeholder="Secure Password"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            reseteable={false}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        name="twoFactorCode"
        control={control}
        render={({ field: { name, ref, onChange, value }, fieldState }) => {
          return (
            <OtpInput
              ref={ref}
              id={name}
              label="Confirmation Code"
              valueLength={6}
              error={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              reseteable={false}
              onChange={onChange}
              value={value}
            />
          );
        }}
      />
      <div className="flex w-full flex-col space-y-2">
        <div className="flex space-x-1 text-sm">
          <p className="font-medium">Forgot your password?</p>
          <Link className="font-bold text-red-800 dark:text-red-400" href="/auth/reset-password">
            Reset it
          </Link>
        </div>
        <Button className="w-full" type="submit" size="lg">
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default AuthSigninForm;

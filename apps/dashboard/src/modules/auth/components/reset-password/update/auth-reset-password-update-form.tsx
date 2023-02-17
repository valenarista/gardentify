import { Button, TextInput } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { OtpInput } from '@modules/common/components/otp-input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
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

export type AuthResetPasswordUpdateFormData = yup.InferType<typeof schema>;

type AuthResetPasswordUpdateFormProps = {
  onSubmitted: (data: AuthResetPasswordUpdateFormData) => void;
};

const AuthResetPasswordUpdateForm: React.FC<AuthResetPasswordUpdateFormProps> = (props) => {
  const { onSubmitted } = props;
  const { control, handleSubmit } = useForm<AuthResetPasswordUpdateFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      password: '',
      twoFactorCode: '',
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitted)}>
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            id={field.name}
            label="Password"
            type="password"
            placeholder="Password"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="twoFactorCode"
        control={control}
        render={({ field, fieldState }) => {
          const { onChange, value, ...rest } = field;

          return (
            <OtpInput
              id={field.name}
              label="Confirmation Code"
              valueLength={6}
              error={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              value={value}
              onChange={onChange}
              {...rest}
            />
          );
        }}
      />

      <div className="!mt-2 flex w-full flex-col space-y-2">
        <Button className="w-full" type="submit" size="lg">
          Update
        </Button>
      </div>
    </form>
  );
};

export default AuthResetPasswordUpdateForm;

import { Button, TextInput } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Email must be of type email'),
});

export type AuthTwoFactorFormData = yup.InferType<typeof schema>;

type AuthTwoFactorFormProps = {
  onSubmitted: (data: AuthTwoFactorFormData) => void;
};

const AuthTwoFactorForm: React.FC<AuthTwoFactorFormProps> = (props) => {
  const { onSubmitted } = props;
  const { control, handleSubmit } = useForm<AuthTwoFactorFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitted)}>
      <Controller
        name="email"
        control={control}
        render={({ field: { name, ref, onBlur, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
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
      <div className="flex w-full flex-col space-y-1">
        <Button className="w-full" type="submit" size="lg">
          Setup 2FA
        </Button>
      </div>
    </form>
  );
};

export default AuthTwoFactorForm;

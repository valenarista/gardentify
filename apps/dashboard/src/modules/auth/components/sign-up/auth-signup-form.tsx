import { Button, TextInput } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
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

export type AuthSignupFormData = yup.InferType<typeof schema>;

type AuthSignupFormProps = {
  onSubmitted: (data: AuthSignupFormData) => void;
};

const AuthSignupForm: React.FC<AuthSignupFormProps> = (props) => {
  const { onSubmitted } = props;
  const { control, handleSubmit } = useForm<AuthSignupFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitted)}>
      <Controller
        name="email"
        control={control}
        render={({ field: { ref, value, onChange, onBlur, name }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            name={name}
            value={value}
            label="Email"
            type="email"
            inputMode="email"
            placeholder="youremail@mail.com"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field: { ref, value, onChange, onBlur, name }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            name={name}
            value={value}
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
        name="password"
        control={control}
        render={({ field: { name, value, ref, onBlur, onChange }, fieldState }) => (
          <TextInput
            ref={ref}
            id={name}
            name={name}
            value={value}
            label="Password"
            type="password"
            placeholder="Secure Password"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            onValueChanged={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <div className="flex w-full flex-col space-y-2">
        <Button className="w-full" type="submit" size="lg">
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default AuthSignupForm;

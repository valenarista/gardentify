import { Button, TextInput } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'The minimum lenght is 8 characters')
    .max(32, 'The max lenght is 32 characters'),
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
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <div className="!mt-1.5 flex w-full flex-col space-y-1">
        <Button className="w-full" type="submit">
          Update
        </Button>
      </div>
    </form>
  );
};

export default AuthResetPasswordUpdateForm;

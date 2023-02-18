import { Button, TextInput } from '@gardentify/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Email must be of type email'),
});

export type AuthResetPasswordResetFormData = yup.InferType<typeof schema>;

type AuthResetPasswordResetFormProps = {
  onSubmitted: (data: AuthResetPasswordResetFormData) => void;
};

const AuthResetPasswordResetForm: React.FC<AuthResetPasswordResetFormProps> = (props) => {
  const { onSubmitted } = props;
  const { control, handleSubmit } = useForm<AuthResetPasswordResetFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
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
            placeholder="youremail@mail.com"
            error={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <div className="flex w-full flex-col space-y-1">
        <Button className="w-full" type="submit" size="lg">
          Reset
        </Button>
      </div>
    </form>
  );
};

export default AuthResetPasswordResetForm;

import { useToast } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { AuthActionType } from '@modules/auth/context/reducer/types';
import { useSignupMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

import AuthHeader from '../auth-header';
import AuthSignupForm, { AuthSignupFormData } from './auth-signup-form';

const AuthSignUp: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useAuthContext();
  const { toast } = useToast();
  const [signup] = useSignupMutation();

  const handleSignUp = async (data: AuthSignupFormData) => {
    try {
      const response = await signup({
        variables: {
          input: {
            ...data,
          },
        },
      });

      const signupData = response.data;

      if (signupData && signupData.signup.user && signupData.signup.user.uuid) {
        const user = signupData.signup.user;
        dispatch({
          type: AuthActionType.SIGNUP,
          payload: {
            user: user,
            accessToken: signupData.signup.accessToken,
          },
        });
        await router.push(`/users/${user.uuid}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        toast({ variant: 'error', content: errorMessage });
      }
    }
  };

  return (
    <div className="flex w-[350px] flex-col space-y-2 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:w-[450px] md:p-6">
      <AuthHeader title="Sign Up" href="/auth" />
      <p>Create your Gardentify account using your email, a custom username and a secure password.</p>
      <AuthSignupForm onSubmitted={handleSignUp} />
    </div>
  );
};

export default AuthSignUp;

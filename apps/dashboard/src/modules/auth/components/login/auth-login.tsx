import { useToast } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { AuthActionType } from '@modules/auth/context/reducer/types';
import { useLoginMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

import AuthHeader from '../auth-header';
import AuthSigninForm, { AuthSigninFormData } from './auth-login-form';

const AuthLogin: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useAuthContext();
  const { toast } = useToast();
  const [login] = useLoginMutation();

  const handleLogin = async (data: AuthSigninFormData) => {
    try {
      const response = await login({
        variables: {
          input: {
            ...data,
          },
        },
      });

      const loginData = response.data;

      if (loginData && loginData.login.user && loginData.login.user.uuid) {
        const user = loginData.login.user;
        dispatch({
          type: AuthActionType.LOGIN,
          payload: {
            user: user,
            accessToken: loginData.login.accessToken,
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
      <AuthHeader title="Login" href="/auth" />
      <p>Login into your Gardentify account using your email and password.</p>

      <AuthSigninForm onSubmitted={handleLogin} />
    </div>
  );
};

export default AuthLogin;

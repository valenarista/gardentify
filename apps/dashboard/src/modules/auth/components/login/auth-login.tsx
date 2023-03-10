import { useToast } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { MeDocument, MeQuery, MeQueryVariables, useLoginMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

import AuthHeader from '../auth-header';
import AuthSigninForm, { AuthSigninFormData } from './auth-login-form';

const AuthLogin: React.FC = () => {
  const router = useRouter();
  const { setUserLoggedIn } = useAuthContext();
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
        update: (cache, { data: cacheData }) => {
          if (!cacheData) return;
          cache.writeQuery<MeQuery, MeQueryVariables>({
            data: { me: cacheData.login.user },
            query: MeDocument,
          });
        },
        onCompleted() {
          setUserLoggedIn(true);
        },
      });

      const loginData = response.data;
      if (loginData && loginData.login.user && loginData.login.user.uuid) {
        await router.push(`/users/${loginData.login.user.uuid}`);
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

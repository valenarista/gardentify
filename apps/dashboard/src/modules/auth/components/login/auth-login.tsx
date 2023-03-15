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
    await login({
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
      async onCompleted(loginResponse) {
        if (loginResponse.login.user) {
          setUserLoggedIn(true);
          toast({ variant: 'success', content: 'Logged in successfully!' });
          await router.push(`/users/${loginResponse.login.user.uuid}`);
        }
      },
      onError(error) {
        toast({ variant: 'error', content: error.message });
      },
    });
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

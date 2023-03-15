import { useToast } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { MeDocument, MeQuery, useSignUpMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

import AuthHeader from '../auth-header';
import AuthSignupForm, { AuthSignupFormData } from './auth-signup-form';

const AuthSignUp: React.FC = () => {
  const router = useRouter();
  const { setUserLoggedIn } = useAuthContext();
  const { toast } = useToast();
  const [signup] = useSignUpMutation();

  const handleSignUp = async (data: AuthSignupFormData) => {
    await signup({
      variables: {
        input: {
          ...data,
        },
      },
      update(cache, { data: cacheData }) {
        if (!cacheData?.signUp.user) return;

        cache.writeQuery<MeQuery>({
          data: { me: cacheData.signUp.user },
          query: MeDocument,
        });
      },
      async onCompleted(signupResponse) {
        if (signupResponse.signUp.user) {
          setUserLoggedIn(true);
          toast({ variant: 'success', content: 'Password resetted successfully!' });
          await router.push(`/users/${signupResponse.signUp.user.uuid}`);
        }
      },
      onError(error) {
        toast({ variant: 'error', content: error.message });
      },
    });
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

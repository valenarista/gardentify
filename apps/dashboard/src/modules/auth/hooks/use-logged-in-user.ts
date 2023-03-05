import useApiQuery from '@modules/common/hooks/use-api-query';
import { MeDocument, MeQuery, MeQueryVariables, User } from '@modules/graphql/@generated/graphql';
import { useEffect, useState } from 'react';

const useLoggedInUser = () => {
  const shouldSkipQury = typeof window !== 'undefined' && localStorage.getItem('token') === '';

  const { response, loading } = useApiQuery<MeQuery, MeQueryVariables>(MeDocument, {
    skip: shouldSkipQury,
    ssr: true,
  });

  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    setUserLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (response && response.data && response.data.me.user) {
      setLoggedInUser(response.data.me.user);
    }
  }, [response]);

  return { loggedInUser, userLoading };
};

export default useLoggedInUser;

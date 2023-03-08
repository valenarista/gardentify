import { useMeQuery, User } from '@modules/graphql/@generated/graphql';
import { useEffect, useState } from 'react';

const useLoggedInUser = () => {
  const shouldSkipQury = typeof window !== 'undefined' && localStorage.getItem('token') === '';
  const response = useMeQuery({
    skip: shouldSkipQury,
    ssr: true,
  });

  const { data, loading } = response;

  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    setUserLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (data && data.me && data.me.user) {
      setLoggedInUser(data.me.user);
    }
  }, [data]);

  return { loggedInUser, userLoading };
};

export default useLoggedInUser;

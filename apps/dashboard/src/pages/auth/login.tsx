import AuthLogin from '@modules/auth/components/login/auth-login';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { AuthActionType } from '@modules/auth/context/reducer/types';
import Layout from '@modules/layout/components/layout';
import { useEffect } from 'react';

const LoginPage: React.FC = () => {
  const { dispatch } = useAuthContext();

  useEffect(() => {
    dispatch({
      type: AuthActionType.LOGOUT,
      payload: {},
    });
  }, []);

  return (
    <Layout
      headProps={{
        title: 'Login | Gardentify',
        description: 'Login to Gardentify to unlock all the features in just a couple of clicks.',
      }}
    >
      <AuthLogin />
    </Layout>
  );
};

export default LoginPage;

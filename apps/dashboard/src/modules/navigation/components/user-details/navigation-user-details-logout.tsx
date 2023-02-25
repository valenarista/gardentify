import { Button, IconButton } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { AuthActionType } from '@modules/auth/context/reducer/types';
import { useNavigationContext } from '@modules/navigation/context/navigation-context';
import { useRouter } from 'next/router';
import React from 'react';

const NavigationUserDetailsLogout: React.FC = () => {
  const router = useRouter();
  const { isCompact } = useNavigationContext();
  const { dispatch } = useAuthContext();

  const handleLogout = async () => {
    dispatch({
      type: AuthActionType.LOGOUT,
      payload: {},
    });
    await router.push('/');
  };

  const logoutIcon = (
    <svg
      className="h-5 w-5 stroke-black dark:stroke-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  return (
    <>
      {isCompact ? (
        <IconButton aria-label="Logout" icon={logoutIcon} onClick={handleLogout} />
      ) : (
        <Button
          className="w-full !justify-start"
          size="lg"
          aria-label="Logout"
          onClick={handleLogout}
          icon={logoutIcon}
        >
          Logout
        </Button>
      )}
    </>
  );
};
export default NavigationUserDetailsLogout;

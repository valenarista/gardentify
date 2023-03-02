import { Button } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import Link from 'next/link';
import React from 'react';

const UserProfileManagement2FA: React.FC = () => {
  const { state } = useAuthContext();

  return (
    <>
      {state.user && !state.user.twoFactorEnabled ? (
        <Link href="/auth/two-factor">
          <Button className="w-full" colorScheme="secondary" variant="ghost">
            Setup 2FA
          </Button>
        </Link>
      ) : null}
    </>
  );
};
export default UserProfileManagement2FA;

import { Button } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const UserProfileContainersHeader: React.FC = () => {
  const router = useRouter();
  const { state } = useAuthContext();

  const userUuid = router.query.uuid as string;

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
      <h2 className="text-2xl font-bold">Containers</h2>
      {/* Management */}
      {state.user && userUuid === state.user.uuid ? (
        <Link href="/containers" className="w-full md:w-auto">
          <Button className="w-full md:w-auto">Manage Containers</Button>
        </Link>
      ) : null}
    </div>
  );
};

export default UserProfileContainersHeader;

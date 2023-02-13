import useApiQuery from '@modules/common/hooks/use-api-query';
import ContainersFeed from '@modules/containers/components/feed/containers-feed';
import {
  Container,
  FindUserContainersDocument,
  FindUserContainersQuery,
  FindUserContainersQueryVariables,
} from '@modules/graphql/@generated/graphql';
import React from 'react';

import { useUserProfileContext } from '../../context/user-profile-context';

const UserProfileContainers: React.FC = (props) => {
  const {} = props;
  const { user } = useUserProfileContext();
  const { response, loading } = useApiQuery<FindUserContainersQuery, FindUserContainersQueryVariables>(
    FindUserContainersDocument,
    {
      variables: {
        input: {
          userUuid: user?.uuid,
        },
      },
      skip: user?.uuid === undefined,
    }
  );

  const containers: Container[] = response?.data?.findUserContainers.containers || [];

  return (
    <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      {/* Details */}
      <div className="flex w-full flex-col space-y-2">
        <h2 className="text-2xl font-bold">User Containers</h2>

        {response?.error ? (
          <span className="text-neutral-800 dark:text-neutral-100">{response.error.message}</span>
        ) : null}
        {loading ? (
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
        ) : (
          <ContainersFeed containers={containers} />
        )}
      </div>
    </div>
  );
};

export default UserProfileContainers;

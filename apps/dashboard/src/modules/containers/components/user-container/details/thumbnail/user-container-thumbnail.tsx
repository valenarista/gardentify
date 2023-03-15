import { __API__ } from '@modules/common/lib/constants';
import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import Image from 'next/image';
import React from 'react';

const UserContainerThumbnail: React.FC = () => {
  const { container } = useUserContainerContext();

  const containerThumbnailImage = () => {
    const { thumbnail } = container;
    return `${__API__}/v1/images/${thumbnail?.uuid!}/low-res`;
  };

  return (
    <div className="flex">
      {container.thumbnail ? (
        <Image
          src={containerThumbnailImage()}
          alt="Container Thumbnail"
          width={256}
          height={256}
          priority
          className="h-32 w-full rounded-lg object-cover object-center md:h-36 md:w-36"
        />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-lg bg-neutral-100 object-cover object-center p-4 shadow-md dark:bg-neutral-900 md:h-36 md:w-36">
          <span className="text-primary-800 dark:text-primary-300 text-2xl font-bold">Container</span>
        </div>
      )}
    </div>
  );
};

export default UserContainerThumbnail;

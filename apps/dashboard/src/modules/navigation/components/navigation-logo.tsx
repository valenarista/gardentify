import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useNavigationContext } from '../context/navigation-context';

const NavigationLogo: React.FC = () => {
  const { isCompact } = useNavigationContext();

  return (
    <Link href="/">
      {isCompact ? (
        <Image src="/assets/logos/logo-icon-white.svg" alt="Gardentify Logo" width={35} height={35} />
      ) : (
        <Image src="/assets/logos/logo-light.svg" alt="Gardentify Logo" width={250} height={100} />
      )}
    </Link>
  );
};

export default NavigationLogo;

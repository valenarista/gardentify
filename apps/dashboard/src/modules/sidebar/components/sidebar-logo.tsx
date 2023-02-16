import Image from 'next/image';
import React from 'react';

const SidebarLogo: React.FC = () => {
  return <Image src="/assets/logos/logo-light.svg" alt="Gardentify Logo" width={250} height={100} />;
};

export default SidebarLogo;

import { Button, IconButton } from '@gardentify/ui';
import Link from 'next/link';
import React from 'react';

import { useNavigationContext } from '../context/navigation-context';
import { NavigationLink as NavigationLinkData } from './navigation';

export type NavigationLinkProps = {
  data: NavigationLinkData;
};

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  const { data } = props;
  const { href, label, icon } = data;

  const { isCompact } = useNavigationContext();

  return (
    <Link href={href}>
      {isCompact ? (
        <IconButton icon={icon} />
      ) : (
        <Button className="w-full !justify-start" size="lg" icon={icon} iconPosition="start">
          {label}
        </Button>
      )}
    </Link>
  );
};

export default NavigationLink;

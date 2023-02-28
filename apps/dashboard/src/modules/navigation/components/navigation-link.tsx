import { Button, IconButton } from '@gardentify/ui';
import Link from 'next/link';
import React from 'react';

import { useNavigationContext } from '../context/navigation-context';

export type NavigationLinkProps = {
  href: string;
  label: string;
  icon: React.ReactElement;
};

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  const { href, label, icon } = props;

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

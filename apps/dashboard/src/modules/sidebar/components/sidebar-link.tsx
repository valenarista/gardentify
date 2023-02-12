import { Button } from '@gardentify/ui';
import Link from 'next/link';
import React from 'react';

export type SidebarLinkProps = {
  href: string;
  label: string;
  icon: React.ReactElement;
};

const SidebarLink: React.FC<SidebarLinkProps> = (props) => {
  const { href, label, icon } = props;

  return (
    <Link href={href}>
      <Button className="w-full !justify-start" size="lg" icon={icon} iconPosition="start">
        {label}
      </Button>
    </Link>
  );
};

export default SidebarLink;

import { Button, ButtonProps } from '@gardentify/ui';
import Link from 'next/link';
import React from 'react';

export type UserAuthEntryProps = Omit<ButtonProps, 'ref'> & {
  href: string;
  label: string;
};

const UserAuthEntry: React.FC<UserAuthEntryProps> = (props) => {
  const { href, label, ...rest } = props;

  return (
    <Link className="w-full" href={href}>
      <Button className="w-full" {...rest}>
        {label}
      </Button>
    </Link>
  );
};

export default UserAuthEntry;

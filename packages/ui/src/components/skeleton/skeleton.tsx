import clsx from 'clsx';
import React from 'react';

type SkeletonProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  loading: boolean;
  wrapperClassNames?: string;
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { loading, children, wrapperClassNames = 'rounded-md w-fit', ...rest } = props;

  return (
    <div
      ref={ref}
      className={clsx(
        loading
          ? 'skeleton animate-pulse cursor-default bg-neutral-300 dark:bg-neutral-700 bg-clip-padding transition-all duration-200'
          : '',
        wrapperClassNames
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Skeleton.displayName = 'Skeleton';

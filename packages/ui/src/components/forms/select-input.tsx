import clsx from 'clsx';
import React, { InputHTMLAttributes } from 'react';
import { InputWrapper, InputWrapperProps } from './input-wrapper';

type SelectInputProps = InputWrapperProps & InputHTMLAttributes<HTMLSelectElement> & {};

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>((props, ref) => {
  const { id, label, error, errorMessage, name, help, helpMessage, children, ...rest } = props;

  return (
    <InputWrapper id={id} label={label} error={error} errorMessage={errorMessage} help={help} helpMessage={helpMessage}>
      <select
        ref={ref}
        name={name}
        className={clsx(
          'shadow-sm bg-neutral-50 border-2 border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light',
          error ? 'border-2 !border-red-600 dark:!border-red-400' : ''
        )}
        aria-invalid={error ? 'true' : 'false'}
        {...rest}
      >
        {children}
      </select>
    </InputWrapper>
  );
});

SelectInput.displayName = 'SelectInput';

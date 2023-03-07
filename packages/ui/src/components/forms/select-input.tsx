import clsx from 'clsx';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { InputWrapper, InputWrapperProps } from './input-wrapper';

type SelectInputProps = Omit<InputWrapperProps, 'onInputReseted'> &
  Omit<InputHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> & {
    /**
     * Callback function called when the value changes.
     * @param value New value
     * @returns void.
     */
    onValueChanged: (value: string) => void;
  };

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>((props, ref) => {
  const {
    id,
    label,
    error,
    errorMessage,
    help,
    helpMessage,
    name,
    children,
    onValueChanged,
    reseteable,
    defaultValue,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState<string>(typeof defaultValue === 'string' ? defaultValue : '');

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleInputReset = () => {
    if (typeof defaultValue === 'string') {
      setInputValue(defaultValue);
    } else {
      setInputValue('');
    }
  };

  useEffect(() => {
    onValueChanged(inputValue);
  }, [inputValue]);

  return (
    <InputWrapper
      id={id}
      label={label}
      error={error}
      errorMessage={errorMessage}
      help={help}
      helpMessage={helpMessage}
      onInputReseted={handleInputReset}
      reseteable={reseteable}
    >
      <select
        ref={ref}
        name={name}
        className={clsx(
          'shadow-sm bg-neutral-50 border-2 border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light',
          error ? 'border-2 !border-red-600 dark:!border-red-400' : ''
        )}
        aria-invalid={error ? 'true' : 'false'}
        value={inputValue}
        onChange={handleInputChange}
        {...rest}
      >
        {children}
      </select>
    </InputWrapper>
  );
});

SelectInput.displayName = 'SelectInput';

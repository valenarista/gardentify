import clsx from 'clsx';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { InputWrapper, InputWrapperProps } from './input-wrapper';

type TextInputProps = Omit<InputWrapperProps, 'onInputReseted'> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    /**
     * Callback function called when the value changes.
     * @param value New value
     * @returns void.
     */
    onValueChanged: (value: string) => void;
  };

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
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
    onReset,
    ...rest
  } = props;

  const getConvertedValue = (value: string | number) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    return '';
  };

  const [inputValue, setInputValue] = useState<string>(getConvertedValue(defaultValue as string | number));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);
  };

  const handleInputReset = () => {
    setInputValue(getConvertedValue(defaultValue as string | number));
  };

  useEffect(() => {
    onValueChanged(getConvertedValue(inputValue));
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
      <input
        ref={ref}
        name={name}
        className={clsx(
          'shadow-sm bg-neutral-50 border-2 border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light',
          error ? 'border-2 !border-red-600 dark:!border-red-400' : ''
        )}
        aria-invalid={error ? 'true' : 'false'}
        value={inputValue}
        onChange={handleInputChange}
        onReset={handleInputReset}
        {...rest}
      />
    </InputWrapper>
  );
});

TextInput.displayName = 'TextInput';

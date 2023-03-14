import clsx from 'clsx';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { InputWrapper, InputWrapperProps } from './input-wrapper';

type FileInputProps = Omit<InputWrapperProps, 'onInputReseted'> & {
  /** Name of the input */
  name: string;
  multiple?: boolean;
  /** Input onBlur handler */
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
  /**
   * Callback function called when the value changes.
   * @param value New value
   * @returns void.
   */
  onValueChanged: (files: File[]) => void;
};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  const {
    id,
    label,
    multiple = false,
    error = false,
    errorMessage,
    help = false,
    helpMessage,
    name,
    onBlur,
    onValueChanged,
    reseteable,
  } = props;

  const [inputValue, setInputValue] = useState<File[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setInputValue(files);
  };

  const handleInputReset = () => {
    setInputValue([]);
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
      reseteable={reseteable}
      onInputReseted={handleInputReset}
    >
      <input
        ref={ref}
        name={name}
        multiple={multiple}
        accept="image/*"
        type="file"
        className={clsx(
          'shadow-sm bg-neutral-50 border-2 border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light',
          error ? 'border-2 !border-red-600 dark:!border-red-400' : ''
        )}
        aria-invalid={error ? 'true' : 'false'}
        onChange={handleInputChange}
        onBlur={onBlur}
      />
    </InputWrapper>
  );
});

FileInput.displayName = 'FileInput';

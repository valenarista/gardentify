import React from 'react';

export type InputWrapperProps = {
  /** Id of the input */
  id: string;
  /** Label to display on top of the input */
  label: string;
  /** Wether the input is invalid or not */
  error: boolean;
  /** Optional: Error message to display when invalid */
  errorMessage?: string;
  /** Optional: Wether to show or not a help message */
  help?: boolean;
  /** Optional: Help message to display */
  helpMessage?: string;
  /** Children */
  children?: React.ReactNode;
};

export const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>((props, ref) => {
  const { id, label, error, errorMessage = '', help = false, helpMessage = '', children } = props;

  return (
    <div className="flex flex-col items-start w-full" ref={ref}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
        {label}
      </label>
      {children}
      {help ? <p className="text-sm mt-0.5 text-neutral-800 dark:text-neutral-300">{helpMessage}</p> : null}
      {error ? (
        <p className="text-sm !text-red-600 dark:!text-red-400 font-medium" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
});

InputWrapper.displayName = 'InputWrapper';

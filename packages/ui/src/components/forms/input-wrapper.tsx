import { Switch } from '@headlessui/react';
import React, { useState } from 'react';

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
  /** Optional: Wether the input can be toggled off or not */
  toggleable?: boolean;
  onToggled?: (toggled: boolean) => void;
  /** Children */
  children?: React.ReactNode;
};

export const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>((props, ref) => {
  const {
    id,
    label,
    error,
    errorMessage = '',
    help = false,
    helpMessage = '',
    toggleable = false,
    onToggled = () => {},
    children,
  } = props;

  const [enabled, setEnabled] = useState<boolean>(!toggleable || true);

  const handleInputEnabled = () => {
    setEnabled((prev) => {
      const newState = !prev;
      onToggled(newState);
      return newState;
    });
  };

  return (
    <div className="flex flex-col items-start w-full" ref={ref}>
      <div className="flex flex-row items-center justify-between w-full mb-1.5">
        <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
          {label}
        </label>
        {toggleable ? (
          <Switch
            name="isQuantityDisabled"
            checked={enabled}
            onChange={handleInputEnabled}
            className={`${enabled ? 'bg-primary-900 dark:bg-primary-700' : 'bg-red-700 dark:bg-red-500'}
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        ) : null}
      </div>
      {enabled ? (
        <>
          {children}
          {help ? <p className="text-sm mt-0.5 text-neutral-800 dark:text-neutral-300">{helpMessage}</p> : null}
          {error ? (
            <p className="text-sm !text-red-600 dark:!text-red-400 font-medium" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  );
});

InputWrapper.displayName = 'InputWrapper';

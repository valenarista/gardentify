import { InputWrapperProps } from '@gardentify/ui';
import { InputWrapper } from '@gardentify/ui';
import React, { useMemo } from 'react';

type OtpInputProps = Omit<InputWrapperProps, 'onInputReseted'> & {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

const RE_DIGIT = new RegExp(/^\d+$/);

export const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>((props, ref) => {
  const { value, valueLength, onChange, ...rest } = props;

  const items = useMemo(() => {
    const valueArray = value.split('');
    const arr: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        arr.push(char);
      } else {
        arr.push('');
      }
    }
    return arr;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || targetValue !== '') {
      return;
    }

    focusToPrevInput(target);
  };
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    // keep focusing back until previous input
    // element has value
    const prevInputEl = target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  const handleInputReset = () => {};

  return (
    <InputWrapper {...rest} onInputReseted={handleInputReset} ref={ref}>
      <div className="flex w-full space-x-2">
        {items.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{1}"
            maxLength={valueLength}
            onChange={(e) => handleInputChange(e, idx)}
            onKeyDown={inputOnKeyDown}
            onFocus={inputOnFocus}
            className="h-12 w-full rounded-md border-[2px] border-neutral-300 bg-neutral-50 p-0 text-center text-3xl font-bold text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 md:h-14"
            value={digit}
          />
        ))}
      </div>
    </InputWrapper>
  );
});

OtpInput.displayName = 'OtpInput';

import { forwardRef, ComponentProps } from 'react';

interface IInputProps extends ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
  errorMessageOnTop?: boolean;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, label, errorMessage, ...rest }, ref) => {
    const id = rest.id ?? `input-${Date.now()}-${Math.random().toString(36)}`;
    return (
      <div className={`gap-xs flex flex-col ${className}`}>
        <div className={'gap-xs flex flex-col'}>
          {label && <label htmlFor={id}>{label}</label>}
          <input
            ref={ref}
            id={id}
            className={`border-hairline rounded-sm border-black px-3 py-2 disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-300 ${className}`}
            autoComplete='one-time-code'
            {...rest}
          />
        </div>
        {errorMessage && (
          <p className={'text-sm italic text-red-600'}>*{errorMessage}</p>
        )}
      </div>
    );
  }
);

export { Input };

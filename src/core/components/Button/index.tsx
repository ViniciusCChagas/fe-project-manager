import { ComponentProps } from 'react';
import { Icon } from '../Icon';

interface IButtonProps extends ComponentProps<'button'> {
  leftIconClassName?: string;
  leftIcon?: string;
  loading?: boolean;
}

export function Button({
  leftIcon,
  leftIconClassName,
  loading,
  children,
  className,
  ...rest
}: IButtonProps) {
  return (
    <button
      className={`gap-xs flex justify-center items-center rounded-sm bg-yellow-400 px-3 py-2 font-medium ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {leftIcon && !loading && <Icon icon={leftIcon} className={leftIconClassName} />}
      {loading ? (
        <Icon icon={'progress_activity'} className={'animate-spin'} />
      ) : (
        children
      )}
    </button>
  );
}

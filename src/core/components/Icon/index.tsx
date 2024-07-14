interface IIconProps {
  icon: string;
  onClick?: () => void;
  className?: string;
  title?: string;
}

export function Icon({ icon, title, className = '', onClick }: IIconProps) {
  return (
    <span
      title={title}
      className={`material-symbols-rounded ${className}`}
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick && onClick();
        }
      }}
    >
      {icon}
    </span>
  );
}

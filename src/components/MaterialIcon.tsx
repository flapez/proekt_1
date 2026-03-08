import { memo } from 'react';

interface Props {
  icon: string;
  filled?: boolean;
  size?: number;
  className?: string;
}

export const MaterialIcon = memo(function MaterialIcon({ icon, filled, size = 24, className = '' }: Props) {
  return (
    <span
      className={`material-symbols-rounded ${filled ? 'filled' : ''} ${className}`}
      style={{ fontSize: size }}
    >
      {icon}
    </span>
  );
});

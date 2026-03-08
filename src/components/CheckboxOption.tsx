import { memo } from 'react';

interface Props {
  value: string;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
}

export const CheckboxOption = memo(function CheckboxOption({ value, checked, onChange }: Props) {
  return (
    <label
      className={`
        flex items-center gap-7 px-8 py-7 rounded-[24px] cursor-pointer transition-all duration-200 touch-manipulation
        ${checked
          ? 'bg-m-primary-container/40 border-2 border-m-primary m-elevation-1'
          : 'bg-m-surface-container-low border-2 border-transparent hover:bg-m-surface-container-high'
        }
      `}
    >
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={(e) => onChange(value, e.target.checked)}
        className="sr-only"
      />
      {/* Checkbox square */}
      <div className={`
        w-8 h-8 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
        ${checked ? 'bg-m-primary border-m-primary' : 'border-m-outline bg-m-surface-container-lowest'}
      `}>
        {checked && (
          <svg
            className="w-5 h-5 text-m-on-primary animate-check-pop"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span className="text-[16px] sm:text-[17px] text-m-on-surface flex-1 leading-relaxed">{value}</span>
    </label>
  );
});

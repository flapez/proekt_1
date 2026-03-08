import { memo } from 'react';

interface Props {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const RadioOption = memo(function RadioOption({ name, value, checked, onChange }: Props) {
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
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {/* Radio circle */}
      <div className={`
        w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
        ${checked ? 'border-m-primary bg-m-surface-container-lowest' : 'border-m-outline'}
      `}>
        <div className={`
          w-4.5 h-4.5 rounded-full transition-all duration-200 transform
          ${checked ? 'bg-m-primary scale-100' : 'bg-transparent scale-0'}
        `} style={{ width: '18px', height: '18px' }} />
      </div>
      <span className="text-[16px] sm:text-[17px] text-m-on-surface flex-1 leading-relaxed">{value}</span>
    </label>
  );
});

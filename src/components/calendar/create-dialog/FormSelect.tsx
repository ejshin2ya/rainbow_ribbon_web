import { SelectHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ReactComponent as ArrowDownIcon } from 'src/assets/ArrowDown.svg';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  placeHolder?: string;
  optionList?: { value: string; title: string }[];
  className?: string;
}

export const FormSelect = function ({
  name,
  optionList,
  placeHolder,
  className,
  ...rest
}: Props) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <div
      className={`relative w-full h-[46px] border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1 ${className ?? ''}`}
    >
      <select
        className="w-full h-full outline-none appearance-none text-[14px]"
        defaultValue={''}
        {...rest}
        {...field}
      >
        <option value="" disabled hidden>
          {placeHolder}
        </option>
        {optionList?.map((option, idx) => {
          return (
            <option key={`${name}-opt-${idx}`} value={option.value}>
              {option.title}
            </option>
          );
        })}
      </select>
      <label className="absolute inset-y-0 right-[12px] flex items-center px-2 pointer-events-none">
        <ArrowDownIcon style={{ color: '#858583' }} />
      </label>
    </div>
  );
};

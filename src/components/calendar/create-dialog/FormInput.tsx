import { InputHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeHolder?: string;
  className?: string;
  hasErrorMessage?: boolean;
}

export const FormInput = function ({
  name,
  placeHolder,
  className,
  hasErrorMessage = false,
  ...rest
}: Props) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  return (
    <>
      <input
        className={`no-input-spinner relative w-full h-[46px] border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1 outline-none text-[14px] ${className ?? ''}`}
        placeholder={placeHolder}
        {...rest}
        {...field}
      />
      {hasErrorMessage && (
        <div className="w-full h-[18px] text-[12px] text-reborn-orange3 translate-y-[-4px] px-[4px]">
          {fieldState.error && fieldState.error.message}
        </div>
      )}
    </>
  );
};

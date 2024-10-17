import { InputHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeHolder?: string;
  className?: string;
}

export const FormInput = function ({
  name,
  placeHolder,
  className,
  ...rest
}: Props) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <input
      className={`no-input-spinner relative w-full h-[46px] border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1 outline-none text-[14px] ${className ?? ''}`}
      placeholder={placeHolder}
      {...rest}
      {...field}
    />
  );
};

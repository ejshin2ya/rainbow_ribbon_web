import { TextareaHTMLAttributes } from 'react';
import { useController, useFormContext } from 'react-hook-form';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeHolder?: string;
  className?: string;
  rows?: number;
}

export const FormTextArea = function ({
  name,
  placeHolder,
  className,
  rows = 5,
  ...rest
}: Props) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <textarea
      className={`relative w-full border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1 outline-none text-[14px] resize-none focus:outline-none leading-[18px] font-medium  ${className ?? ''}`}
      placeholder={placeHolder}
      rows={rows}
      {...rest}
      {...field}
    />
  );
};

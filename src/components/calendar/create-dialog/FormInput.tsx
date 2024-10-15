import { useController, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  placeHolder?: string;
}

export const FormInput = function ({ name, placeHolder }: Props) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <input
      className="relative w-full h-[46px] border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1 outline-none text-[14px]"
      placeholder={placeHolder}
      {...field}
    />
  );
};

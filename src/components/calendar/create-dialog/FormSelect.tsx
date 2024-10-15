import { useController, useFormContext } from 'react-hook-form';
import { ReactComponent as ArrowDownIcon } from 'src/assets/ArrowDown.svg';

interface Props {
  name: string;
  placeHolder?: string;
  optionList?: string;
}

export const FormSelect = function ({ name, optionList, placeHolder }: Props) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <div className="relative w-full h-[46px] border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1">
      <select
        className="w-full h-full outline-none appearance-none text-[14px]"
        {...field}
        defaultValue={''}
      >
        <option value="" disabled hidden>
          {placeHolder}
        </option>
        <option value={'ㅎㅇ1'}>ㅎㅇ1</option>
        <option value={'ㅎㅇ2'}>ㅎㅇ2</option>
      </select>
      <label className="absolute inset-y-0 right-[12px] flex items-center px-2 pointer-events-none">
        <ArrowDownIcon style={{ color: '#858583' }} />
      </label>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ReactComponent as ArrowDownIcon } from 'src/assets/ArrowDown.svg';

interface Props {
  name: string;
  placeHolder?: string;
  optionList?: { value: any; title: string }[];
  className?: string;
}

export const FormSelect = function ({
  name,
  optionList = [],
  placeHolder,
  className,
}: Props) {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [dropdown, setDropdown] = useState(false);
  const { control, setValue } = useFormContext();
  const { field } = useController({ name, control });
  const toggleDropdown = function () {
    setDropdown(prev => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false); // 드롭다운 외부를 클릭하면 닫기
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdown]);
  return (
    <div
      className={`relative w-full h-[46px] border-[1px] py-[12.5px] px-[16px] rounded-[8px] border-reborn-gray1 cursor-pointer hover:bg-reborn-gray0 active:bg-reborn-gray1 duration-200 ${className ?? ''} ${field.value ? 'text-reborn-gray8' : 'text-reborn-gray3'}`}
      onClick={toggleDropdown}
    >
      <div className="text-[14px]">
        {optionList.filter(opt => opt.value === field.value)?.[0]?.title ||
          placeHolder}
      </div>
      {!!optionList.length && dropdown && (
        <ul
          className="absolute mt-[8px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-[1422] max-h-[170px] overflow-y-auto animate-scaleUp"
          onClick={e => {
            e.stopPropagation();
            setValue(name, `${(e.target as HTMLLIElement).value}`);
            setDropdown(false);
          }}
          ref={dropdownRef}
        >
          {optionList.map((option, idx) => (
            <li
              key={`${name}-${option.value}-${idx}`}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 duration-200 text-reborn-gray8"
              value={option.value}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
      <label className="absolute inset-y-0 right-[12px] flex items-center px-2 pointer-events-none">
        <ArrowDownIcon style={{ color: '#858583' }} />
      </label>
    </div>
  );
};

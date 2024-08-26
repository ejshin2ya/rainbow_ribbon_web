import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  subTitle?: string;
  onClick: () => void;
}

export const SideBarItem = function ({
  icon,
  title,
  subTitle,
  onClick,
}: Props) {
  return (
    <div
      className={`min-h-[52px] w-full py-[14px] px-[30px] flex flex-row  gap-[4px] cursor-pointer hover:bg-reborn-gray1 active:bg-reborn-gray2 duration-[0.2s]`}
      onClick={onClick}
    >
      <div className={`w-[18px] h-[18px] flex-shrink-0 pt-[4px]`}>
        {typeof icon === 'string' ? (
          <img src={icon} alt="아이콘" width={18} height={18} />
        ) : (
          icon
        )}
      </div>
      <div className="flex-1">
        <div className="text-reborn-gray8 text-[16px] font-semibold leading-[24px]">
          {title}
        </div>
        {subTitle && (
          <div className="text-reborn-gray3 font-semibold text-[14px] leading-[21px] mt-[3px]">
            {subTitle}
          </div>
        )}
      </div>
    </div>
  );
};

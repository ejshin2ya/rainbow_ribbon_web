import { ButtonGroup } from '../common/ButtonGroup';
import { useConfirmDialog } from './confitm-dialog-store';
import { ReactComponent as ClockIcon } from '../../assets/Clock.svg';
import { useState } from 'react';
import { useAvailableHours } from 'src/queries/reservation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyInfo } from 'src/services/companyService';

export const ReservationBlock = function () {
  const { confirmOption, cancelOption, selectedDate } = useConfirmDialog();
  const [tab, setTab] = useState<'am' | 'pm'>('am');
  const [selectedTimes, setSelectedTimes] = useState();
  const generateChangeTab = e => (tabName: 'am' | 'pm') => {
    e.preventDefault();
    setTab(tabName);
  };
  // TODO: 쿼리문 연동 및 삭제
  const { data: companyData } = useQuery({
    queryKey: ['company'],
    queryFn: () => {
      return getCompanyInfo().then(res => {
        return res;
      });
    },
  });
  const { data: timeData } = useAvailableHours(
    companyData?.data?.id ?? '',
    selectedDate.toISOString().slice(0, 10),
  );
  console.log(timeData);
  const gridCommonClass =
    'flex items-center justify-center text-[14px] border-[1px] rounded-[4px] h-full w-full';
  return (
    <div className="rounded-[10px] flex flex-col gap-[14px] bg-reborn-white w-[420px] h-[412px] items-center justify-center animate-fadeIn">
      <div className="w-full flex flex-row gap-[4px] items-center text-reborn-gray5 text-[16px] leading-[12px] text-center py-[20px] px-[22px]">
        <ClockIcon
          width={24}
          height={24}
          className="flex items-center justify-center"
        />
        예약 제한
      </div>
      <div className="w-full h-[32px] bg-reborn-gray0 flex items-center justify-center">{`${selectedDate.getFullYear()}.${selectedDate.getMonth()}.${selectedDate.getDate()} (${['일', '월', '화', '수', '목', '금', '토'][selectedDate.getDay()]})`}</div>
      <div className="w-full h-[40px] flex flex-row gap-[8px] px-[30px] text-[14px] font-medium">
        <button
          className={`flex-1 flex items-center justify-center border-[1px] rounded-[4px] ${tab === 'am' ? 'border-reborn-orange3 text-reborn-orange3' : 'border-reborn-gray3 text-reborn-gray8'}`}
          onClick={e => generateChangeTab(e)('am')}
        >
          오전
        </button>
        <button
          className={`flex-1 flex items-center justify-center border-[1px] rounded-[4px] ${tab === 'pm' ? 'border-reborn-orange3 text-reborn-orange3' : 'border-reborn-gray3 text-reborn-gray8'}`}
          onClick={e => generateChangeTab(e)('pm')}
        >
          오후
        </button>
      </div>
      <div className="w-full flex-1">
        <div className="w-full h-full px-[30px] items-center justify-center grid grid-cols-4 grid-rows-3 gap-[6px]">
          <button className={gridCommonClass}>00:00</button>
          <button className={gridCommonClass}>01:00</button>
          <button className={gridCommonClass}>02:00</button>
          <button className={gridCommonClass}>03:00</button>
          <button className={gridCommonClass}>04:00</button>
          <button className={gridCommonClass}>05:00</button>
          <button className={gridCommonClass}>06:00</button>
          <button className={gridCommonClass}>07:00</button>
          <button className={gridCommonClass}>08:00</button>
          <button className={gridCommonClass}>09:00</button>
          <button className={gridCommonClass}>10:00</button>
          <button className={gridCommonClass}>11:00</button>
        </div>
      </div>
      <div className="w-full h-[80px] py-[20px] px-[22px]">
        <ButtonGroup
          cancelButtonOptions={cancelOption}
          confirmButtonOptions={confirmOption}
        />
      </div>
    </div>
  );
};

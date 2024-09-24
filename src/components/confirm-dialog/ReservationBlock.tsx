import { ButtonGroup } from '../common/ButtonGroup';
import { useConfirmDialog } from './confitm-dialog-store';
import { ReactComponent as ClockIcon } from '../../assets/Clock.svg';
import { useEffect, useState } from 'react';
import { useAvailableHours } from 'src/queries/reservation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyInfo } from 'src/services/companyService';

export const ReservationBlock = function () {
  const { confirmOption, cancelOption, selectedDate } = useConfirmDialog();
  const [tab, setTab] = useState<'am' | 'pm'>('am');
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const generateChangeTab = e => (tabName: 'am' | 'pm') => {
    e.preventDefault();
    setTab(tabName);
  };
  const [companyId, setCompanyId] = useState('');
  // TODO: 쿼리문 연동 및 삭제
  const { data: companyData } = useQuery({
    queryKey: ['company'],
    queryFn: () => {
      return getCompanyInfo().then(res => {
        return res;
      });
    },
  });
  const { data: timeData, isLoading } = useAvailableHours(
    companyId,
    selectedDate.toISOString().slice(0, 10),
  );

  const gridClickHandler = function (idx: number) {
    const time = idx + (tab === 'am' ? 0 : 12);
    if (selectedTimes.includes(idx))
      setSelectedTimes(prev => prev.filter(i => i !== time));
    else setSelectedTimes(prev => [...prev, time]);
  };

  const gridCommonClass =
    'flex items-center justify-center text-[14px] border-[1px] rounded-[4px] h-full w-full';

  useEffect(() => {
    setCompanyId(companyData?.data.id ?? '');
    return () => {
      setCompanyId('');
    };
  }, [companyData]);

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
        <div
          className={`w-full h-full px-[30px] items-center justify-center gap-[6px] ${isLoading ? 'flex items-center justify-center' : 'grid grid-cols-4 grid-rows-3'}`}
        >
          {!isLoading ? (
            <>
              {timeData?.data
                ?.filter((_, idx) => {
                  if (tab === 'am' && idx < 12) return true;
                  if (tab === 'pm' && idx > 11) return true;
                })
                .map((canBook, idx) => {
                  const selected = selectedTimes.includes(
                    idx + (tab === 'am' ? 0 : 12),
                  );
                  return (
                    <button
                      className={`${gridCommonClass} ${selected ? 'border-reborn-orange3 text-reborn-orange3' : canBook ? 'border-reborn-gray3 text-reborn-gray8' : 'border-reborn-gray1 text-reborn-gray2'}`}
                      onClick={() => gridClickHandler(idx)}
                      disabled={!canBook}
                      key={`grid-${idx}`}
                    >{`${idx.toString().padStart(2, '0')}:00`}</button>
                  );
                })}
            </>
          ) : (
            <div className="spinner" />
          )}
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

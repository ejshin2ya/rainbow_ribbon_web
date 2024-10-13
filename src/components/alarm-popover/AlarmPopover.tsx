import { useState } from 'react';
import { AlarmPopoverContent } from './AlarmPopoverContent';
import { AlarmPopoverTabs } from './AlarmPopoverTabs';

const AlarmPopover = function () {
  const [tab, setTab] = useState<'예약' | '채팅'>('예약');

  return (
    <div
      className={`w-[400px] h-[334px] origin-top-right absolute right-0 top-full mt-[25px] rounded-md shadow-thin-all bg-white z-[1300] duration-200 animate-scaleUp flex flex-col`}
    >
      <AlarmPopoverTabs
        tab={tab}
        setChat={() => setTab('채팅')}
        setReservation={() => setTab('예약')}
      />
      <AlarmPopoverContent tab={tab} />
    </div>
  );
};

export default AlarmPopover;

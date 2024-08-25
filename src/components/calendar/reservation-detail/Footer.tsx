import { useState } from 'react';
import { ButtonGroup } from 'src/components/common/ButtonGroup';

export const Footer = function () {
  const [sendTalk, setSendTalk] = useState(false);
  const toggleSwitch = function () {
    setSendTalk(prev => !prev);
  };
  return (
    <footer className="w-full h-full flex flex-row justify-between py-[26px] px-[28px] items-center">
      <div className="w-[50%] h-full flex flex-col items-start justify-center">
        <div className="flex flex-row gap-[8px]">
          <div className="font-medium text-[14px] leading-[17px] text-reborn-gray8">
            알림톡 발송
          </div>
          <div className="w-[30px] h-[16px] flex items-center justify-center">
            <div
              onClick={toggleSwitch}
              className={`w-full h-full flex items-center px-[2px] rounded-full cursor-pointer transition-colors duration-[0.2s] ${sendTalk ? 'bg-reborn-orange3' : 'bg-reborn-gray3'}`}
            >
              <div
                className={`bg-white w-[12px] h-[12px] rounded-full shadow-md transform transition-transform duration-[0.2s] ${sendTalk ? 'translate-x-[14px]' : ''}`}
              />
            </div>
          </div>
        </div>
        <div className="font-medium text-[12px] leading-[18px] text-reborn-gray4">
          예약 확정을 알리는 알림톡이 고객에게 발송됩니다.
        </div>
      </div>
      <div className="w-[50%] h-full">
        <ButtonGroup
          cancelButtonOptions={{
            onClick: () => {},
            className: '',
            text: '예약 거절',
          }}
          confirmButtonOptions={{
            onClick: () => {},
            className: '',
            text: '예약확정',
          }}
        />
      </div>
    </footer>
  );
};

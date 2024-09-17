import { ReactComponent as AlarmIcon } from '../assets/AlarmIcon.svg';
import styled from 'styled-components';
import { CommonRouteDialog } from './CommonRouteDialog';
import { useState } from 'react';
import AlarmPopover from './alarm-popover/AlarmPopover';

export const AppBar = function () {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverHandler = function (open: boolean) {
    setPopoverOpen(open);
  };
  return (
    <AppBarContainer className="border-b-reborn-gray2 border-b-[1px] bg-reborn-white">
      <CommonRouteDialog
        isOpen={popoverOpen}
        onClose={() => popoverHandler(false)}
        backgroundClass="bg-transparent"
      >
        {/* <AlarmPopover /> */}
      </CommonRouteDialog>
      <div className="app-bar__logo-box">
        <img src="/assets/images/ic_logo_white.png" alt="reborn" />
        <img src="/assets/images/partners.png" alt="partners" />
      </div>
      <div className="app-bar__client-box">
        <button
          className="relative flex items-center justify-center flex-shrink-0 h-full w-[42px] cursor-pointer"
          onClick={() => popoverHandler(true)}
        >
          {/* <AlarmPopover open={popoverOpen} /> */}
          {popoverOpen && <AlarmPopover />}
          <AlarmIcon />
          <div className="min-w-[18px] h-[18px] absolute top-[4px] right-0 rounded-[30px] text-reborn-white bg-reborn-orange3 flex items-center justify-center text-[12px] border-[1px] border-reborn-white p-[4px]">
            2{/* if (count < 10) return 'right-0'*/}
            {/* if (count > 10) return 'right-[-4px]'*/}
            {/* if (count > 99) return 'right-[-12px]'*/}
          </div>
        </button>
      </div>
    </AppBarContainer>
  );
};

const AppBarContainer = styled.header`
  width: 100%;
  height: 95px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px 30px;
  flex-shrink: 0;

  .app-bar__logo-box {
    flex-shrink: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
  }
`;

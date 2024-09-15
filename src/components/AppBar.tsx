import { ReactComponent as AlarmIcon } from '../assets/AlarmIcon.svg';
import styled from 'styled-components';

export const AppBar = function () {
  return (
    <AppBarContainer className="border-b-reborn-gray2 border-b-[1px] bg-reborn-white">
      <div className="app-bar__logo-box">
        <img src="/assets/images/ic_logo_white.png" alt="reborn" />
        <img src="/assets/images/partners.png" alt="partners" />
      </div>
      <div className="app-bar__client-box">
        <button className="relative flex items-center justify-center flex-shrink-0 h-full w-[42px] cursor-pointer">
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
`;

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as AlarmIcon } from '../assets/AlarmIcon.svg';
import styled from 'styled-components';

interface Props {
  clientName?: string;
  clientImage?: string | ReactNode;
  clientId?: string | number;
}

export const AppBar = function ({
  clientId = '2347329347',
  clientImage = '',
  clientName = '포포즈 경기 김포점',
}: Props) {
  const location = useLocation();
  const [isChat, setIsChat] = useState(location.pathname === '/partners/chat');

  useEffect(() => {
    setIsChat(location.pathname === '/partners/chat');
  }, [location.pathname]);

  return (
    <AppBarContainer className="border-b-reborn-gray2 border-b-[1px] bg-reborn-white">
      <div className="app-bar__logo-box">
        <img src="/assets/images/ic_logo_white.png" alt="reborn" />
        <img src="/assets/images/partners.png" alt="partners" />
      </div>
      <div className="app-bar__client-box">
        {isChat ? (
          <button className="relative flex items-center justify-center flex-shrink-0 h-full w-[42px] cursor-pointer">
            <AlarmIcon />
            <div className="min-w-[18px] h-[18px] absolute top-[4px] right-0 rounded-[30px] text-reborn-white bg-reborn-orange3 flex items-center justify-center text-[12px] border-[1px] border-reborn-white p-[4px]">
              2{/* if (count < 10) return 'right-0'*/}
              {/* if (count > 10) return 'right-[-4px]'*/}
              {/* if (count > 99) return 'right-[-12px]'*/}
            </div>
          </button>
        ) : (
          <>
            <div className="client-box__desc-box">
              <div className="desc-box__title font-roboto">{clientName}</div>
              <div className="desc-box__id font-roboto">ID: {clientId}</div>
            </div>
            <div className="client-box__img">
              <img
                src={
                  (clientImage as string) ||
                  '/assets/images/icMapMarkerOrange.png'
                }
                alt="no-image"
              />
            </div>
          </>
        )}
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

  .app-bar__client-box {
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 14px;

    .client-box__desc-box {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;

      .desc-box__title {
        color: rgba(24, 23, 23, 1);
        font-size: 14px;
        font-weight: 500;
        line-height: 21px;
      }
      .desc-box__id {
        color: rgba(133, 133, 133, 1);
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
      }
    }
    .client-box__img {
      height: 100%;
      width: 48px;
      height: 48px;
      flex-shrink: 0;
    }
  }
`;

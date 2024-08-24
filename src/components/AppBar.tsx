import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  clientName?: string;
  clientImage?: string | ReactNode;
  clientId?: string | number;
}

export const AppBar = function ({
  clientId,
  clientImage = '',
  clientName,
}: Props) {
  return (
    <AppBarContainer className="border-b-reborn-gray2 border-b-[1px]">
      <div className="app-bar__logo-box">
        <img src="/assets/images/ic_logo_white.png" alt="reborn" />
        <img src="/assets/images/partners.png" alt="partners" />
      </div>
      <div className="app-bar__client-box">
        <div className="client-box__desc-box">
          <div className="desc-box__title">포포즈 경기 김포점</div>
          <div className="desc-box__id">ID: 2347329347</div>
        </div>
        <div className="client-box__img">
          <img
            src={
              (clientImage as string) || '/assets/images/icMapMarkerOrange.png'
            }
            alt="이미지 없슴ㅎ"
          />
        </div>
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

import styled from 'styled-components';
import { Footer } from './Footer';
import { PersonalInfo } from './PersonalInfo';

export const ReservationDetail = function () {
  return (
    <div className="flex flex-shrink-0 flex-col gap-[12px]">
      <div className="font-semibold text-[14px] leading-[21px] text-reborn-gray3">
        예약 상세
      </div>
      <ReservationContainer className="rounded-[10px] border-[1px] border-reborn-gray2">
        <main>
          <section className="left__personal">
            <PersonalInfo />
          </section>
          <section className="right__reservation-info">ㅎㅇ2</section>
        </main>
        <Footer />
      </ReservationContainer>
    </div>
  );
};

const ReservationContainer = styled.article`
  width: 620px;
  height: 870px;
  display: flex;
  flex-direction: column;

  main {
    width: 100%;
    height: 767px;
    display: flex;
    flex-direction: row;

    .left__personal {
      width: 225px;
      height: 100%;
      border-right: solid 1px #ebebeb;
    }
    .right__reservation-info {
      flex: 1;
      height: 100%;
    }
  }

  footer {
    border-top: solid 1px #cecece;
    margin: 0 6px;
    height: 102px;
    width: calc(100% - 12px);
    display: flex;
  }
`;

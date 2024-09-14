import styled from 'styled-components';
import { Footer } from './Footer';
import { PersonalInfo } from './PersonalInfo';
import { ReservationInfo } from './ReservationInfo';
import { PetInfo } from './PetInfo';
import { Memo } from './Memo';
import { ReactComponent as GrayLogoIcon } from '../../../assets/GrayLogo.svg';
import { useFuneralEventStore } from '../store/event-store';
import { useCalendarBookingDetail } from 'src/queries/reservation';
import { ReactComponent as ReservationIcon } from '../../../assets/Reservation.svg';

export const ReservationDetail = function () {
  const { selectedEvent } = useFuneralEventStore();
  const { data } = useCalendarBookingDetail(selectedEvent);

  return (
    <div className="flex flex-shrink-0 h-auto flex-col gap-[12px] py-[30px] px-[30px]">
      <div className="font-semibold text-[14px] leading-[21px] text-reborn-gray3">
        예약 상세
      </div>
      <ReservationContainer className="rounded-[10px] border-[1px] border-reborn-gray2">
        {selectedEvent ? (
          <>
            <main>
              <section className="left__personal">
                <PersonalInfo />
              </section>
              <section className="right__reservation-info">
                <ReservationInfo />
                <PetInfo />
                <Memo />
              </section>
              <div className="water-mark">
                {data?.data.bookingInfo.bookingStatus}
                <GrayLogoIcon width={36} height={36} />
              </div>
            </main>
            <Footer />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[20px] font-medium text-reborn-gray3 flex-col gap-[10px]">
            <ReservationIcon
              width={64}
              height={64}
              style={{
                fill: '#ebebeb',
              }}
              fill="#ebebeb"
              color="#ebebeb"
            />
            <span className="">선택된 예약이 없습니다.</span>
          </div>
        )}
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
    position: relative;

    .water-mark {
      position: absolute;
      bottom: 36px;
      right: 30px;
      font-weight: 700;
      font-size: 33px;
      line-height: 49px;
      text-align: right;
      color: #d6d6d6;

      display: flex;
      flex-direction: row;
      gap: 8px;
      justify-content: center;
      align-items: center;
      cursor: default;

      /* TODO: zIndex 추후 조절 */
    }

    .left__personal {
      width: 225px;
      height: 100%;
      border-right: solid 1px #ebebeb;
    }
    .right__reservation-info {
      flex: 1;
      height: 100%;
      flex-direction: column;
      > div {
        padding: 30px 31px 36px;
        border-bottom: solid 4px #f7f7f7;
        flex-shrink: 0;
      }
      > div:last-child {
        border-bottom: none;
        flex: 1;
      }
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

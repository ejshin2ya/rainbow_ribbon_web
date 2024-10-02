import { useCalendarBookingDetail } from 'src/queries/reservation';
import { CalendarDetail } from './CalendarDetail';
import { ReservationDetailContainer } from './reservation-detail/ReservationDetail';
import { useFuneralEventStore } from './store/event-store';
import styled from 'styled-components';

interface Props {
  selectedDate: Date;
}
export const BottomScheduler = function ({ selectedDate }: Props) {
  const { selectedEvent } = useFuneralEventStore();
  const { data } = useCalendarBookingDetail(selectedEvent);
  return (
    <BottomContainer>
      <CalendarDetail selectedDate={selectedDate} />
      <ReservationDetailContainer
        selectedEventId={selectedEvent}
        reservationInfo={data?.data}
      />
    </BottomContainer>
  );
};

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
import { Calendar } from 'src/components/calendar/Calendar';

export const Reservation = function () {
  return (
    <div className="flex">
      <Calendar />
    </div>
  );
};

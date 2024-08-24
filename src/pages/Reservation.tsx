import { Calendar } from 'src/components/calendar/Calendar';

export const Reservation = function () {
  return (
    <div className="w-full h-full flex-1 overflow-y-scroll">
      <Calendar />
    </div>
  );
};

import { ReservationSection } from './ReservationSection';
import { UserSection } from './UserSection';

export const LeftSection = function () {
  return (
    <section className="flex-1 px-[30px] border-r-[1px] border-r-reborn-gray1 flex flex-col gap-[32px]">
      <ReservationSection />
      <UserSection />
    </section>
  );
};

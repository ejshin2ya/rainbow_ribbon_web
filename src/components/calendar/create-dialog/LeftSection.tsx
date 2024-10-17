import { ReservationSection } from './ReservationSection';
import { GuardianSection } from './GuardianSection';

interface Props {
  openAddressModal: () => void;
}

export const LeftSection = function ({ openAddressModal }: Props) {
  return (
    <section className="flex-1 px-[30px] border-r-[1px] border-r-reborn-gray1 flex flex-col gap-[32px]">
      <ReservationSection />
      <GuardianSection openAddressModal={openAddressModal} />
    </section>
  );
};

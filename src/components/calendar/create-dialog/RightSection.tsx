import { PetSection } from './PetSection';

export const RightSection = function () {
  return (
    <section className="flex-1 px-[30px] border-r-[1px] border-r-reborn-gray1 flex flex-col gap-[32px]">
      <PetSection />
    </section>
  );
};

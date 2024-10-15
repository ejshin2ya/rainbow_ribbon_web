import { LeftSection } from './LeftSection';

export const CreateMain = function () {
  return (
    <article className="flex-1 flex flex-row pt-[36px] overflow-y-auto">
      <LeftSection />
      <section className="flex-1 px-[30px]">2</section>
    </article>
  );
};

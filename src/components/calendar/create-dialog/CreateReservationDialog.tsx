import { FormProvider, useForm } from 'react-hook-form';
import { CreateFooter } from './CreateFooter';
import { CreateHeader } from './CreateHeader';

interface Props {
  onClose: () => void;
}

const CreateReservationDialog = function ({ onClose }: Props) {
  const methods = useForm();
  const { control } = methods;
  return (
    <main className="max-h-[828px] min-h-[800px] min-w-[839px] bg-reborn-white rounded-[12px] flex flex-col">
      <CreateHeader onClose={onClose} />
      <FormProvider {...methods}>
        <form className="flex-1 w-full flex flex-col">
          <article className="flex-1 flex flex-row pb-[70px] pt-[36px] overflow-y-auto">
            <section className="flex-1 px-[30px] border-r-[1px] border-r-reborn-gray1">
              1
            </section>
            <section className="flex-1 px-[30px]">2</section>
          </article>
          <CreateFooter />
        </form>
      </FormProvider>
    </main>
  );
};

export default CreateReservationDialog;

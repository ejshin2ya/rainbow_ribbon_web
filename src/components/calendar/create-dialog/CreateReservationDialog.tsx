import { FormProvider, useForm } from 'react-hook-form';
import { CreateFooter } from './CreateFooter';
import { CreateHeader } from './CreateHeader';
import { CreateMain } from './CreateMain';

interface Props {
  onClose: () => void;
}

const CreateReservationDialog = function ({ onClose }: Props) {
  const methods = useForm<{
    package: string;
    option: string;
    bookingStart: string;
    bookingEnd: string;
    userName: string;
    phoneNumber: string;
    address: string;
    petName: string;
    petWeight: string;
    petType: string;
    petAgeYear: string;
    petAgeMonth: string;
    memo: string;
  }>({
    defaultValues: {
      package: '',
      option: '',
      bookingStart: '',
      bookingEnd: '',
      userName: '',
      phoneNumber: '',
      address: '',
      petName: '',
      petWeight: '',
      petType: '',
      petAgeYear: '',
      petAgeMonth: '',
      memo: '',
    },
  });
  const { control } = methods;
  return (
    <main className="max-h-[828px] min-h-[800px] min-w-[839px] bg-reborn-white rounded-[12px] flex flex-col">
      <CreateHeader onClose={onClose} />
      <FormProvider {...methods}>
        <form className="flex-1 w-full flex flex-col" {...control}>
          <CreateMain />
          <CreateFooter />
        </form>
      </FormProvider>
    </main>
  );
};

export default CreateReservationDialog;

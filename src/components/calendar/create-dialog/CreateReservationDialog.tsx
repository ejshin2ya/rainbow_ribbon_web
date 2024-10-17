import { FormProvider, useForm } from 'react-hook-form';
import { CreateFooter } from './CreateFooter';
import { CreateHeader } from './CreateHeader';
import { CreateMain } from './CreateMain';

interface Props {
  onClose: () => void;
}
interface FormContext {
  package: string;
  option: string;
  bookingStart: string;
  bookingEnd: string;
  userName: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  petName: string;
  petWeight: string;
  petType: string;
  petAgeYear: string;
  petAgeMonth: string;
  memo: string;
}

const CreateReservationDialog = function ({ onClose }: Props) {
  const methods = useForm<FormContext>({
    defaultValues: {
      package: '',
      option: '',
      bookingStart: '',
      bookingEnd: '',
      userName: '',
      phoneNumber: '',
      address: '',
      postalCode: '',
      petName: '',
      petWeight: '',
      petType: '',
      petAgeYear: '',
      petAgeMonth: '',
      memo: '',
    },
    resolver: data => {
      const errors: Record<string, { type?: string; message: string }> = {};
      if (!data.petAgeYear) {
        errors.petAgeYear = { type: 'required', message: 'Year is required' };
      }
      if (!data.petAgeMonth) {
        errors.petAgeMonth = { type: 'required', message: 'Month is required' };
      }
      const values = Object.keys(errors).length === 0 ? data : {};
      return { errors, values };
    },
    mode: 'onChange',
  });
  const { handleSubmit } = methods;
  const submitHandler = function (data: FormContext) {
    console.log(data);
  };
  return (
    <main className="max-h-[828px] min-h-[810px] min-w-[839px] bg-reborn-white rounded-[12px] flex flex-col">
      <CreateHeader onClose={onClose} />
      <FormProvider {...methods}>
        <form
          className="flex-1 w-full flex flex-col min-h-[632px]"
          onSubmit={handleSubmit(submitHandler)}
        >
          <CreateMain />
          <CreateFooter />
        </form>
      </FormProvider>
    </main>
  );
};

export default CreateReservationDialog;

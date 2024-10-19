import { FormProvider, useForm } from 'react-hook-form';
import { CreateFooter } from './CreateFooter';
import { CreateHeader } from './CreateHeader';
import { CreateMain } from './CreateMain';
import { useCreateReservation } from 'src/queries/reservation';
import { useFuneralEventStore } from '../store/event-store';

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
  const { mutateAsync, isPending } = useCreateReservation();
  const { selectedDate } = useFuneralEventStore();
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
      if (!data.bookingStart) {
        errors.bookingStart = {
          type: 'required',
          message: '예약 시작 시간은 필수값입니다.',
        };
      }
      if (!data.bookingEnd) {
        errors.bookingEnd = {
          type: 'required',
          message: '예약 종료 시간은 필수값입니다.',
        };
      }
      if (
        data.bookingStart &&
        data.bookingEnd &&
        parseInt(data.bookingStart) >= parseInt(data.bookingEnd)
      ) {
        errors.bookingStart = {
          type: 'nonValid',
          message: '예약 종료 시간은 예약 시작 시간보다 이를 수 없습니다.',
        };
      } else {
        delete errors.bookingStart;
      }
      if (data.petType) {
        const petNameRegex = /^[가-힣a-zA-Z0-9]+\(.*\)$/;
        if (!petNameRegex.test(data.petType)) {
          errors.petType = {
            type: 'nonValid',
            message: '구분(종) 형태로 작성해주세요.',
          };
        }
      }
      const values = Object.keys(errors).length === 0 ? data : {};
      return { errors, values };
    },
    mode: 'onChange',
  });
  const { handleSubmit } = methods;
  const submitHandler = async function (data: FormContext) {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      parseInt(data.bookingStart) + 9,
      0,
    );
    let majorType = '';
    let minorType = '';
    const regex = /^([가-힣a-zA-Z0-9]+)\((.+)\)$/;
    if (data.petType) {
      const match = data.petType.match(regex);
      majorType = match?.[1] ?? '';
      minorType = match?.[2] ?? '';
    }
    mutateAsync({
      data: {
        bookingDate: newDate.toISOString(),
        // bookingEnd: '',
        // bookingStart: '',
        guardianInfo: {
          name: data.userName,
          phoneNumber: data.phoneNumber,
          postalCode: data.postalCode,
          address: data.address,
          addressDetail: '',
        },
        memo: data.memo,
        packageName: data.package,
        petInfo: {
          majorType,
          minorType,
          name: data.petName,
          // gender: '',
          weight: data.petWeight,
          age: `${data.petAgeYear || 0}y${data.petAgeMonth || 0}m`,
        },
      },
    }).then(() => {
      onClose();
    });
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
          <CreateFooter btnLoading={isPending} />
        </form>
      </FormProvider>
    </main>
  );
};

export default CreateReservationDialog;

import { useState } from 'react';
import { LeftSection } from './LeftSection';
import { RightSection } from './RightSection';
import { ReactComponent as CloseIcon } from 'src/assets/Close.svg';
import DaumPostcode from 'react-daum-postcode';
import { useController, useFormContext } from 'react-hook-form';

export const CreateMain = function () {
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const { control } = useFormContext();
  const { field: addressField } = useController({ name: 'address', control });
  const { field: postalCodeField } = useController({
    name: 'postalCode',
    control,
  });
  const openAddressModal = function () {
    setAddressModalOpen(true);
  };
  const handleComplete = (data: any) => {
    const { address, zonecode } = data;
    addressField.onChange(address);
    postalCodeField.onChange(zonecode);
    setAddressModalOpen(false);
  };
  return (
    <article className="w-full flex-1 flex flex-row pt-[36px] overflow-y-auto relative">
      {addressModalOpen && (
        <div className="absolute top-[10%] left-[20%] right-[20%] bottom-[10%] bg-reborn-white z-[1233] border-[1px] border-reborn-gray1">
          <div className="w-full flex items-center justify-end py-[8px] px-[8px]">
            <div
              className="cursor-pointer"
              onClick={() => setAddressModalOpen(false)}
            >
              <CloseIcon />
            </div>
          </div>
          <DaumPostcode onComplete={handleComplete} autoClose={false} />
        </div>
      )}
      <LeftSection openAddressModal={openAddressModal} />
      <RightSection />
    </article>
  );
};

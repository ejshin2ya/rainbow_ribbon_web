import React from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { address: string; zonecode: string }) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  //isOpen이 false일 경우 컴포넌트를 렌더링하지 않음
  if (!isOpen) return null;

  //주소 선택 후 처리
  const handleComplete = (data: any) => {
    const { address, zonecode } = data;

    //부모 컴포넌트로 선택된 주소와 우편번호 전달
    onComplete({ address, zonecode });
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <DaumPostcode onComplete={handleComplete} autoClose={false} />
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 500px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export default AddressModal;

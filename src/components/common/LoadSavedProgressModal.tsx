import React from 'react';
import styled from 'styled-components';

interface LoadSavedProgressModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LoadSavedProgressModal: React.FC<LoadSavedProgressModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalText>저장된 진행 상황이 있습니다. 불러오시겠습니까?</ModalText>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>아니오</CancelButton>
          <SaveButton onClick={onConfirm}>예</SaveButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
`;

const SaveButton = styled(Button)`
  background-color: #ff6f3d;
  color: white;
`;

export default LoadSavedProgressModal;

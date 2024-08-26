import { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  message,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        {message ? <Message>{message}</Message> : children}
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ConfirmButton = styled.button`
  background-color: #ff6f3d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
`;

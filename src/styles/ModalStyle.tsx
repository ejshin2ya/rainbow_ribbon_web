import styled from 'styled-components';

export interface StepProps {
  nextStep: () => void;
}

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  width: 562px;
  height: 622px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SubTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
`;

export const FormTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin: 20px auto;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 8px;
  resize: none;
`;

export const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #666;
  margin-bottom: 16px;
`;

export const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Text = styled.h1`
  font-size: 14px;
`;

export const ImageUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const UploadButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 14px;
  cursor: pointer;
`;

export const HintText = styled.span`
  font-size: 12px;
  color: #999;
  margin-top: 8px;
  display: block;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Button = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 10px;
  background-color: ${props => (props.active ? '#ff6b6b' : 'white')};
  color: ${props => (props.active ? 'white' : '#333')};
  border: 1px solid ${props => (props.active ? '#ff6b6b' : '#e0e0e0')};
  border-radius: 8px;
  cursor: pointer;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background-color: ${props => (props.active ? '#ff5252' : '#f0f0f0')};
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  input {
    flex: 1;
  }

  button {
    white-space: nowrap;
    padding: 10px 15px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

interface NextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export const NextButton = styled.button<NextButtonProps>`
  width: 100%;
  padding: 14px;
  background-color: ${props => (props.isActive ? '#ff6f3d' : '#ebebeb')};
  color: ${props => (props.isActive ? 'white' : '#666')};
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: ${props => (props.isActive ? 'pointer' : 'not-allowed')};
  margin-top: 24px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => (props.isActive ? '#ff5252' : '#e0e0e0')};
  }
`;

import React from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export default Input;

const StyledInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
`;

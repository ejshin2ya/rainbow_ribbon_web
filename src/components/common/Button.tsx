import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  addTopMargin?: string;
  addBottomMargin?: string;
}

const Button: React.FC<ButtonProps> = props => {
  return <StyledButton {...props} />;
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  padding: 0.75rem 1rem;
  background-color: #ff6632;
  color: ${props => (!props.disabled ? '#ffffff' : '#adadad')};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: ${props => (props.addTopMargin ? props.addTopMargin : '0')};
  margin-bottom: ${props =>
    props.addBottomMargin ? props.addBottomMargin : '0'};

  &:disabled {
    background-color: #ebebeb;
    cursor: not-allowed;
  }
`;

import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <StyledCard className={className}>{children}</StyledCard>;
};

export default Card;

const StyledCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <ProgressContainer>
      <ProgressFiller value={value} />
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const ProgressFiller = styled.div<{ value: number }>`
  height: 100%;
  width: ${props => props.value}%;
  background-color: #ff6632;
  transition: width 0.3s ease-in-out;
`;

export default ProgressBar;

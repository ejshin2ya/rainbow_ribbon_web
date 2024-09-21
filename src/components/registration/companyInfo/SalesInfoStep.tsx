import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  StepProps,
  FormTitle,
  ButtonGroup,
  Button,
  NextButton,
} from '../../../styles/ModalStyle';
import { registrationDataState } from '../../../atoms/registrationDataState';

const SalesInfoStep: React.FC<StepProps> = ({ nextStep }) => {
  const [registrationData, setRegistrationData] = useRecoilState(
    registrationDataState,
  );
  const [hasDayOff, setHasDayOff] = useState(false);
  const [dayOff, setDayOff] = useState<string[]>([]);
  const [isDifferentWeekendHours, setIsDifferentWeekendHours] = useState(false);
  const [weekdayOpen, setWeekdayOpen] = useState('09:00');
  const [weekdayClose, setWeekdayClose] = useState('18:00');
  const [weekendOpen, setWeekendOpen] = useState('10:00');
  const [weekendClose, setWeekendClose] = useState('17:00');

  useEffect(() => {
    const {
      offDay,
      weekdayOpen: wdOpen,
      weekdayClose: wdClose,
      weekendOpen: weOpen,
      weekendClose: weClose,
    } = registrationData.companyInfoEditReq;

    if (offDay) {
      setHasDayOff(true);
      setDayOff(offDay);
    }

    if (wdOpen) setWeekdayOpen(wdOpen);
    if (wdClose) setWeekdayClose(wdClose);

    if (weOpen && weClose && (weOpen !== wdOpen || weClose !== wdClose)) {
      setIsDifferentWeekendHours(true);
      setWeekendOpen(weOpen);
      setWeekendClose(weClose);
    } else {
      setIsDifferentWeekendHours(false);
      setWeekendOpen(wdOpen);
      setWeekendClose(wdClose);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDayOffToggle = (day: string) => {
    setDayOff(prev => {
      if (!Array.isArray(prev)) {
        // prev가 배열이 아닌 경우, 빈 배열로 초기화
        return [day];
      }
      return prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day];
    });
  };

  const generateTimeOptions = (): JSX.Element[] => {
    const options: JSX.Element[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>,
        );
      }
    }
    return options;
  };

  useEffect(() => {
    setRegistrationData(prev => ({
      ...prev,
      companyInfoEditReq: {
        ...prev.companyInfoEditReq,
        offDay: dayOff,
        weekdayOpen,
        weekdayClose,
        weekendOpen: isDifferentWeekendHours ? weekendOpen : weekdayOpen,
        weekendClose: isDifferentWeekendHours ? weekendClose : weekdayClose,
      },
    }));
  }, [
    dayOff,
    weekdayOpen,
    weekdayClose,
    weekendOpen,
    weekendClose,
    isDifferentWeekendHours,
    setRegistrationData,
  ]);

  return (
    <>
      <FormTitle>휴무일이 있나요?</FormTitle>
      <ButtonGroup>
        <StyledButton onClick={() => setHasDayOff(true)} isActive={hasDayOff}>
          휴무일이 있어요
        </StyledButton>
        <StyledButton onClick={() => setHasDayOff(false)} isActive={!hasDayOff}>
          휴무일이 없어요
        </StyledButton>
      </ButtonGroup>

      {hasDayOff && (
        <DayButtonGroup>
          {['월', '화', '수', '목', '금', '토', '일'].map(day => (
            <DayButton
              key={day}
              onClick={() => handleDayOffToggle(day)}
              isActive={dayOff.includes(day)}
            >
              {day}
            </DayButton>
          ))}
        </DayButtonGroup>
      )}

      <FormTitle>영업시간을 입력해주세요.</FormTitle>
      <ButtonGroup>
        <StyledButton
          onClick={() => setIsDifferentWeekendHours(false)}
          isActive={!isDifferentWeekendHours}
        >
          평일, 주말 동일
        </StyledButton>
        <StyledButton
          onClick={() => setIsDifferentWeekendHours(true)}
          isActive={isDifferentWeekendHours}
        >
          평일, 주말 다름
        </StyledButton>
      </ButtonGroup>

      <TimeSelectGroup>
        <TimeSelectLabel>
          평일{!isDifferentWeekendHours && '(주말)'} 영업
        </TimeSelectLabel>
        <TimeSelect
          value={weekdayOpen}
          onChange={e => setWeekdayOpen(e.target.value)}
        >
          {generateTimeOptions()}
        </TimeSelect>
        <span>~</span>
        <TimeSelect
          value={weekdayClose}
          onChange={e => setWeekdayClose(e.target.value)}
        >
          {generateTimeOptions()}
        </TimeSelect>
      </TimeSelectGroup>

      {isDifferentWeekendHours && (
        <TimeSelectGroup>
          <TimeSelectLabel>주말 영업</TimeSelectLabel>
          <TimeSelect
            value={weekendOpen}
            onChange={e => setWeekendOpen(e.target.value)}
          >
            {generateTimeOptions()}
          </TimeSelect>
          <span>~</span>
          <TimeSelect
            value={weekendClose}
            onChange={e => setWeekendClose(e.target.value)}
          >
            {generateTimeOptions()}
          </TimeSelect>
        </TimeSelectGroup>
      )}

      <NextButton onClick={nextStep} isActive>
        다음
      </NextButton>
    </>
  );
};

export default SalesInfoStep;

const StyledButton = styled(Button)<{ isActive: boolean }>`
  border: 2px solid ${props => (props.isActive ? '#ff6f3d' : '#ccc')};
  background-color: white;
  color: ${props => (props.isActive ? '#ff6f3d' : '#333')};

  &:hover {
    background-color: ${props => (props.isActive ? '#fff' : '#f5f5f5')};
  }
`;

const DayButtonGroup = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`;

const DayButton = styled(StyledButton)`
  padding: 5px 10px;
`;

const TimeSelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const TimeSelectLabel = styled.span`
  min-width: 80px;
`;

const TimeSelect = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

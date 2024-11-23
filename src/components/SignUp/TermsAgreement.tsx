import { useState } from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface TermsAgreementProps {
  onNext: () => void;
}

interface TermsAgreedInfoData {
  allAgreed: boolean;
  agreements: boolean[];
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({ onNext }) => {
  const navigate = useNavigate();

  const terms = [
    {
      text: '계약서의 정보 작성에 대한 확인',
      link: null,
    },
    {
      text: '사업자 변경 불가 동의',
      link: null,
    },
    {
      text: '셀프 서비스 이용 동의',
      link: null,
    },
    {
      text: '광고 · 서비스 운영 원칙 동의',
      link: null,
    },
    {
      text: '무지개리본 서비스 이용약관',
      link: null,
    },
    {
      text: '고객 개인정보 보호 동의',
      link: null,
    },
    {
      text: '개인정보 수집 및 이용 동의',
      link: '/privacy',
    },
    {
      text: '서비스/이벤트 정보 수신 동의',
      link: null,
    },
  ];

  const [TermsAgreedInfoData, setTermsAgreedInfoData] =
    useState<TermsAgreedInfoData>({
      allAgreed: false,
      agreements: Array(terms.length).fill(false),
    });

  const handleAgreeAllChange = () => {
    const newState = TermsAgreedInfoData.allAgreed;
    setTermsAgreedInfoData(prev => ({
      ...prev,
      allAgreed: !newState,
      agreements: Array(terms.length).fill(!newState),
    }));
  };

  const handleIndividualChange = (index: number) => {
    const newAgreements = [...TermsAgreedInfoData.agreements];
    newAgreements[index] = !newAgreements[index];
    setTermsAgreedInfoData(prev => ({
      ...prev,
      allAgreed: newAgreements.every(Boolean),
      agreements: newAgreements,
    }));
  };

  const handleTermClick = (
    link: string | null,
    index: number,
    e: React.MouseEvent,
  ) => {
    // 체크박스 영역을 클릭한 경우는 페이지 이동하지 않음
    if (
      (e.target as HTMLElement).tagName === 'svg' ||
      (e.target as HTMLElement).tagName === 'path' ||
      (e.target as HTMLElement).tagName === 'label'
    ) {
      return;
    }

    if (link) {
      navigate(link);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Title>무지개리본 파트너 회원가입을 시작합니다.</Title>
      <SubTitle>
        무지개리본 파트너가 되시면 모든 서비스를 편하게 이용하실 수 있어요.
        진행하시기 전에 내용을 검토하고 동의해 주세요.
      </SubTitle>
      <CheckboxContainer>
        <AllCheckbox
          id="checkbox"
          type="checkbox"
          checked={TermsAgreedInfoData.allAgreed}
          onChange={handleAgreeAllChange}
          required
        />
        <label htmlFor="checkbox" style={{ cursor: 'pointer' }}>
          <StyledCheckbox Checked={TermsAgreedInfoData.allAgreed}>
            <FaCheck color="#FFFFFF" display="relative" />
          </StyledCheckbox>
        </label>
        <Label>모든 약관에 동의합니다</Label>
      </CheckboxContainer>
      <TermsList>
        {terms.map((term, index) => (
          <TermItem
            key={index}
            onClick={e => handleTermClick(term.link, index, e)}
            hasLink={!!term.link}
          >
            <HiddenCheckbox
              id={`checkbox-${index}`}
              checked={TermsAgreedInfoData.agreements[index]}
              onChange={() => handleIndividualChange(index)}
              required
            />
            <label htmlFor={`checkbox-${index}`} style={{ cursor: 'pointer' }}>
              <FaCheck
                color={
                  TermsAgreedInfoData.agreements[index] ? '#FF6632' : '#EBEBEB'
                }
              />
            </label>
            <TermText hasLink={!!term.link}>{term.text}</TermText>
          </TermItem>
        ))}
      </TermsList>
      <SubmitButton type="submit" disabled={!TermsAgreedInfoData.allAgreed}>
        시작하기
      </SubmitButton>
    </Container>
  );
};

const StyledCheckbox = styled.div<{ Checked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => (props.Checked ? 'width: 21px;' : 'width: 20px;')}
  ${props => (props.Checked ? 'height: 21px;' : 'height: 20px;')}
  background-color: ${props => (props.Checked ? ' #ff6632;' : '#FFFFFF;')}
  border-radius: 4px;
  border: ${props =>
    props.Checked ? '0px solid #ebebeb;' : '2px solid #ebebeb;'};
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 10px;
  color: #181717;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #adadad;
  margin-bottom: 30px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 2px;
  border: 1px solid #EBEBEB;
  padding: 18px;
}
`;

const AllCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
  width: 20px;
  height: 20px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute,
  width: 20px;
  height: 20px;
`;

const Label = styled.label`
  margin-left: 10px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
`;

const TermsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  text-align: left;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    svg {
      margin-right: 10px;
      color: #ff6f3c;
    }

    span {
      font-size: 14px;
      color: #181717;
    }
  }
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 15px;
  background-color: ${props => (!props.disabled ? '#FF6632' : '#EBEBEB')};
  color:${props => (!props.disabled ? '#ffffff' : '#adadad')};
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover { 
  background-color:${props => (!props.disabled ? ' #e65c2d' : '#EBEBEB')}
`;

const TermItem = styled.li<{ hasLink: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: ${props => (props.hasLink ? 'pointer' : 'default')};
`;

const TermText = styled.span<{ hasLink: boolean }>`
  font-size: 14px;
  color: #181717;
  ${props =>
    props.hasLink &&
    `
    text-decoration: underline;
    color: #FF6632;
  `}
`;

export default TermsAgreement;

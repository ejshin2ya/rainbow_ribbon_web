import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CompanyRegistrationModal } from './CompanyRegistraionModal';
import { FuneralCompositionModal } from './FuneralCompositionModal';
import { registrationDataState } from '../../atoms/registrationDataState';
import { funeralCompositionState } from '../../atoms/funeralCompositionState';
import {
  isCompanyInfoComplete,
  isFuneralInfoComplete,
  isValidCompanyInfo,
  isValidFuneralInfo,
  mapCompanyInfoToRegistrationData,
  mapFuneralInfoToFuneralComposition,
} from '../../utils/dataMappingUtils';
import { fetchCompanyInfo } from 'src/services/companyService';
import { fetchFuneralInfo } from 'src/services/FuneralCompositionService';

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [registrationData, setRegistrationData] = useRecoilState(
    registrationDataState,
  );
  const [funeralComposition, setFuneralComposition] = useRecoilState(
    funeralCompositionState,
  );
  const [hasCompanyInfo, setHasCompanyInfo] = useState(false);
  const [hasFuneralInfo, setHasFuneralInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // registrationData와 funeralComposition의 완전성 체크
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [companyInfo, funeralInfo] = await Promise.all([
          fetchCompanyInfo(),
          fetchFuneralInfo(),
        ]);

        if (companyInfo) {
          const convertedRegistrationData =
            mapCompanyInfoToRegistrationData(companyInfo);
          const isValid = isValidCompanyInfo(companyInfo);
          setRegistrationData(convertedRegistrationData);
          setHasCompanyInfo(isValid);
        }

        if (funeralInfo) {
          const convertedFuneralComposition =
            mapFuneralInfoToFuneralComposition(funeralInfo);
          const isValid = isValidFuneralInfo(funeralInfo);
          setFuneralComposition(convertedFuneralComposition);
          setHasFuneralInfo(isValid);
        }
      } catch (error) {
        setHasCompanyInfo(false);
        setHasFuneralInfo(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // isCompanyInfoComplete 함수 내용도 확인해보기

  const isSubmitActive = useMemo(() => {
    const companyComplete = isCompanyInfoComplete(registrationData);
    const funeralComplete = isFuneralInfoComplete(funeralComposition);

    return companyComplete && funeralComplete;
  }, [registrationData, funeralComposition]);

  const handleOpenModal = useCallback(type => {
    setModalType(type);
    setOpenModal(true);
  }, []);

  const handleRegistrationComplete = () => {
    // 모달에서 데이터가 업데이트되면 Recoil state가 자동으로 업데이트됨
    setOpenModal(false);
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (!isSubmitActive) {
        return;
      }
      navigate('/partners');
    },
    [isSubmitActive, navigate],
  );

  if (isLoading) {
    return <LoadingIndicator />; // 로딩 중일 때 표시할 컴포넌트
  }

  return (
    <div>
      <Logo>
        <img src="/assets/images/ic_logo_white.png" alt="reborn" />
        <img
          src="/assets/images/partners.png"
          alt="partners"
          style={{ paddingLeft: '5px' }}
        />
      </Logo>
      <Container>
        <Title>무지개리본과 함께하기 위한 필요한 정보를 등록해 주세요.</Title>
        <Form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <InfoContainer>
                <Icon
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </Icon>
                <span>업체 정보</span>
              </InfoContainer>
              {!isLoading && (
                <Button
                  onClick={() => handleOpenModal('companyInfo')}
                  type="button"
                >
                  {hasCompanyInfo ? '수정하기' : '등록하기'}
                </Button>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <InfoContainer>
                <Icon
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </Icon>
                <span>장례 구성</span>
              </InfoContainer>
              {!isLoading && (
                <Button
                  onClick={() => handleOpenModal('participationRules')}
                  type="button"
                >
                  {hasFuneralInfo ? '수정하기' : '등록하기'}
                </Button>
              )}
            </CardContent>
          </Card>
          <SubmitButton type="submit" disabled={!isSubmitActive}>
            운영 신청하기
          </SubmitButton>
        </Form>

        {openModal && modalType === 'companyInfo' && (
          <CompanyRegistrationModal
            onClose={() => setOpenModal(false)}
            onRegistrationComplete={handleRegistrationComplete}
          />
        )}
        {openModal && modalType === 'participationRules' && (
          <FuneralCompositionModal
            onClose={() => setOpenModal(false)}
            onRegistrationComplete={handleRegistrationComplete}
          />
        )}
      </Container>
    </div>
  );
};

export default CompanyRegistration;

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 24px;
`;

const Form = styled.form``;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: white;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #fff0f0;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  background-color: ${props => (props.disabled ? '#ebebeb' : '#ff6632')};
  color: ${props => (props.disabled ? '#333' : 'white')};
  border: none;
  margin-top: 16px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${props => (props.disabled ? '#e0e0e0' : '#ff6b6b')};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 30px;
  margin-top: 30px;
`;
const LoadingIndicator = styled.div`
  // 로딩 인디케이터 스타일
`;

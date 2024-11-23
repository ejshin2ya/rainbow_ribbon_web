import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import { useLoginMutation } from '../hooks/useLoginMutation';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import useModal from '../hooks/useModal';
import { useAuth } from '../contexts/AuthContext';
import { authState } from '../atoms/authState';
import { fetchCompanyInfo } from 'src/services/companyService';
import { fetchFuneralInfo } from 'src/services/FuneralCompositionService';
import {
  isCompanyInfoComplete,
  isFuneralInfoComplete,
  mapCompanyInfoToRegistrationData,
  mapFuneralInfoToFuneralComposition,
} from 'src/utils/dataMappingUtils';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 메시지 상태 추가
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const { login: authLogin } = useAuth();
  const [, setLogindata] = useRecoilState(authState);
  const {
    mutate: loginMutate,
    // isPending,
    // isError,
    // isSuccess,
    // data,
    // error,
  } = useLoginMutation();

  // 페이지가 로드될 때 localStorage에서 저장된 이메일을 가져옵니다.
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // Remember Me 체크박스를 체크 상태로 만듭니다.
    }
  }, []);

  //login mutation 하는 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem('savedEmail', email);
    } else {
      localStorage.removeItem('savedEmail');
    }

    loginMutate(
      {
        loginId: email,
        password: password,
      },
      {
        onSuccess: async data => {
          authLogin(data.data.accessToken, data.data.refreshToken);
          setLogindata(prevState => ({
            ...prevState,
            name: data.data.name,
            phone: data.data.phone,
            userType: data.data.userType,
          }));

          try {
            const [companyInfo, funeralInfo] = await Promise.all([
              fetchCompanyInfo(),
              fetchFuneralInfo(),
            ]);

            const convertedRegistrationData =
              mapCompanyInfoToRegistrationData(companyInfo);
            const convertedFuneralComposition =
              mapFuneralInfoToFuneralComposition(funeralInfo);

            const hasCompleteCompanyInfo = isCompanyInfoComplete(
              convertedRegistrationData,
            );
            const hasCompleteFuneralInfo = isFuneralInfoComplete(
              convertedFuneralComposition,
            );

            if (hasCompleteCompanyInfo && hasCompleteFuneralInfo) {
              navigate('/'); // 메인 페이지로 이동
            } else {
              navigate('/registration'); // 등록 페이지로 이동
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/registration'); // 에러 발생시 등록 페이지로 이동
          }
        },
        onError: (error: Error) => {
          if (axios.isAxiosError(error)) {
            const msg = error.response?.data?.msg || '로그인에 실패했습니다.';
            setErrorMessage(msg);
          } else {
            setErrorMessage('알 수 없는 오류가 발생했습니다.');
          }
          openModal();
        },
      },
    );
  };

  return (
    <Container>
      <InnerContainer>
        <Logo onClick={() => navigate('/')}>
          <img src="/assets/images/RebornLogo.png" alt="reborn_logo" />
        </Logo>

        <FormBox onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="아이디(이메일)"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <LoginButton type="submit" disabled={!email || !password}>
            로그인
          </LoginButton>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <label>아이디 저장</label>
          </CheckboxContainer>
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            message={errorMessage}
          ></Modal>
        </FormBox>
        <LinkContainer>
          <Link href="/signup">회원가입</Link>
          <Link href="#">아이디 찾기</Link>
          <Link href="#">비밀번호 찾기</Link>
        </LinkContainer>
      </InnerContainer>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  height: 500px;
`;
const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
  cursor: pointer; // 커서 포인터 추가

  img {
    height: 35px; // 이미지 크기도 함께 증가
  }

  &:hover {
    opacity: 0.8; // 호버 효과 추가
    transition: opacity 0.2s ease-in-out;
  }
`;

const LoginButton = styled(Button)`
  width: 412px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  padding: 0px;
  align-self: start;
  margin-bottom: 61px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 65%;
  height: 21px;
  margin-top: 10px;
  font-size: 12px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #5c5c5a;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

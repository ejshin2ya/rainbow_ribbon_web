import { useRecoilValue } from 'recoil';
import styled, { createGlobalStyle } from 'styled-components';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useNavigate } from 'react-router-dom';
import { authState } from '../atoms/authState';
import { useSetRecoilState } from 'recoil';
import { logout } from '../services/apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const MainPage = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState); // 로그인 상태 가져오기
  const setAuth = useSetRecoilState(authState);

  const handleLogout = async () => {
    try {
      await logout();
      // 로그아웃 후 auth state 초기화
      setAuth({
        name: '',
        accessToken: '',
        refreshToken: '',
        userType: '',
        phone: '',
      });
      // 로그인 페이지로 리다이렉트
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // 에러 처리 - 필요한 경우 사용자에게 알림
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Nav>
          <Logo>
            <img src="/assets/images/RebornLogo.png" alt="reborn_logo" />
          </Logo>

          <MenuContainer>
            <MenuList>
              <MenuItem>서비스 소개</MenuItem>
              <MenuItem>이용가이드</MenuItem>
              <MenuItem>문의</MenuItem>
            </MenuList>

            {auth.name ? ( // 로그인 상태일 때
              <UserGreeting>
                <UserName>{auth.name}님 안녕하세요</UserName>
                <LogoutButton onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </LogoutButton>
              </UserGreeting>
            ) : (
              // 비로그인 상태일 때
              <AuthButtons>
                <SignUpButton onClick={() => navigate('/signup')}>
                  회원가입
                </SignUpButton>
                <LoginButton onClick={() => navigate('/login')}>
                  로그인
                </LoginButton>
              </AuthButtons>
            )}
          </MenuContainer>
        </Nav>

        <MainContent>
          <HeroSection>
            <MainTitle>
              반려동물 장례는
              <br />
              무지개리본과 함께
            </MainTitle>
            <MainDescription>
              무지개 리본 파트너 페이지를 찾아주셔서 감사합니다.
              <br />
              로그인을 통해 새로운 반려동물 장례 비즈니스 솔루션을 경험하세요.
            </MainDescription>
            <StartButton onClick={() => navigate('/login')}>
              무지개리본 파트너 시작하기
            </StartButton>
          </HeroSection>

          <InfoSection>
            <SectionTitle>무지개리본 파트너란?</SectionTitle>
            <SectionDescription>
              무지개리본 파트너는 비즈니스를 돕는 시스템과 솔루션을 제공합니다.
            </SectionDescription>

            <CardGrid>
              <FeatureCard>
                <CardContent>
                  <h3>간편한 예약 관리</h3>
                </CardContent>
              </FeatureCard>

              <FeatureCard>
                <CardContent>
                  <h3>스마트 스토어 서비스</h3>
                </CardContent>
              </FeatureCard>

              <FeatureCard>
                <CardContent>
                  <h3>전체 업소 등록 및 수정</h3>
                </CardContent>
              </FeatureCard>

              <FeatureCard>
                <CardContent>
                  <h3>매출관리/매출처리 솔루션</h3>
                </CardContent>
              </FeatureCard>
            </CardGrid>
          </InfoSection>

          <StartSection>
            <SectionTitle>지금 바로 시작해보세요</SectionTitle>
          </StartSection>
        </MainContent>

        <Footer>
          <FooterContent>
            <FooterLogo>
              <img
                src="/assets/images/ic_logo_white.png"
                alt="reborn"
                style={{ height: '24px' }}
              />
            </FooterLogo>

            <FooterSection>
              <FooterCategory>
                <CategoryTitle>이용약관</CategoryTitle>
                <CategoryTitle onClick={() => navigate('/privacy')}>
                  개인정보처리방침
                </CategoryTitle>
              </FooterCategory>

              <FooterCategory>
                <CategoryTitle>고객센터</CategoryTitle>
                <CategoryItem>전화번호:</CategoryItem>
                <CategoryItem>
                  이용시간: 월 ~ 금 (오전 10:00 ~ 오후 6:00)
                </CategoryItem>
                <CategoryItem>이메일:</CategoryItem>
                <CategoryItem>채팅 상담하기</CategoryItem>
              </FooterCategory>
            </FooterSection>
          </FooterContent>
          <CompanyInfo>(주)무지개리본 서울 @@구 @@@로 130</CompanyInfo>
        </Footer>
      </Container>
    </>
  );
};
export default MainPage;

// 전체적으로 box-sizing: border-box를 적용하여 패딩을 너비에 포함
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    overflow-y: scroll; // 스크롤을 명시적으로 허용
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding-top: 80px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid #d6d6d6;
  padding-bottom: 40px; // 선과의 간격을 위해
`;

const FooterSection = styled.div`
  display: flex;
  gap: 120px;
`;

const FooterCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 300px;
`;

const CategoryTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #ff6632;
  }
`;

const CategoryItem = styled.span`
  font-size: 14px;
  color: #666;
`;

const CompanyInfo = styled.p`
  font-size: 14px;
  color: #999;
  padding-left: 40px;
`;

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  background: white;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  img {
    height: 24px;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1.5;
  justify-content: center;
`;

const MenuList = styled.ul`
  display: flex;
  gap: 60px;
  list-style: none;
`;

const MenuItem = styled.li`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #ff6632;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;
  justify-content: flex-end;
`;

const SignUpButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: white;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const LoginButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #ff6632;
  color: white;
  cursor: pointer;

  &:hover {
    background: #ff5219;
  }
`;

const StartButton = styled(Button)`
  padding: 12px 24px;
  font-size: 18px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #666;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: #ff6632;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const MainContent = styled.main`
  width: 100%;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  width: 100%;
  background: #d6d6d6;
  padding-top: 120px;
  padding-bottom: 120px;
  text-align: center;
`;

const MainTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #333;
  line-height: 1.3;
  margin-bottom: 24px;
`;

const MainDescription = styled.p`
  font-size: 20px;
  color: #666;
  margin-bottom: 40px;
`;

const InfoSection = styled.section`
  padding: 80px 40px;
`;

const StartSection = styled.section`
  padding: 80px 0;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
`;

const SectionDescription = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 60px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 48px;
`;

const FeatureCard = styled(Card)`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  padding: 24px;
  text-align: center;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f7f7f7;
  padding: 40px 40px;
  margin-top: auto;
`;

const FooterLogo = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
`;

const UserGreeting = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

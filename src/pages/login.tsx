import React, { useState } from "react";
import styled from "styled-components";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authState";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const {
    mutate: login,
    // isPending,
    // isError,
    // isSuccess,
    // data,
    // error,
  } = useLoginMutation();

  //login mutation 하는 함수
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      {
        loginId: email,
        password: password,
      },
      {
        onSuccess: (data) => {
          setAuth({
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
            isAuthenticated: true,
          });

          navigate("/registration");
        },
        onError: (error) => {
          console.log("로그인 실패", error);
        },
      }
    );
    console.log("Login submitted", { email, password, rememberMe });
  };

  return (
    <Container>
      <InnerContainer>
        <LogoBox>
          <Logo>REBORN </Logo>
          <Logo style={{ fontSize: "30px", color: "#181717" }}>partners</Logo>
        </LogoBox>
        <FormBox onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="아이디(이메일)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <LoginButton type="submit" disabled={!email || !password}>
            로그인
          </LoginButton>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label>아이디 저장</label>
          </CheckboxContainer>
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
const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  width: 364.25px;
  height: 35.97px;
`;

const Logo = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #ff6632;
`;

const Input = styled.input`
  width: 412px;
  height: 50px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
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

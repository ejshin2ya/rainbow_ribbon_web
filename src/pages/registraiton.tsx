import React, { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import styled from "styled-components";
import { atom } from "recoil";
import { ENDPOINT_COMPANY_REGISTRATION } from "../api/endpoints";

// Recoil atoms
const companyInfoState = atom<File | null>({
  key: "companyInfoState",
  default: null,
});

const participationRulesState = atom<File | null>({
  key: "participationRulesState",
  default: null,
});

const RegistrationPage: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useRecoilState(companyInfoState);
  const [participationRules, setParticipationRules] = useRecoilState(
    participationRulesState
  );
  const [showModal, setShowModal] = useState<
    "companyInfo" | "participationRules" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  //업체정보, 장례구성 버튼 선택에 따른 모달창 노출
  const handleRegisterClick = (type: "companyInfo" | "participationRules") => {
    setShowModal(type);
  };

  //모달 창 내에서 파일 첨부시 변화 감지하는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (showModal === "companyInfo") {
        setCompanyInfo(e.target.files[0]);
      } else {
        setParticipationRules(e.target.files[0]);
      }
    }
  };

  //모달창 내에서 제출 버튼
  const handleModalSubmit = () => {
    setShowModal(null);
  };

  //입점신청하기 버튼 선택시 입점등록 axios 요청
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    if (companyInfo) formData.append("companyInfo", companyInfo);
    if (participationRules)
      formData.append("participationRules", participationRules);

    try {
      const response = await axios.post(
        `${ENDPOINT_COMPANY_REGISTRATION}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("입점 신청이 완료되었습니다.");
        // Reset form or redirect user
      } else {
        throw new Error(response.data.message || "입점 신청에 실패했습니다.");
      }
    } catch (error) {
      alert("입점 신청에 실패했습니다. 다시 시도해 주세요.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>무지개리본과 함께하기 위한 필요한 정보를 등록해 주세요.</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>업체 정보</Label>
          <RegisterButton
            type="button"
            onClick={() => handleRegisterClick("companyInfo")}
          >
            등록하기
          </RegisterButton>
        </InputContainer>
        <InputContainer>
          <Label>장례구성</Label>
          <RegisterButton
            type="button"
            onClick={() => handleRegisterClick("participationRules")}
          >
            등록하기
          </RegisterButton>
        </InputContainer>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "처리 중..." : "입점 신청하기"}
        </SubmitButton>
      </Form>

      {showModal && (
        <Modal>
          <ModalContent>
            <h3>
              {showModal === "companyInfo" ? "업체 정보" : "참여수칙"} 등록
            </h3>
            <ModalInput type="file" onChange={handleFileChange} />
            <ModalButton onClick={handleModalSubmit}>확인</ModalButton>
            <ModalButton onClick={() => setShowModal(null)}>취소</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default RegistrationPage;

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
`;

const Label = styled.label`
  flex: 1;
  color: #333;
`;

const RegisterButton = styled.button`
  padding: 5px 10px;
  background-color: white;
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  font-weight: bold;
  margin-top: 20px;
  &:hover {
    background-color: #d0d0d0;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ModalButton = styled.button`
  padding: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  &:last-child {
    background-color: #e0e0e0;
    color: #333;
  }
`;

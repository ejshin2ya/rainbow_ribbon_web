import React, { useState, useRef } from "react";
import styled from "styled-components";
import InputWithLabel from "../common/InputWithLabel";
import Button from "../common/Button";

interface BusinessInfoProps {
  onSubmit: () => void;
  onPrev: () => void;
  updateFormData: (data: { businessInfo: BusinessInfoData }) => void;
}

interface BusinessInfoData {
  businessNumber: string;
  address: string;
  businessProof: File | null;
  licenseProof: File | null;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({
  onSubmit,
  updateFormData,
}) => {
  const [businessData, setBusinessData] = useState<BusinessInfoData>({
    businessNumber: "",
    address: "",
    businessProof: null,
    licenseProof: null,
  });

  // 숨겨진 file input에 대한 참조
  const businessProofInputRef = useRef<HTMLInputElement>(null);
  const licenseProofInputRef = useRef<HTMLInputElement>(null);

  //다음 버튼 클릭시 모든 값이 존재하는지 유효성 검사
  const isFormValid =
    businessData.businessNumber &&
    businessData.address &&
    businessData.businessProof &&
    businessData.licenseProof;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setBusinessData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // 숨겨진 file input의 클릭 이벤트를 트리거하는 함수
  const triggerFileInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({ businessInfo: businessData });
    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWithLabel
        label="사업자 등록번호"
        type="text"
        name="businessNumber"
        htmlFor="input-businessNumber"
        value={businessData.businessNumber}
        onChange={handleChange}
        placeholder="사업자 등록번호를 입력해주세요."
        required
      />
      <AddressContainer>
        <InputWithLabel
          label="주소"
          htmlFor="input-address"
          type="text"
          name="address"
          value={businessData.address}
          onChange={handleChange}
          placeholder="주소 찾기를 눌러주세요."
          required
        />
        <Button addTopMargin={true}>주소 찾기</Button>
      </AddressContainer>
      <FileUpload>
        <label>사업자 등록증 첨부</label>
        <FileInputWrapper
          onClick={() => triggerFileInput(businessProofInputRef)}
        >
          <input
            type="file"
            name="businessProof"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            ref={businessProofInputRef}
            required
          />
          {businessData.businessProof
            ? businessData.businessProof.name
            : "이미지 추가"}
        </FileInputWrapper>
      </FileUpload>

      <FileUpload>
        <label>동물장묘 허가증 첨부</label>
        <FileInputWrapper
          onClick={() => triggerFileInput(licenseProofInputRef)}
        >
          <input
            type="file"
            name="licenseProof"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            ref={licenseProofInputRef}
            required
          />
          {businessData.licenseProof
            ? businessData.licenseProof.name
            : "이미지 추가"}
        </FileInputWrapper>
      </FileUpload>
      <Notice>
        내용을 충분히 확인할 수 있도록 깔끔하게 정렬된 이미지를 첨부해주세요.
        <br />
        10MB 이하, JPG, PNG, PDF 형식의 파일만 등록할 수 있습니다.
      </Notice>

      <ButtonGroup>
        <Button type="submit" disabled={!isFormValid}>
          다음
        </Button>
      </ButtonGroup>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddressContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const FileUpload = styled.div`
  margin-top: 1rem;
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  padding: 10px;
  border: 1px dashed #ddd;
  border-radius: 5px;
  cursor: pointer;

  input[type="file"] {
    display: none;
  }
`;

const Notice = styled.p`
  font-size: 0.875rem;
  color: #999;
  margin: 1rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-self: end;
  margin-top: 1rem;
`;

export default BusinessInfo;

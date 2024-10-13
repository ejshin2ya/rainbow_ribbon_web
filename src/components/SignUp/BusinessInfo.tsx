import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import InputWithLabel from '../common/InputWithLabel';
import Button from '../common/Button';
import AddressModal from '../common/AddressModal';
import Modal from '../common/Modal';
import useModal from '../../hooks/useModal';
import Input from '../common/Input';
import { useRecoilState } from 'recoil';
import { signUpFormState } from '../../atoms/signupFormState';
import '@react-pdf-viewer/core/lib/styles/index.css';

// pdf API 버전과 동일한 워커 파일 버전을 사용하도록 설정
const workerUrl = `https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js`;

interface BusinessInfoProps {
  onSubmit: () => void;
}

interface BusinessInfoData {
  businessNumber: string;
  address: string;
  zonecode: string;
  detailedAdress: string;
  businessProof: File | null;
  licenseProof: File | null;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ onSubmit }) => {
  //사업정보 입력값 데이터
  const [businessData, setBusinessData] = useState<BusinessInfoData>({
    businessNumber: '',
    address: '',
    zonecode: '',
    detailedAdress: '',
    businessProof: null,
    licenseProof: null,
  });
  //recoil로 관리되는 회원가입시 요청 데이터
  const [, setFormData] = useRecoilState(signUpFormState);

  //모달창 hook
  const { isOpen, openModal, closeModal } = useModal();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  //파일크기 초과 또는 지원하지 않는 파일 업로드시 에러 메세지 상태값
  const [errorMessage, setErrorMessage] = useState('');

  // 숨겨진 file input에 대한 참조
  const businessProofInputRef = useRef<HTMLInputElement>(null);
  const licenseProofInputRef = useRef<HTMLInputElement>(null);

  //다음 버튼 클릭시 모든 값이 존재하는지 유효성 검사
  const isFormValid =
    businessData.businessNumber &&
    businessData.address &&
    businessData.zonecode &&
    businessData.businessProof &&
    businessData.licenseProof;

  //사업자 등록번호 입력에 대한 유효성 검사 및 숫자만 입력 가능하도록 설정
  const handleBusinessNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    setBusinessData(prev => ({ ...prev, [name]: numericValue }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const fileSize = file.size / 1024 / 1024; // Convert to MB
      const fileType = file.type;

      if (fileSize > 10) {
        setErrorMessage('최대 10MB 크기의 파일만 업로드할 수 있습니다.');
        setIsErrorModalOpen(true);
        return;
      }

      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(fileType)) {
        setErrorMessage('JPG, PNG, PDF 형식의 파일만 업로드할 수 있습니다.');
        setIsErrorModalOpen(true);
        console.log('지원하지 않는 파일형식');
        return;
      }
      setBusinessData(prev => ({ ...prev, [name]: file }));
    }
  };

  // 숨겨진 file input의 클릭 이벤트를 트리거하는 함수
  const triggerFileInput = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const renderFilePreview = (file: File | null) => {
    if (!file) return null;

    if (file.type === 'application/pdf') {
      return (
        <PdfPreviewWrapper>
          <Worker workerUrl={workerUrl}>
            <Viewer fileUrl={URL.createObjectURL(file)} />
          </Worker>
        </PdfPreviewWrapper>
      );
    } else {
      return <PreviewImage src={URL.createObjectURL(file)} alt="Preview" />;
    }
  };

  // 주소 선택 시 businessData 상태를 업데이트하는 함수(AddressModal 컴포넌트로 전달)
  const handleAddressComplete = (data: {
    address: string;
    zonecode: string;
  }) => {
    setBusinessData(prev => ({
      ...prev,
      address: data.address,
      zonecode: data.zonecode,
    }));
  };
  //recoil로 관리되는 회원가입 요청 정보 데이터를 보내고, 제출함수를 불러와서 회원가입 요청을 진행
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormData(prev => ({
      ...prev,
      businessRegCertificateImage: businessData.businessProof,
      animalBurialPermitImage: businessData.licenseProof,
      companySignUpReq: {
        ...prev.companySignUpReq,
        businessRegNum: businessData.businessNumber,
        address: businessData.address,
        addressDetail: businessData.detailedAdress,
      },
    }));
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
        onChange={handleBusinessNumberChange}
        placeholder="사업자 등록번호를 입력해주세요."
        required
      />
      <AddressContainer>
        {businessData.zonecode ? (
          <>
            <InputBox>
              <Input
                type="text"
                name="zonecode"
                value={businessData.zonecode}
                onChange={handleChange}
                disabled
              ></Input>
              <Button onClick={openModal} type="button">
                주소 찾기
              </Button>
            </InputBox>
            <InputWithLabel
              label="주소"
              htmlFor="input-address"
              type="text"
              name="address"
              value={businessData.address}
              onChange={handleChange}
              placeholder="주소 찾기를 눌러주세요."
              required
              disabled
            />
            <Input
              type="text"
              name="detailedAdress"
              value={businessData.detailedAdress}
              onChange={handleChange}
            ></Input>
          </>
        ) : (
          <InputBox>
            <InputWithLabel
              label="주소"
              htmlFor="input-address"
              type="text"
              name="address"
              value={businessData.address}
              onChange={handleChange}
              placeholder="주소 찾기를 눌러주세요."
              required
              disabled
            />
            <Button addTopMargin={'1.8rem'} type="button" onClick={openModal}>
              주소 찾기
            </Button>
          </InputBox>
        )}
      </AddressContainer>
      <FileUpload>
        <label>사업자 등록증 첨부</label>
        <FileInputWrapper
          hasFile={!!businessData.businessProof}
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
          {renderFilePreview(businessData.businessProof)}
        </FileInputWrapper>
        {businessData.businessProof && (
          <FileName>{businessData.businessProof.name}</FileName>
        )}
      </FileUpload>

      <FileUpload>
        <label>동물장묘 허가증 첨부</label>
        <FileInputWrapper
          hasFile={!!businessData.licenseProof}
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
          {renderFilePreview(businessData.licenseProof)}
        </FileInputWrapper>
        {businessData.licenseProof && (
          <FileName>{businessData.licenseProof.name}</FileName>
        )}
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
      <AddressModal
        isOpen={isOpen}
        onClose={closeModal}
        onComplete={handleAddressComplete}
      />
      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage}
      />
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
  flex-direction: column;
  gap: 10px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const FileUpload = styled.div`
  margin-top: 1rem;
`;

const FileInputWrapper = styled.div<{ hasFile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  background-color: #f9f9f9;
  border: 2px dashed #ccc;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  color: #999;
  font-size: 1rem;
  position: relative;

  input[type='file'] {
    display: none;
  }

  &::before {
    content: '${props => (!props.hasFile ? '+' : '')}';
    font-size: 2rem;
    color: #999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    display: ${props => (props.hasFile ? 'none' : 'block')};
  }

  &::after {
    content: '${props => (!props.hasFile ? '이미지 추가' : '')}';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 10%);
    color: #999;
    display: ${props => (props.hasFile ? 'none' : 'block')};
  }
`;

const PdfPreviewWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  canvas {
    width: 100%;
    height: auto;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
`;

const FileName = styled.span`
  color: #333;
  margin-top: 5px;
  font-size: 0.875rem;
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

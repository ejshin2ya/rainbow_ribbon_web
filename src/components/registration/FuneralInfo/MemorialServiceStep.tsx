import { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  ImageUploadArea,
  ImagePreview,
  UploadButton,
  ImageCountText,
  HiddenInput,
  StepProps,
  FormTitle,
  FormSubTitle,
  ButtonGroup,
  Button,
  Input,
  HintText,
  NextButton,
  ImgBox,
} from '../../../styles/ModalStyle';
import { funeralCompositionState } from '../../../atoms/funeralCompositionState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { registerFuneralComposition } from '../../../services/FuneralCompositionService';
import { clearFuneralCompositionProgress } from '../../../utils/funeralCompositionUtils';

interface MemorialServiceStepProps extends StepProps {
  onClose: () => void;
  onRegistrationComplete: () => void;
}

const MemorialServiceStep: React.FC<MemorialServiceStepProps> = ({
  onClose,
  onRegistrationComplete,
}) => {
  const [funeralComposition, setFuneralComposition] = useRecoilState(
    funeralCompositionState,
  );
  const [isNextButtonActive, setIsNextButtonActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasMemorialService =
    funeralComposition.funeralInfoUpdateReq.hasMemorial;

  useEffect(() => {
    const hasImages = funeralComposition.memorialImage.length > 0;
    const hasPrice = !!funeralComposition.funeralInfoUpdateReq.memorialPrice;

    setIsNextButtonActive(
      hasMemorialService === false ||
        (hasMemorialService && hasImages && hasPrice),
    );

    return () => {
      funeralComposition.memorialImage.forEach(image => {
        if ('preview' in image) {
          // MemorialImage 타입 체크
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [funeralComposition, hasMemorialService]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFuneralComposition(prev => {
        const newImages = files.map(file => ({
          file,
          preview: URL.createObjectURL(file),
        }));

        const updatedImages = [
          ...(prev.memorialImage || []),
          ...newImages,
        ].slice(0, 3);

        return {
          ...prev,
          memorialImage: updatedImages,
        };
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSetMemorialService = (value: boolean) => {
    setFuneralComposition(prev => ({
      ...prev,
      funeralInfoUpdateReq: {
        ...prev.funeralInfoUpdateReq,
        hasMemorial: value,
      },
      ...(value
        ? {}
        : {
            memorialImage: [],
            funeralInfoUpdateReq: {
              ...prev.funeralInfoUpdateReq,
              memorialPrice: 0,
            },
          }),
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFuneralComposition(prev => ({
      ...prev,
      funeralInfoUpdateReq: {
        ...prev.funeralInfoUpdateReq,
        memorialPrice: parseInt(value) || 0,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await registerFuneralComposition(funeralComposition);
      console.log('Registration successful:', response);
      clearFuneralCompositionProgress();
      alert('등록 성공');
      onRegistrationComplete(); // 등록 완료 후 부모 컴포넌트에 알림
      onClose(); // 또는 다음 단계로 이동하는 로직
    } catch (error) {
      console.error('Registration failed:', error);
      // 에러 메시지 표시
    }
  };

  const handleDeleteImage = (index: number) => {
    setFuneralComposition(prev => {
      const updatedImages = [...prev.memorialImage];
      const removedImage = updatedImages[index];
      if (removedImage && 'preview' in removedImage) {
        URL.revokeObjectURL(removedImage.preview);
      }
      updatedImages.splice(index, 1);
      return { ...prev, memorialImage: updatedImages };
    });
  };

  return (
    <>
      <FormTitle>메모리스톤 서비스가 있으신가요?</FormTitle>
      <ButtonGroup>
        <Button
          onClick={() => handleSetMemorialService(false)}
          isActive={hasMemorialService === false}
        >
          없어요
        </Button>
        <Button
          onClick={() => handleSetMemorialService(true)}
          isActive={hasMemorialService === true}
        >
          있어요
        </Button>
      </ButtonGroup>

      {hasMemorialService && (
        <>
          <FormTitle>메모리스톤 서비스를 등록해 주세요.</FormTitle>
          <FormSubTitle>상품 이미지를 등록해 주세요.</FormSubTitle>
          <HintText>최대 3장까지 등록 가능합니다.</HintText>
          <HintText>16:9 비율의 이미지를 권장합니다.</HintText>
          <ImgBox>
            {funeralComposition.memorialImage.map((image, index) => (
              <ImageContainer key={index}>
                <ImageUploadArea>
                  <ImagePreview
                    src={'preview' in image ? image.preview : (image as string)}
                    alt={`Memorial preview ${index + 1}`}
                  />
                </ImageUploadArea>
                <DeleteIconWrapper onClick={() => handleDeleteImage(index)}>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{
                      color: '#666',
                      fontSize: '24px',
                    }}
                  />
                </DeleteIconWrapper>
              </ImageContainer>
            ))}
            {funeralComposition.memorialImage.length < 3 && (
              <ImageContainer>
                <ImageUploadArea onClick={() => fileInputRef.current?.click()}>
                  <UploadButton>사진 등록</UploadButton>
                  <ImageCountText>
                    ({funeralComposition.memorialImage.length + 1}/3)
                  </ImageCountText>
                </ImageUploadArea>
              </ImageContainer>
            )}
          </ImgBox>

          <HiddenInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />

          <FormTitle>가격을 입력해 주세요.</FormTitle>
          <Input
            type="text"
            value={funeralComposition.funeralInfoUpdateReq.memorialPrice || ''}
            onChange={handlePriceChange}
            placeholder="숫자만 입력해주세요."
          />
        </>
      )}

      <NextButton
        onClick={handleSubmit}
        isActive={hasMemorialService !== null && isNextButtonActive}
      >
        완료
      </NextButton>
    </>
  );
};

export default MemorialServiceStep;

const ImageContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-top: 10px;
  margin-right: 20px;
`;

const DeleteIconWrapper = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  top: -3px;
  right: 0px;
  background-color: white;
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  z-index: 1;
`;

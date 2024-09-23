import { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
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
} from '../../../styles/ModalStyle';
import { funeralCompositionState } from '../../../atoms/funeralCompositionState';

interface MemorialServiceStepProps extends StepProps {
  onClose: () => void;
}

const MemorialServiceStep: React.FC<MemorialServiceStepProps> = ({
  onClose,
}) => {
  const [funeralComposition, setFuneralComposition] = useRecoilState(
    funeralCompositionState,
  );
  const [hasMemorialService, setHasMemorialService] = useState<boolean | null>(
    null,
  );
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (Array.isArray(funeralComposition.memorialImage)) {
      const urls = funeralComposition.memorialImage.map(file => {
        if (file instanceof File) {
          return URL.createObjectURL(file);
        }
        return '';
      });
      setPreviewUrls(urls);
    }
  }, [funeralComposition.memorialImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFuneralComposition(prev => ({
        ...prev,
        memorialImage: [...(prev.memorialImage as File[]), ...files].slice(
          0,
          3,
        ),
      }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSetMemorialService = (value: boolean) => {
    setHasMemorialService(value);
    setFuneralComposition(prev => ({
      ...prev,
      funeralInfoUpdateReq: {
        ...prev.funeralInfoUpdateReq,
        hasMemorial: value,
      },
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

  const handleSubmit = () => {
    onClose();
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
          {previewUrls.map((url, index) => (
            <ImageUploadArea key={index}>
              <ImagePreview src={url} alt={`Memorial preview ${index + 1}`} />
            </ImageUploadArea>
          ))}
          {previewUrls.length < 3 && (
            <ImageUploadArea onClick={handleUploadClick}>
              <UploadButton>사진 등록</UploadButton>
            </ImageUploadArea>
          )}
          <ImageCountText>({previewUrls.length}/3)</ImageCountText>

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

      <NextButton onClick={handleSubmit} isActive={hasMemorialService !== null}>
        완료
      </NextButton>
    </>
  );
};

export default MemorialServiceStep;

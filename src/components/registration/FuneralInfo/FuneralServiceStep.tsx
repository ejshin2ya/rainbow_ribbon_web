import { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  StepProps,
  FormTitle,
  Input,
  CharCount,
  HintText,
  NextButton,
  ImageUploadArea,
  ImagePreview,
  UploadButton,
  HiddenInput,
  ImageCountText,
} from '../../../styles/ModalStyle';
import { funeralCompositionState } from '../../../atoms/funeralCompositionState';

const FuneralServiceStep: React.FC<StepProps> = ({ nextStep }) => {
  const [funeralComposition, setFuneralComposition] = useRecoilState(
    funeralCompositionState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isNextButtonActive, setIsNextButtonActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (funeralComposition.shroudCoffinImage) {
      if (typeof funeralComposition.shroudCoffinImage === 'string') {
        setPreviewUrl(funeralComposition.shroudCoffinImage);
      } else if (funeralComposition.shroudCoffinImage instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(funeralComposition.shroudCoffinImage);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [funeralComposition.shroudCoffinImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFuneralComposition(prev => ({
        ...prev,
        shroudCoffinImage: file,
      }));
    }
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 한글(자음, 모음 포함), 영문, 공백만 허용
    const filteredValue = value
      .replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z\s]/g, '')
      .slice(0, 30);

    setFuneralComposition(prev => ({
      ...prev,
      funeralInfoUpdateReq: {
        ...prev.funeralInfoUpdateReq,
        shroudDescription: filteredValue,
      },
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');

    setFuneralComposition(prev => ({
      ...prev,
      funeralInfoUpdateReq: {
        ...prev.funeralInfoUpdateReq,
        shroudPrice: parseInt(value) || 0,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNextButtonActive) {
      nextStep();
    }
  };

  useEffect(() => {
    const { shroudDescription, shroudPrice } =
      funeralComposition.funeralInfoUpdateReq;
    setIsNextButtonActive(
      shroudDescription.length > 0 &&
        shroudPrice > 0 &&
        funeralComposition.shroudCoffinImage !== null,
    );
  }, [funeralComposition]);

  return (
    <form onSubmit={handleSubmit}>
      <FormTitle>수의-함 이미지를 등록해 주세요.</FormTitle>
      <HintText>16:9 비율의 이미지를 권장합니다.</HintText>
      <ImageUploadArea onClick={handleUploadClick}>
        {previewUrl ? (
          <ImagePreview src={previewUrl} alt="Shroud-Coffin preview" />
        ) : (
          <UploadButton>사진 등록</UploadButton>
        )}
      </ImageUploadArea>
      <ImageCountText>({previewUrl ? '1' : '0'}/1)</ImageCountText>

      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />

      <FormTitle>수의-함을 설명해 주세요.</FormTitle>
      <Input
        type="text"
        value={funeralComposition.funeralInfoUpdateReq.shroudDescription}
        onChange={handleDescriptionChange}
        placeholder="명주, 인견 소재를 사용하여 제작"
        maxLength={30}
      />
      <CharCount>
        {funeralComposition.funeralInfoUpdateReq.shroudDescription.length}/30자
      </CharCount>

      <FormTitle>가격을 입력해 주세요.</FormTitle>
      <Input
        type="text"
        value={funeralComposition.funeralInfoUpdateReq.shroudPrice || ''}
        onChange={handlePriceChange}
        placeholder="숫자만 입력해주세요."
        maxLength={10}
      />
      <CharCount>
        {
          (funeralComposition.funeralInfoUpdateReq.shroudPrice || '').toString()
            .length
        }
        /10자
      </CharCount>

      <NextButton type="submit" isActive={isNextButtonActive}>
        다음
      </NextButton>
    </form>
  );
};

export default FuneralServiceStep;

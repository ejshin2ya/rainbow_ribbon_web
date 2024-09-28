import { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  StepProps,
  FormTitle,
  Input,
  HintText,
  NextButton,
  CharCount,
} from '../../../styles/ModalStyle';
import { funeralCompositionState } from '../../../atoms/funeralCompositionState';

const FuneralItemStep: React.FC<StepProps> = ({ nextStep }) => {
  const [funeralComposition, setFuneralComposition] = useRecoilState(
    funeralCompositionState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isNextButtonActive, setIsNextButtonActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (funeralComposition.funeralImage instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(funeralComposition.funeralImage);
    }
  }, [funeralComposition.funeralImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFuneralComposition(prev => ({
        ...prev,
        funeralImage: file,
      }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 한글, 영문, 공백만 남기고 모두 제거
    const filteredValue = value.replace(/[^가-힣a-zA-Z\s]/g, '');

    setFuneralComposition(prev => ({
      ...prev,
      funeralInfoUpdateReq: {
        ...prev.funeralInfoUpdateReq,
        funeralDescription: filteredValue,
      },
    }));
  };

  const handleDurationChange = (hours: number, minutes: number) => {
    const totalMinutes = hours * 60 + minutes;
    setFuneralComposition(prev => ({
      ...prev,
      funeralInfoUpdateReq: {
        ...prev.funeralInfoUpdateReq,
        durationMin: totalMinutes,
      },
    }));
  };

  useEffect(() => {
    const { funeralDescription, durationMin } =
      funeralComposition.funeralInfoUpdateReq;
    setIsNextButtonActive(
      funeralDescription.length > 0 &&
        durationMin > 0 &&
        funeralComposition.funeralImage !== null,
    );
  }, [funeralComposition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNextButtonActive) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormTitle>화장 장례 이미지를 등록해 주세요.</FormTitle>
      <HintText>16:9 비율의 이미지를 권장합니다.</HintText>
      <ImageUploadArea onClick={handleUploadClick}>
        {previewUrl ? (
          <ImagePreview src={previewUrl} alt="Funeral preview" />
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

      <FormTitle>구성서비스를 설명해 주세요.</FormTitle>
      <Input
        type="text"
        value={funeralComposition.funeralInfoUpdateReq.funeralDescription}
        onChange={handleDescriptionChange}
        placeholder="연습/기도/화장/보자기 등"
        maxLength={30}
      />

      <CharCount>
        {funeralComposition.funeralInfoUpdateReq.funeralDescription.length}
        /30자
      </CharCount>

      <FormTitle>장례 소요 시간을 선택해 주세요.</FormTitle>
      <TimeInputContainer>
        <TimeInput>
          <SmallInput
            type="number"
            min="0"
            max="23"
            value={Math.floor(
              funeralComposition.funeralInfoUpdateReq.durationMin / 60,
            )}
            onChange={e =>
              handleDurationChange(
                parseInt(e.target.value),
                funeralComposition.funeralInfoUpdateReq.durationMin % 60,
              )
            }
          />
        </TimeInput>
        <Label>시간</Label>
        <TimeInput>
          <SmallSelect
            value={funeralComposition.funeralInfoUpdateReq.durationMin % 60}
            onChange={e =>
              handleDurationChange(
                Math.floor(
                  funeralComposition.funeralInfoUpdateReq.durationMin / 60,
                ),
                parseInt(e.target.value),
              )
            }
          >
            <option value="0">00</option>
            <option value="30">30</option>
          </SmallSelect>
        </TimeInput>
        <Label>분</Label>
      </TimeInputContainer>
      <NextButton type="submit" isActive={isNextButtonActive}>
        다음
      </NextButton>
    </form>
  );
};

export default FuneralItemStep;

const ImageUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  overflow: hidden;
`;

const UploadButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;

  &::before {
    content: '+';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: 1px solid #666;
    border-radius: 50%;
    margin-bottom: 8px;
    font-size: 20px;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageCountText = styled.span`
  font-size: 12px;
  color: #666;
  margin-top: 8px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimeInput = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const SmallInput = styled.input`
  width: 40px;
  height: 40px;
  padding: 5px;
  text-align: center;
  border: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SmallSelect = styled.select`
  width: 60px;
  height: 40px;
  padding: 5px;
  border: none;
  font-size: 14px;
  background-color: white;
  &:focus {
    outline: none;
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: #333;
  padding: 0 5px;
`;

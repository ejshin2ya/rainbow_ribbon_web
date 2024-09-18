import {
  CompanyRegistrationStep,
  RegistrationData,
  registrationDataState,
} from '../atoms/registrationDataState';

export const saveRegistrationProgress = (data: RegistrationData) => {
  localStorage.setItem('companyRegistrationProgress', JSON.stringify(data));
};

export const loadRegistrationProgress = (): RegistrationData | null => {
  const saved = localStorage.getItem('companyRegistrationProgress');
  if (!saved) return null;

  try {
    const parsedData = JSON.parse(saved) as RegistrationData;
    // Ensure the currentStep is a valid enum value
    if (!(parsedData.currentStep in CompanyRegistrationStep)) {
      parsedData.currentStep = CompanyRegistrationStep.CompanyInfo;
    }
    return parsedData;
  } catch (error) {
    console.error('Failed to parse saved registration data:', error);
    return null;
  }
};

export const clearRegistrationProgress = () => {
  localStorage.removeItem('companyRegistrationProgress');
};

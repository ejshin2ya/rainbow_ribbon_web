import { RegistrationData } from '../atoms/registrationDataState';

export const saveRegistrationProgress = (data: RegistrationData) => {
  localStorage.setItem('companyRegistrationProgress', JSON.stringify(data));
};

export const loadRegistrationProgress = (): RegistrationData | null => {
  const saved = localStorage.getItem('companyRegistrationProgress');
  if (!saved) return null;

  try {
    const parsedData = JSON.parse(saved) as RegistrationData;
    return parsedData;
  } catch (error) {
    console.error('Failed to parse saved registration data:', error);
    return null;
  }
};

export const clearRegistrationProgress = () => {
  localStorage.removeItem('companyRegistrationProgress');
};

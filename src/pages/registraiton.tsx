import styled from 'styled-components';
import CompanyRegistration from '../components/registration/CompanyRegistration';

const RegistrationPage = () => {
  return (
    <PageContainer>
      <CompanyRegistration />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export default RegistrationPage;

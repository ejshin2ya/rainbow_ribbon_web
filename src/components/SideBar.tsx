import { useNavigate } from 'react-router-dom';
import { SideBarItem } from './SidBarItem';

export const SideBar = function () {
  const navigate = useNavigate();
  const generateHandler = (path?: string) => () => {
    navigate(path ?? '');
  };
  return (
    <div className="w-full h-full bg-reborn-gray0">
      <SideBarItem onClick={generateHandler('')} icon="" title="예약 관리" />
      <SideBarItem
        onClick={generateHandler('company')}
        icon=""
        title="업체 관리"
      />
      <SideBarItem
        onClick={generateHandler('business')}
        icon=""
        title="비즈니스 관리"
        subTitle="추후 서비스 런칭"
      />
      <SideBarItem
        onClick={generateHandler('chat')}
        icon=""
        title="채팅 상담"
      />
    </div>
  );
};

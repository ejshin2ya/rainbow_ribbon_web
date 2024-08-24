import { SideBarItem } from './SidBarItem';

export const SideBar = function () {
  return (
    <div className="w-full h-full bg-reborn-gray0">
      <SideBarItem icon="" title="예약 관리" />
      <SideBarItem icon="" title="업체 관리" />
      <SideBarItem icon="" title="비즈니스 관리" subTitle="추후 서비스 런칭" />
      <SideBarItem icon="" title="채팅 상담" />
    </div>
  );
};

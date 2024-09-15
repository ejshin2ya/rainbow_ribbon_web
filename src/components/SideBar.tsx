import { NavLink, useNavigate } from 'react-router-dom';
import { SideBarItem } from './SidBarItem';
import { ReactComponent as ReservationIcon } from '../assets/Reservation.svg';
import { ReactComponent as ClientIcon } from '../assets/Client.svg';
import { ReactComponent as BusinessIcon } from '../assets/Business.svg';
import { ReactComponent as ChatIcon } from '../assets/Chat.svg';

export const SideBar = function () {
  const navigate = useNavigate();
  const generateHandler = (path?: string) => () => {
    // navigate(path ?? '');
  };

  return (
    <div className="w-full h-full bg-reborn-gray0 flex-shrink-0">
      <div className="flex flex-row w-full h-[96px] items-center justify-center gap-[10px] px-[30px] border-b-[4px] border-b-reborn-gray1 flex-shrink-0">
        <div className="w-[48px] h-[48px] rounded-[4px] flex-shrink-0">
          <img
            className="w-full h-full"
            src={'/assets/images/icMapMarkerOrange.png'}
            alt="no-image"
          />
        </div>
        <div className="flex flex-col gap-[1px] flex-1 w-[1px]">
          <div className="text-[14px] font-medium truncate text-reborn-gray8">
            {'포포즈 경기 김포점'}
          </div>
          <div className="font-roboto text-[12px] font-medium truncate text-reborn-gray4">
            ID: {'2347329347'}
          </div>
        </div>
      </div>
      <NavLink
        to={''}
        end
        style={({ isActive }) => ({
          color: isActive ? '#181717' : '#858583',
        })}
      >
        <SideBarItem
          onClick={generateHandler('')}
          icon={<ReservationIcon width={16} height={16} />}
          title="예약 관리"
        />
      </NavLink>
      <NavLink
        to={'company'}
        style={({ isActive }) => ({
          color: isActive ? '#181717' : '#858583',
        })}
      >
        <SideBarItem
          onClick={generateHandler('company')}
          icon={<ClientIcon width={16} height={16} />}
          title="업체 관리"
        />
      </NavLink>
      <NavLink
        to={'business'}
        style={({ isActive }) => ({
          color: isActive ? '#181717' : '#858583',
        })}
      >
        <SideBarItem
          onClick={generateHandler('business')}
          icon={<BusinessIcon width={16} height={16} />}
          title="비즈니스 관리"
          subTitle="추후 서비스 런칭"
        />
      </NavLink>
      <NavLink
        to={'chat'}
        style={({ isActive }) => ({
          color: isActive ? '#181717' : '#858583',
        })}
      >
        <SideBarItem
          onClick={generateHandler('chat')}
          icon={<ChatIcon width={16} height={16} />}
          title="채팅 상담"
        />
      </NavLink>
    </div>
  );
};

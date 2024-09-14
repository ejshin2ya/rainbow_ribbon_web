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

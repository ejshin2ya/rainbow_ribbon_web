import { Outlet } from 'react-router-dom';
import { AppBar } from './AppBar';
import { SideBar } from './SideBar';

export const CommonRoute = function () {
  return (
    <div className="w-full h-full flex flex-col items-center bg-gradient-to-r from-reborn-gray0 to-reborn-white">
      <AppBar />
      <main className="w-full h-1 flex-1 flex flex-row max-w-[1440px] justify-center bg-reborn-white">
        <div className="flex flex-shrink-0 h-full w-[243px]">
          <SideBar />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

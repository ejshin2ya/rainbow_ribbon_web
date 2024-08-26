import { Outlet } from 'react-router-dom';
import { AppBar } from './AppBar';
import { SideBar } from './SideBar';

export const CommonRoute = function () {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-r from-reborn-gray0 to-reborn-white items-center">
      <AppBar />
      <main className="w-full h-1 flex-1 flex flex-row min-w-[1140px] max-w-[2440px] justify-center bg-reborn-white">
        <div className="flex flex-shrink-0 h-full w-[243px]">
          <SideBar />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

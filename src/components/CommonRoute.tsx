import { Outlet } from 'react-router-dom';
import { AppBar } from './AppBar';
import { SideBar } from './SideBar';

export const CommonRoute = function () {
  return (
    <div className="w-full h-full flex flex-col">
      <AppBar />
      <main className="w-full flex-1 flex flex-row">
        <div className="flex flex-shrink-0 h-full w-[243px]">
          <SideBar />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

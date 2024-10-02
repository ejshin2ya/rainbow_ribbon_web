import { Outlet } from 'react-router-dom';
import { AppBar } from './AppBar';
import { SideBar } from './SideBar';
import { ConfirmDialogProvider } from './confirm-dialog/confitm-dialog-store';
import { ReservationDialog } from './confirm-dialog/ReservationDialog';
import { StompProvider } from 'src/queries';

export const CommonRoute = function () {
  return (
    <StompProvider>
      <ConfirmDialogProvider>
        <ReservationDialog />
        <div className="w-full h-full flex flex-col bg-gradient-to-r from-reborn-gray0 to-reborn-white items-start">
          <AppBar />
          <main className="w-full h-1 flex-1 flex flex-row min-w-[1140px] justify-center bg-reborn-white">
            <div className="flex flex-shrink-0 h-full w-[243px]">
              <SideBar />
            </div>
            <Outlet />
          </main>
        </div>
      </ConfirmDialogProvider>
    </StompProvider>
  );
};

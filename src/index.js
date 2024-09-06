import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 10 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    {/* <React.StrictMode> */}
    {/* QueryClientProvider로 전체 애플리케이션을 감쌉니다. */}
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
      {/* ReactQueryDevtools는 QueryClientProvider 내부에 위치해야 합니다. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    {/* </React.StrictMode> */}
  </>,
);

reportWebVitals();

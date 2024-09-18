import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setupAxiosInterceptors } from 'src/api/axios';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken'),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refreshToken'),
  );
  const navigate = useNavigate();

  const login = useCallback(
    (newAccessToken: string, newRefreshToken: string) => {
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
    },
    [],
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  }, [navigate]);

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    if (!refreshToken) return false;

    try {
      const response = await axios.post('/api/account/accesstoken/refresh', {
        accessToken,
        refreshToken,
      });

      if (response.data.statusCode === '200 CONTINUE') {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.data;
        login(newAccessToken, newRefreshToken);
        return true;
      } else {
        throw new Error(response.data.msg || 'Token refresh failed');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return false;
    }
  }, [accessToken, refreshToken, login, logout]);

  useEffect(() => {
    setupAxiosInterceptors(() => accessToken, refreshAccessToken, logout);
  }, [accessToken, refreshAccessToken, logout]);

  const value = {
    accessToken,
    refreshToken,
    login,
    logout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

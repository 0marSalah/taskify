import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthCookie } from 'src/utilities/cookie';
import { jwtDecode } from 'jwt-decode';
import fetcher from 'src/utilities/fetcher';

export type UserType = {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  role: string;
};

type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => {}
});

export const ProtectRoute = ({ children }: any) => {
  const { setUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = getAuthCookie();
    if (!token) {
      setUser(null);
      navigate('/signin');
    }
  }, [navigate, setUser]);

  return children;
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState(null);

  const getUser = async () => {
    const user = await fetch('https://api-timetracker.onrender.com/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthCookie()}`
      }
    });
    const response = await user.json();
    if (response.data) setUser(response.data);
    else setUser(null);
  };

  useEffect(() => {
    const token = getAuthCookie();
    if (token) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user, setUser } = React.useContext(AuthContext);
  return { user, setUser };
};

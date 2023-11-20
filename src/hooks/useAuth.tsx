import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthCookie } from 'src/utilities/cookie';
import fetcher from 'src/utilities/fetcher';
import fetchProjects from 'src/utilities/fetchProjects';

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
  projects: [] | null;
  setProjects: React.Dispatch<React.SetStateAction<any>>;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  projects: null,
  setProjects: () => {}
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState(null);
  const [projects, setProjects] = React.useState(null);

  const getUser = async () => {
    const res = await fetcher('/user', 'GET', {});
    if (res && res.status === 'success') setUser(res.data);
    else setUser(null);
  };
  const getProjects = async () => {
    const res = await fetchProjects();
    if (res && res.status === 'success') setProjects(res.data);
    else setProjects(null);
  };

  useEffect(() => {
    const token = getAuthCookie();
    if (token) {
      getUser();
      getProjects();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, projects, setProjects }}>
      {children}
    </AuthContext.Provider>
  );
};

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

export const useAuth = () => {
  const { user, setUser, projects, setProjects } =
    React.useContext(AuthContext);
  return { user, setUser, projects, setProjects };
};

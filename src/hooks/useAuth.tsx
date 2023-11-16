import React from 'react';
import { Navigate } from 'react-router-dom';

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
  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

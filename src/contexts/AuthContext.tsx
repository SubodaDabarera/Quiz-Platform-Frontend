import useAuth from "../hooks/useAuth";
import { LoginForm } from "../types";
import React, { createContext, useContext, useEffect, useState } from "react";


interface UserSchema{
  token : String
  role: String
}

interface AuthContextType {
  user: UserSchema | null;
  setUser: React.Dispatch<React.SetStateAction<UserSchema | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSchema | null>(null);

  useEffect(() => {
    
  }, [])

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);

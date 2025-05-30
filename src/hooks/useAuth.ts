import { useAuthContext } from "../contexts/AuthContext";
import { LoginForm, RegisterForm } from "../types";
import { axiosRequest } from "../utils/api";
import React from "react";

function useAuth() {
  //@ts-ignore
  const { user, setUser } = useAuthContext();

  const login = async (data: LoginForm) => {
    const res: any = await axiosRequest.post("/api/auth/login", data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("username", res.data.username)
    setUser({ ...user, token: res.data.token, role: res.data.role });
    return res.data;
  };

  const registerUser = async (data: RegisterForm) => {
    const res:any = await axiosRequest.post("/api/auth/register", data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("username", res.data.username)
    setUser({ ...user, token: res.data.token, role: res.data.role });
    return res.data;
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username")
    setUser(null);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    return { token, role };
  };

  const checkUser = (requiredRole = "user") => {
    const { token, role } = getToken();
    return !!token && role === requiredRole;
  };

  return { login, registerUser, logout, checkUser, getToken };
}

export default useAuth;

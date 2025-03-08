import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosRequest } from "../utils/api";
import { LoginForm } from "../types";
import useAuth from "../hooks/useAuth";


export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();
  const {login} = useAuth()

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data)
      navigate("/");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div className="mt-3 font-thin text-sm hover:text-blue-500 hover:font-semibold">
        <Link to={"/register"}>Create new account</Link>
      </div>
    </div>
  );
}

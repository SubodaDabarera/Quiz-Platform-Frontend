import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosRequest } from "../utils/api";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  role: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      // const res = await axios.post('/api/auth/login', data);
      const res = await axiosRequest.post("/api/auth/register", data);
      localStorage.setItem("token", res?.data?.token);
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("role")}
          type="text"
          placeholder="Role"
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
          Register
        </button>
      </form>

      <div className="mt-3 font-thin text-sm hover:text-blue-500 hover:font-semibold">
        <Link to={"/login"}>Already Registered ?</Link>
      </div>
    </div>
  );
}

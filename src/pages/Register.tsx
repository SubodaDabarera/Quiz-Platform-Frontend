import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../types";
import { Roles } from "../enums/userRoles";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data);
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
        <select
          {...register("role")}
          defaultValue={Roles[1].value}
          className="w-full p-2 border rounded"
        >
          {Roles.map((item) => (
            <option key={item.value} value={item.value} className="w-full p-1">
              {item.title}
            </option>
          ))}
        </select>
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

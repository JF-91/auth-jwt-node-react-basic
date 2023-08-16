import { useForm } from "react-hook-form";
import { useAtuh } from "../context/authContext";
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();

  const {signup, isAuthenticated} = useAtuh()

  const navigate= useNavigate();

  useEffect(()=>{
    if(isAuthenticated) navigate('/tasks')
  },[isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        console.log(values);
        signup(values)
      })

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form
        action=""
        onSubmit={onSubmit}
      >
        <input
          placeholder="username"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="text"
          name="username"
          {...register("username", { required: true })}
        />
        <input
          placeholder="email"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="email"
          name="email"
          {...register("email", { required: true })}
        />
        <input
          placeholder="password"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="password"
          name="password"
          {...register("password", { required: true })}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

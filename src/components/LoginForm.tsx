import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';

const loginFormSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório.')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  password: z.string(),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const [output, setOutput] = useState<string>('');
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  async function loginUser(data: LoginFormData) {
    setOutput(JSON.stringify(data, null, 2));
    navigate('/upload');
  }

  return (
    <form
      onSubmit={handleSubmit(loginUser)} 
      className="flex flex-col gap-6 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="file" className="text-lg font-semibold text-gray-700">
            Login
        </label>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email" 
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
          {...register('email')}
        />
        {errors.email && <span className="text-red-600">{errors.email.message}</span>}
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password" 
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
          {...register('password')}
        />
        {errors.password && <span className="text-red-600">{errors.password.message}</span>}
      </div>

      <button
        type="submit"
        className="bg-sky-500 rounded font-semibold text-white h-10 hover:bg-sky-700"
      >
        Entrar
      </button>

      <div className="text-center">
        Não tem conta ainda? <Link to="/register" className="text-blue-500">Registre-se!</Link>
      </div>

    </form>
  );
}

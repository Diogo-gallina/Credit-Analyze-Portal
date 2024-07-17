import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import AccountContext from '../context/accountContext';

const loginFormSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório.')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  password: z.string(),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const accountContext = useContext(AccountContext);
  const [_output, setOutput] = useState<string>('');

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  async function authenticateUser(data: LoginFormData) {
    try {
      const response = await accountContext!.authenticate(data.email, data.password);
      setOutput('Login successful! ' + response);
    } catch (err) {
      console.log("Failed to login: " + err);
      setOutput("Failed to login: " + err);
    }
  }


  return (
    <form
      onSubmit={handleSubmit(authenticateUser)} 
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

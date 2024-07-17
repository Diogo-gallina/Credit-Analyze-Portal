import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import AccountContext from '../context/accountContext';

const confirmationAccountSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  confirmationCode: z.string()
    .nonempty('Código de confirmação é obrigatório.')
    .length(6, 'Código de confirmação deve ter 6 números')
});

type ConfirmationAccountData = z.infer<typeof confirmationAccountSchema>;

export function ConfirmationAccountForm() {
  const accountContext = useContext(AccountContext);

  const [_output, setOutput] = useState<string>('');
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ConfirmationAccountData>({
    resolver: zodResolver(confirmationAccountSchema),
  });

  async function confirmetionCode(data: ConfirmationAccountData) {
    try {
      await accountContext!.confirmAccount(data.email, data.confirmationCode);
      setOutput('Confirmation successful!');
      navigate('/login');
    } catch (err) {
      console.log("Failed to confirm account: " + err);
      setOutput("Failed to confirm account: " + err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(confirmetionCode)} 
      className="flex flex-col gap-6 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="file" className="text-lg font-semibold text-gray-700">
            Confirmação de conta
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
        <label htmlFor="confirmationCode">Insira o código de confirmação</label>
        <input 
          id="confirmationCode"
          type="text" 
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
          {...register('confirmationCode')}
        />
        {errors.confirmationCode && <span className="text-red-600">{errors.confirmationCode.message}</span>}
      </div>

      <button
        type="submit"
        className="bg-sky-500 rounded font-semibold text-white h-10 hover:bg-sky-700"
      >
        Verificar
      </button>

      {_output && <p>{_output}</p>}
    </form>
  );
}
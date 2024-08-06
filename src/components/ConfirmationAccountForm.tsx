import { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import AccountContext from '../context/AccountContext';
import { toast } from 'react-toastify';

const confirmationAccountSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  confirmationCode: z
    .string()
    .min(1, 'Código de confirmação é obrigatório.')
    .length(6, 'Código de confirmação deve ter 6 números'),
});

type ConfirmationAccountData = z.infer<typeof confirmationAccountSchema>;

export function ConfirmationAccountForm() {
  const accountContext = useContext(AccountContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ConfirmationAccountData>({
    resolver: zodResolver(confirmationAccountSchema),
  });

  async function confirmetionCode(data: ConfirmationAccountData) {
    try {
      await accountContext!.confirmAccount(data.email, data.confirmationCode);
      toast.success('Confirmation successful!', {
        position: 'bottom-right',
        autoClose: 5000
      })
      navigate('/login');
    } catch (err) {
      toast.error('Invalid code provided', {
        position: 'bottom-right',
        autoClose: 5000
      })
    }
  }

  async function resendCode(email: string) {
    try {
      await accountContext!.resendConfirmationCode(email);
      toast.success('Confirmation code resent successfully!', {
        position: 'bottom-right',
        autoClose: 5000
      })
    } catch (err) {
      toast.error('Failed to resend confirmation code', {
        position: 'bottom-right',
        autoClose: 5000
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(confirmetionCode)}
      className='flex flex-col gap-6 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg'
    >
      <div className='flex flex-col items-center gap-2'>
        <label
          htmlFor='confirmation'
          className='text-lg font-semibold text-gray-700'
        >
          Confirmation Account
        </label>
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          className='border border-zinc-200 shadow-sm rounded h-10 px-3'
          {...register('email')}
        />
        {errors.email && (
          <span className='text-red-600'>{errors.email.message}</span>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='confirmationCode'>Insert the confirmation code</label>
        <input
          id='confirmationCode'
          type='text'
          className='border border-zinc-200 shadow-sm rounded h-10 px-3'
          {...register('confirmationCode')}
        />
        {errors.confirmationCode && (
          <span className='text-red-600'>
            {errors.confirmationCode.message}
          </span>
        )}
      </div>

      <div className='flex justify-between gap-4'>
        <button
          type='submit'
          className='bg-sky-500 rounded font-semibold text-white h-10 hover:bg-sky-700 w-full'
        >
          Verify
        </button>

        <button
          type='button'
          onClick={() => resendCode(getValues('email'))}
          className='bg-sky-500 rounded font-semibold text-white h-10 hover:bg-sky-700 w-full'
        >
          Resend code
        </button>
      </div>
    </form>
  );
}

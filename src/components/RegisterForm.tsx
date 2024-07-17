import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { Link } from 'react-router-dom';
import AccountContext from '../context/accountContext';

const createUserFormSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório.')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1));
      }).join(' ');
    }),
  email: z.string()
    .min(1, 'Email é obrigatório.')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  document: z.string().refine((doc) => cpf.isValid(doc) || cnpj.isValid(doc), {
    message: 'Documento inválido. Deve ser um CPF ou CNPJ válido.',
  }),
  password: z.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
  passwordConfirmation: z.string(),
}).superRefine((data, ctx) => {
  if (data.password !== data.passwordConfirmation) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'As senhas não coincidem.',
      path: ['passwordConfirmation'],
    });
  }
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export function RegisterForm() {
  const accountContext = useContext(AccountContext);
  const signUp = accountContext?.signUp;

  const [_output, setOutput] = useState<string>('');

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const createUser = async (data: CreateUserFormData) => {
    if (!signUp) {
      setOutput('Sign up function is not available.');
      return;
    }

    try {
      const response = await signUp(data.name, data.email, data.document, data.password);
      console.log({response})
      setOutput('Registered Successfully! ' + response);
    } catch (err) {
        console.log('Registered Failure: ' + err)
        setOutput('Registered Failure: ' + err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createUser)} 
      className="flex flex-col gap-6 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="file" className="text-lg font-semibold text-gray-700">
            Cadastro
        </label>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="name">Nome</label>
        <input 
          id="name"
          type="text" 
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
          {...register('name')}
        />
        {errors.name && <span className="text-red-600">{errors.name.message}</span>}
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
        <label htmlFor="document">Documento (CPF/CNPJ)</label>
        <input 
          id="document"
          type="text" 
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
          {...register('document')}
        />
        {errors.document && <span className="text-red-600">{errors.document.message}</span>}
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

      <div className="flex flex-col gap-1">
        <label htmlFor="passwordConfirmation">Confirmação de Senha</label>
        <input
          id="passwordConfirmation"
          type="password" 
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
          {...register('passwordConfirmation')}
        />
        {errors.passwordConfirmation && <span className="text-red-600">{errors.passwordConfirmation.message}</span>}
      </div>

      <button
        type="submit"
        className="bg-sky-500 rounded font-semibold text-white h-10 hover:bg-sky-700"
      >
        Cadastrar
      </button>

      <div className="text-center">
        Já tem uma conta? <Link to="/login" className="text-blue-500">Entre!</Link>
      </div>
    </form>
  );
}

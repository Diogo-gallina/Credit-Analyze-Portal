import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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


type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function App() {
  const [output, setOutput] = useState('')

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className="h-screen bg-zinc-50 flex flex-col gap-10 items-center justify-center">
      <form
        onSubmit={handleSubmit(createUser)} 
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="">Nome</label>
          <input 
          type="nome" 
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
          {...register('name')}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Email</label>
          <input 
          type="email" 
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
          {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <input
          type="password" 
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
          {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Confirmação de Senha</label>
          <input
          type="password" 
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
          {...register('passwordConfirmation')}
          />
          {errors.passwordConfirmation && <span>{errors.passwordConfirmation.message}</span>}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Entrar
        </button>
      </form>

      <pre>{output}</pre>
    </main>
  )
}

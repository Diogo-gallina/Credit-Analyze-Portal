// src/components/UserForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '../lib/supabase';

const createUserFormSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório.')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  password: z.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function LoginForm() {
  const [output, setOutput] = useState('')

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  async function createUser(data: any) {
    await supabase.storage.from('forms-react').upload(
      data.file.name, 
      data.file
    )
    setOutput(JSON.stringify(data, null, 2))
  }

  console.log(errors)

  return (
    <form
      onSubmit={handleSubmit(createUser)} 
      className="flex flex-col gap-4 w-full max-w-xs"
    >

      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input 
        type="email" 
        className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
        {...register('email')}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password">Senha</label>
        <input
        type="password" 
        className="border border-zinc-200 shadow-sm rounded h-10 px-3"  
        {...register('password')}
        />
      </div>

      <button
        type="submit"
        className="bg-sky-500 rounded font-semibold text-white h-10 hover:bg-sky-700"
      >
        Entrar
      </button>

      <pre>{output}</pre>
    </form>
  )
}

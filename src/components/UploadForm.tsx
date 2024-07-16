import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '../lib/supabase';

const uploadFormSchema = z.object({
  file: z
    .array(z.instanceof(File))
    .refine(files => {
      if (files.length === 0) return false;
      const file = files[0];
      return file.size <= 5 * 1024 * 1024;
    }, {
      message: 'O arquivo pode ter no máximo 5mb',
    }),
});

type UploadFormData = z.infer<typeof uploadFormSchema>

export function UploadForm() {
  const [output, setOutput] = useState('')
  const [fileName, setFileName] = useState('')

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadFormSchema),
  })

  async function uploadFile(data: UploadFormData) {
    const file = data.file[0];
    await supabase.storage.from('forms-react').upload(
      file.name, 
      file
    )
    setOutput(JSON.stringify(data, null, 2))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setFileName(file.name);
      setValue('file', [file]);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(uploadFile)} 
      className="flex flex-col gap-6 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="file" className="text-lg font-semibold text-gray-700">
            Arquivo da Nota Fiscal
        </label>
      </div>
        
      <div className="flex flex-col gap-2">
        <input
          type="file" 
          accept="image/*"
          id="file"
          {...register('file')}
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex items-center">
          <label 
            htmlFor="file" 
            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Escolher Arquivo
          </label>
          <span className="ml-3 text-gray-700">{fileName || 'Nenhum arquivo selecionado'}</span>
        </div>
        {errors.file && <span className="text-red-600 text-sm">{errors.file.message}</span>}
      </div>

      <button
        type="submit"
        className="bg-sky-500 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition-colors"
      >
        Enviar para Análise
      </button>

    </form>
  )
}

import { useContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import userPool from '../lib/aws-cognito/userPool';
import AccountContext from '../context/AccountContext';

const uploadFormSchema = z.object({
  file: z.array(z.instanceof(File)).refine(
    (files) => files.length > 0 && files[0].size <= 5 * 1024 * 1024,
    {
      message: 'O arquivo pode ter no máximo 5mb',
    }
  ),
});

type UploadFormData = z.infer<typeof uploadFormSchema>;
type UserAttributes = {
  [key: string]: string;
};

export function UploadForm() {
  const [_output, setOutput] = useState('');
  const [fileName, setFileName] = useState('');
  const [userData, setUserData] = useState({ name: '', email: '', document: '' });
  const accountContext = useContext(AccountContext);

  if (!accountContext) {
    throw new Error('AccountContext not provided');
  }

  const { currentSession, token } = accountContext;

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UploadFormData>({
    resolver: zodResolver(uploadFormSchema),
  });

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          console.error('Erro ao obter sessão do usuário:', err);
          return;
        }

        cognitoUser.getUserAttributes((err: any, attributes: any) => {
          if (err || !attributes) {
            console.error('Erro ao obter atributos do usuário:', err);
            return;
          }

          const userAttributes: UserAttributes = {};
          attributes.forEach((attribute: any) => {
            userAttributes[attribute.Name] = attribute.Value;
          });

          setUserData({
            name: userAttributes['name'] || '',
            email: userAttributes['email'] || '',
            document: userAttributes['custom:Document'] || ''
          });
        });
      });
    }
  }, []);

  async function uploadFile(data: UploadFormData) {
    if (!token) {
      console.error('Usuário não autenticado');
      return;
    }

    const file = data.file[0];

    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('document', userData.document);
    formData.append('invoiceFile', file);

    try {
      const response = await fetch('http://localhost:8080/credit-analyze/analyze-invoice', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao enviar o arquivo para análise');

      const result = await response.json();
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setFileName(file.name);
      setValue('file', [file]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(uploadFile)}
      className='flex flex-col gap-6 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg'
    >
      <div className='flex flex-col items-center gap-2'>
        <label htmlFor='file' className='text-lg font-semibold text-gray-700'>
          Arquivo da Nota Fiscal
        </label>
      </div>

      <div className='flex flex-col gap-2'>
        <input
          type='file'
          accept='image/*'
          id='file'
          {...register('file')}
          className='hidden'
          onChange={handleFileChange}
        />
        <div className='flex items-center'>
          <label
            htmlFor='file'
            className='cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors'
          >
            Escolher Arquivo
          </label>
          <span className='ml-3 text-gray-700'>
            {fileName || 'Nenhum arquivo selecionado'}
          </span>
        </div>
        {errors.file && (
          <span className='text-red-600 text-sm'>{errors.file.message}</span>
        )}
      </div>

      <button
        type='submit'
        className='bg-sky-500 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition-colors'
      >
        Enviar para Análise
      </button>
    </form>
  );
}

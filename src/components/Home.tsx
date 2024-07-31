import Contact from './Contact';

export default function Home() {
  return (
    <div className='flex flex-col gap-6 w-full mx-auto bg-white p-12 rounded-lg'>
      <div className='text-center'>
        <h2 className='text-4xl font-bold text-blue-500 mb-4'>
          Credit Analyze
        </h2>
        <p className='text-lg text-gray-700 mb-8'>
          Credit analysis home page. This web project is a developer challenge focused on using AWS solutions to solve specific use cases.
        </p>
      </div>

      <Contact />
    </div>
  );
}

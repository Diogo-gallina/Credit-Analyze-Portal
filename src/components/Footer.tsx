export default function Footer() {
  return (
    <footer className='bg-gray-500 text-white py-4'>
      <div className='container mx-auto text-center'>
        <p>
          &copy; {new Date().getFullYear()} Credit Analyze. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

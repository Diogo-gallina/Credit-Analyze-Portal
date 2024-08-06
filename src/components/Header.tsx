import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AccountContext from '../context/AccountContext';

export default function Header() {
  const accountContext = useContext(AccountContext);
  const { currentSession, signOut } = accountContext || {};

  return (
    <header>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <a href='/' className='flex items-center'>
            <img
              src='/src/public/credit-logo.png'
              className='mr-3 h-6 sm:h-9'
              alt='Credit Analyze Logo'
            />
            <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
              Credit Analyze
            </span>
          </a>

          <div className='flex items-center lg:order-2'>
            {currentSession ? (
              <>
                <Link
                  to='/upload'
                  className='text-white hover:underline font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
                >
                  Invoice Upload
                </Link>
                <Link
                  to='/analyze-history'
                  className='text-white hover:underline font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
                >
                  Analyze History
                </Link>
                <button
                  onClick={signOut}
                  className='text-blue-400 font-semibold dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='text-white font-semibold dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
                >
                  Log in
                </Link>
                <Link
                  to='/register'
                  className='text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

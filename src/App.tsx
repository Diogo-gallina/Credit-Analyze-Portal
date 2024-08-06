import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import AccountState from './lib/aws-cognito/accountState';
import ConfirmationAccount from './pages/ConfirmationAccount';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import PrivateRoute from './components/PrivateRoute';
import AnalyzeHistory from './pages/AnalyzeHistory';

export default function App() {
  return (
    <Router>
      <AccountState>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/confirmation-account' element={<ConfirmationAccount />} />
              <Route path='/login' element={<Login />} />
              <Route path='/upload' element={<PrivateRoute element={<Upload />} />} />
              <Route path='/analyze-history' element={<PrivateRoute element={<AnalyzeHistory />} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AccountState>
      <ToastContainer />
    </Router>
  );
}

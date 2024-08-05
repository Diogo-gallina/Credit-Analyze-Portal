import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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


//const apiUrl = process.env.REACT_APP_API_URL;

export default function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/register'
              element={
                <AccountState>
                  <Register />
                </AccountState>
              }
            />
            <Route
              path='/confirmation-account'
              element={
                <AccountState>
                  <ConfirmationAccount />
                </AccountState>
              }
            />
            <Route
              path='/login'
              element={
                <AccountState>
                  <Login />
                </AccountState>
              }
            />
            <Route
              path='/upload'
              element={
                <AccountState>
                  <PrivateRoute element={<Upload />} />
                </AccountState>
              }
            />
            <Route
              path='/analyze-history'
              element={
                <AccountState>
                  <PrivateRoute element={<AnalyzeHistory />} />
                </AccountState>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

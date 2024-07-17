import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import ConfirmationAccount from './pages/ConfirmationAccount'
import Login from './pages/Login'
import Upload from './pages/Upload'
import AccountState from './lib/aws-cognito/accountState'

//const apiUrl = process.env.REACT_APP_API_URL;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<AccountState><Register /></AccountState>} />
        <Route path="/confirmation-account" element={<AccountState><ConfirmationAccount /></AccountState>} />
        <Route path="/login" element={<AccountState><Login /></AccountState>} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  )
}

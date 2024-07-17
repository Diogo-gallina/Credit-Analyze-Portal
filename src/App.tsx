import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Upload from './pages/Upload'
import AccountState from './lib/aws-cognito/accountState'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<AccountState><Register /></AccountState>} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  )
}


import './App.css'
import Homepage from './components/pages/homepage'
import CreateAccount from './components/ui/create_account'
import LoginForm from './components/ui/login-form'
import ProfileCard from './components/pages/profilepage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from './components/pages/profilepage'


function App() {

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/profile" element={<ProfilePage name='johndoe' email='johndoe@gmail.com' />} />
      </Routes>
    </Router>

  )
}

export default App

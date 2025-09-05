import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './../pages/Home';
import ChatUi from './../sections/chatUi';
import Register from './../pages/RegisterPage';
import LoginPage from './../pages/LoginPage';
import ProtectedRoute from "../components/ProtectedRoute";


const routes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/ai/chats" element={<ProtectedRoute><ChatUi/></ProtectedRoute>} />
            <Route path="/ai/register" element={<Register/>} />
            <Route path="/ai/login" element={<LoginPage/>} />
        </Routes>
    </Router>
  )
}

export default routes

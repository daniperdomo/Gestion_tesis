import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Versa from './pages/versa';
import Register from './pages/Register';
import Login from './pages/Login';
import RegisterForm from './components/RegisterForm';
import Header from './components/header';
import Footer from './components/footer';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/register/:type' element={<RegisterForm />} />
                <Route path='/login' element={<Login />} />
                {/* <Route path='/:title' element={<Versa />} /> */}
                <Route path='*' element={<Home />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
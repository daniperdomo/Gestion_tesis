import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pantalla_inicial from './pages/Pantalla_inicial';
import Inicio_sesion from './pages/Inicio_sesion';
import Registro_usuario from './pages/Registro_usuario';
import Home from './pages/Home';
import Versa from './pages/versa';
import Register from './pages/Register';
import Login from './pages/Login';
import RegisterForm from './pages/RegisterForm';
import Header from './components/header';
import Footer from './components/footer';
import Inicio_Sesion from './pages/Inicio_sesion';
import SinComponentes from './components/SinComponentes';

function App() {
    return (
        <Router>
            <SinComponentes>


            </SinComponentes>

            <Header />
            <Routes>
                <Route path='/' element={<Pantalla_inicial />} />
                <Route path='/registro_usuario' element={<Registro_usuario />} />
                <Route path='/inicio_sesion' element={<Inicio_Sesion />} />
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
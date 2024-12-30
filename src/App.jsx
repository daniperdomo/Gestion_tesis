import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pantalla_inicial from './pages/Pantalla_inicial';
import Inicio_sesion from './pages/Inicio_sesion';
import Registro_usuario from './pages/Registro_usuario';
import Register from './pages/Register';
import RegisterForm from './pages/RegisterForm';
import Inicio_Sesion from './pages/Inicio_sesion';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/registro_usuario' element={<Registro_usuario />} />
                <Route path='/inicio_sesion' element={<Inicio_Sesion />} />
                <Route path='/register' element={<Register />} />
                <Route path='/register/:type' element={<RegisterForm />} />
                <Route path='*' element={<Pantalla_inicial />} />
            </Routes>
        </Router>
    );
}

export default App;
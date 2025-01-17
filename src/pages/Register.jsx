import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import './register.css'; // Asegúrate de importar el archivo CSS

const Register = () => {
    const options = [
        { id: 1, title: 'Tesista', description: 'Registro de estudiantes que pueden realizar tesis', link: '/register/tesista' },
        { id: 2, title: 'Profesor', description: 'Registro de profesores al sistema', link: '/register/profesor' },
        { id: 3, title: 'Tutor Empresarial', description: 'Registro de trabajadores que son tutores', link: '/register/tutor-empresarial' },
        { id: 4, title: 'Especialidad', description: 'Registro de especialidades', link: '/register/especialidad' },
        { id: 5, title: 'Consejo Escuela', description: 'Registro de reuniones realizadas por la escuela', link: '/register/consejo-escuela' },
        { id: 6, title: 'Propuesta TG', description: 'Registro de propuestas realizadas por tesistas', link: '/register/propuesta' },
        { id: 7, title: 'Jurado', description: 'Registro de relación entre jurados y propuestas', link: '/register/jurado' }
    ];

    return (
        <>
            <Header />
            <div className="custom-background">
                <div className="custom-container">
                    {options.map(option => (
                        <div key={option.id} className="custom-card">
                            <h2>{option.title}</h2>
                            <p>{option.description}</p>
                            <Link to={option.link}>
                                <button className="custom-button">
                                    Seleccionar
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;

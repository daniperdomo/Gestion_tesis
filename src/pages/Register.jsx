import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

const Register = () => {
    const options = [
        { id: 1, title: 'Tesista', description: 'Registro de estudiantes que pueden realizar tesis', link: '/register/tesista' },
        { id: 2, title: 'Profesor', description: 'Registro de profesores al sistema', link: '/register/profesor' },
        { id: 3, title: 'Tutor Empresarial', description: 'Registro de trabajadores que son tutores', link: '/register/tutor-empresarial' },
        { id: 4, title: 'Especialidad', description: 'Registro de especialidades', link: '/register/especialidad' },
        { id: 5, title: 'Consejo Escuela', description: 'Registro de reuniones realizadas por la escuela', link: '/register/consejo-escuela' },
        { id: 6, title: 'Propuesta TG', description: 'Registro de propuestas realizadas por tesistas', link: '/register/propuesta'},
        { id: 7, title: 'Proponen', description: 'Registro de la relacion entre tesistas y propuestas', link: '/register/proponen'},
        { id: 8, title: 'Se Especializa', description: 'Registro de relacion entre profesores y especialidades', link: '/register/especializa'},
        { id: 9, title: 'Es Jurado', description: 'Registro de relacion entre jurados y propuestas', link: '/register/jurado'}
    ];

    return (
        <>
            <Header/>
            <div className="container mx-auto p-4">
                <h1 className="text-center text-2xl font-bold mb-6">Selecciona una opción para registrar</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {options.map(option => (
                        <div key={option.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-lg font-semibold mb-2">{option.title}</h2>
                            <p className="text-gray-600 mb-4">{option.description}</p>
                            <Link to={option.link}>
                                <button className="bg-[#00003EE8] text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                                    Seleccionar
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Register;
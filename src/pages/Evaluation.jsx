import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

const Evaluation = () => {
    const options = [
        { id: 1, title: 'Revision TG Experimental', description: 'Planilla de revision de propuestas experimentales', link: '/evaluation/revision-exp' },
        { id: 2, title: 'Revision TG Instrumental', description: 'Planilla de revision de propuestas instrumentales', link: '/evaluation/revision-ins' },
        { id: 3, title: 'Evaluacion TG Experimental', description: 'Planilla de evaluacion de propuestas experimentales', link: '/evaluation/evaluacion-exp' },
        { id: 4, title: 'Evaluacion TG Instrumental (Jurado)', description: 'Planilla de evaluacion de propuestas instrumentales', link: '/evaluation/evaluacion-ins' },
        { id: 5, title: 'Evaluacion TG Instrumental (Tutor)', description: 'Planilla de evaluacion de propuestas instrumentales', link: '/evaluation/evaluacion-ins-tutor' },
    ];

    return (
        <>
            <Header/>
            <div className="container mx-auto p-4">
                <h1 className="text-center text-2xl font-bold mb-6">Selecciona una planilla para evaluar</h1>
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

export default Evaluation;
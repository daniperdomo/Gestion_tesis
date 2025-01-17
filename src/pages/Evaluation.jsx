import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import './evaluation.css'; // Asegúrate de importar el archivo CSS

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

export default Evaluation;

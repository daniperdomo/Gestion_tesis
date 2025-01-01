import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/estiloHome.css';

const Home = () => {
    const { title } = useParams();

    return (
        <>
            <Header />
            <div className="home-container">
                <h1 className="home-title">Bienvenido al Sistema de Gestión de Tesis</h1>
                <p className="home-paragraph">
                    En un mundo donde los Objetivos de Desarrollo Sostenible (ODS) son cada vez más relevantes, 
                    la implementación de un sistema de gestión de tesis puede contribuir significativamente al cuidado del medio ambiente. 
                    Este sistema fomenta la sostenibilidad al reducir el uso de papel, digitalizando procesos que anteriormente dependían 
                    de documentos físicos. Esto no solo minimiza el impacto ambiental, sino que también promueve la eficiencia y la accesibilidad.
                </p>
                <p className="home-paragraph">
                    Además, al adoptar soluciones tecnológicas, las instituciones educativas pueden alinearse con los ODS, 
                    específicamente con el objetivo 12: "Producción y consumo responsables". Este sistema de gestión no solo beneficia 
                    al medio ambiente, sino que también mejora la experiencia de los estudiantes y profesores al centralizar la información, 
                    optimizar la comunicación y facilitar el seguimiento de proyectos académicos.
                </p>
            </div>
            <Footer />
        </>
    );
};

export default Home;
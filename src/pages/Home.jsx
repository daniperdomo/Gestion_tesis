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
                {/* Hero Section */}
                <section className="hero-section">
                    <h1 className="hero-title">Sistema de Gestión de Tesis</h1>
                    <p className="hero-subtitle">
                        Promoviendo la sostenibilidad a través de la digitalización y el cuidado del medio ambiente.
                    </p>
                </section>

                {/* About ODS Section */}
                <section className="ods-section">
                    <h2 className="section-title">¿Qué son los ODS?</h2>
                    <p className="section-description">
                        Los Objetivos de Desarrollo Sostenible (ODS) son un conjunto de objetivos globales adoptados por la ONU para 
                        acabar con la pobreza, proteger el planeta y garantizar la paz y la prosperidad para todos en 2030.
                    </p>
                    <div className="ods-cards">
                        <div className="ods-card">
                            <img
                                src="https://www.fundacionseres.org/BlogSeres/wp-content/uploads/2020/03/ods-12.png"
                                alt="Producción y Consumo Responsables"
                            />
                            <h3>Producción y Consumo Responsables</h3>
                            <p>
                                Nuestro sistema digital ayuda a reducir el uso de papel, promoviendo prácticas sostenibles en el ámbito académico.
                            </p>
                        </div>
                        <div className="ods-card">
                            <img
                                src="https://saludmentalandalucia.org/wp-content/uploads/2022/06/BANNER_ODS_4-1277X230.png"
                                alt="Educación de Calidad"
                            />
                            <h3>Educación de Calidad</h3>
                            <p>
                                Facilitamos el acceso a información académica, optimizando procesos educativos y fortaleciendo la educación.
                            </p>
                        </div>
                        <div className="ods-card">
                            <img
                                src="https://odsandaluciaextremadura.csic.es/wp-content/uploads/2021/09/banner13.png"
                                alt="Acción por el Clima"
                            />
                            <h3>Acción por el Clima</h3>
                            <p>
                                Al reducir el impacto ambiental, contribuimos al objetivo de combatir el cambio climático globalmente.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <h2 className="cta-title">¡Apoya a la transformación sostenible!</h2>
                    <p className="cta-description">
                        Implementar tecnología sostenible es un paso hacia un futuro más responsable. Ayuda a marcar la diferencia.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Home;
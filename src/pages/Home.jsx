import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header'; // Asegúrate de que la ruta sea correcta
import Footer from '../components/footer'; // Asegúrate de que la ruta sea correcta

const Home = () => {
    const { title } = useParams();

    return (
        <>
            <Header />
            <h1 className="text-4xl font-bold mb-4">
                Heyyy olvidona
            </h1>
            <Footer />
        </>
    );
};

export default Home;
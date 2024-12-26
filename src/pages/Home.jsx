import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useParams } from 'react-router-dom';

const Home = () => {
    const { title } = useParams();

    return (
        <>
            <Header />
            <h1>Hello from Home</h1>
            <Footer />
        </>
    );
};

export default Home;
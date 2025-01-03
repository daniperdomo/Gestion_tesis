import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useParams } from 'react-router-dom';

const Versa = () => {
    const { title } = useParams();

    return (
        <>
            <Header />
            <h1 className="text-4xl font-bold mb-4">{title ? title : 'Hello from Versa'}</h1>
            <Footer />
        </>
    );
};

export default Versa;
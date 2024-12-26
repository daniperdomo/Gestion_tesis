import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const Info = () => {
    return (
    <>
        <Header />
        <h1>Este mensaje de info siempre sera el mismo para localhost:5173/info</h1>
        <Footer />
    </>
    );
};

export default Info;
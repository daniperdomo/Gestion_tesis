import React from 'react';
import { useParams } from 'react-router-dom';

const Home = () => {
    const { title } = useParams();

    return (
        <>
            <h1 className="text-4xl font-bold mb-4">Hello from Home</h1>
        </>
    );
};

export default Home;
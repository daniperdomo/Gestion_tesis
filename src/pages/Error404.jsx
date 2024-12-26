import React from 'react';

const Error404 = () => {
    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Página No Encontrada</h1>
            <p className="text-lg">Lo sentimos, la página que buscas no existe.</p>
            <p className="text-lg">Por favor, verifica la URL o regresa a la página de inicio.</p>
        </div>
    );
};

export default Error404;
import React from 'react';
import { Link } from 'react-router-dom';

const PantallaInicial = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white text-center">
                Bienvenido al sistema de gestion de tesis de la UCAB
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 text-center">
                Por favor, selecciona una opción para continuar:
            </p>

            <div className="flex space-x-4">
                <Link to="/registro_usuario" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Registro de Usuario
                </Link>

                <Link to="/inicio_sesion" className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
                    Inicio de Sesión
                </Link>
            </div>
        </div>
    );
};

export default PantallaInicial;
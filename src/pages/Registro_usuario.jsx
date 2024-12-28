import React from 'react';
import { Link } from 'react-router-dom';

const Registro_usuario = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Registro de Usuario</h1>
            <form className="w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="cedula" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Cédula:</label>
                    <input type="text" id="cedula" name="cedula" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="apellido" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Contraseña:</label>
                    <input type="password" id="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Registro_usuario;
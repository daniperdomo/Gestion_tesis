import React from 'react';
import { useParams } from 'react-router-dom';
import Error404 from '../pages/Error404';

const RegisterForm = () => {
    const { type } = useParams();
    const forms = ['tesista', 'profesor', 'tutor-empresarial', 'especialidad', 'consejo-escuela', 'propuesta'];
    const isValidType = forms.includes(type);

    return (
        <>
            {isValidType ? (
                <div className="container mx-auto p-4">
                    <h1 className="text-center text-2xl font-bold mb-6">Registro para: {type}</h1>
                    <p className="text-center">Formulario para registrar un {type}.</p>
                </div>
            ) : (
                <Error404 />
            )}
        </>
    );
};

export default RegisterForm;
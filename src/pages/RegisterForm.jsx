import React from 'react';
import { useParams } from 'react-router-dom';
import Error404 from './Error404';
import TesistaForm from '../components/tesistaForm'; 
import ProfesorForm from '../components/profesorForm'; 
import TutorEmpresarialForm from '../components/tutorEmpresarialForm'; 
import ConsejoEscuelaForm from '../components/consejoEscuelaForm'; 
import PropuestaForm from '../components/propuestaForm'; 
import EspecialidadForm from '../components/especialidadForm'; 

const RegisterForm = () => {
    const { type } = useParams();
    const forms = [
        { type: 'tesista', comp: <TesistaForm /> },
        { type: 'profesor', comp: <ProfesorForm /> },
        { type: 'tutor-empresarial', comp: <TutorEmpresarialForm /> },
        { type: 'consejo-escuela', comp: <ConsejoEscuelaForm /> },
        { type: 'propuesta', comp: <PropuestaForm /> },
        { type: 'especialidad', comp: <EspecialidadForm /> },
    ];

    const formToRender = forms.find(form => form.type === type);

    return (
        <>
            {formToRender ? (
                <div className="container mx-auto p-4">
                    <h1 className="text-center text-2xl font-bold mb-6">Registro para: {type}</h1>
                    {formToRender.comp}
                </div>
            ) : (
                <Error404 />
            )}
        </>
    );
};

export default RegisterForm;
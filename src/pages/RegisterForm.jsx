import React from 'react';
import { useParams } from 'react-router-dom';
import Error404 from './Error404';
import TesistaForm from '../components/tesistaForm'; 
import ProfesorForm from '../components/profesorForm'; 
import TutorEmpresarialForm from '../components/TutorEmpresarialForm'; 
import ConsejoEscuelaForm from '../components/consejoEscuelaForm'; 
import PropuestaForm from '../components/PropuestaForm'; 
import EspecialidadForm from '../components/especialidadForm'; 
import Header from '../components/header';
import Footer from '../components/footer';
import ProponenForm from '../components/ProponenForm';
import SeEspecializaForm from '../components/SeEspecializaForm';
import EsJuradoForm from '../components/EsJuradoForm';


const RegisterForm = () => {
    const { type } = useParams();
    const forms = [
        { type: 'tesista', comp: <TesistaForm /> },
        { type: 'profesor', comp: <ProfesorForm /> },
        { type: 'tutor-empresarial', comp: <TutorEmpresarialForm /> },
        { type: 'consejo-escuela', comp: <ConsejoEscuelaForm /> },
        { type: 'propuesta', comp: <PropuestaForm /> },
        { type: 'proponen', comp: <ProponenForm /> },
        { type: 'especializa', comp: <SeEspecializaForm /> },
        { type: 'jurado', comp: <EsJuradoForm /> },
    ];

    const formToRender = forms.find(form => form.type === type);

    return (
        <>
            <Header/>
            {formToRender ? (
                <div className="container mx-auto p-4">
                    <h1 className="text-center text-2xl font-bold mb-6">Registro para: {type}</h1>
                    {formToRender.comp}
                </div>
            ) : (
                <Error404 />
            )}
            <Footer/>
        </>
    );
};

export default RegisterForm;
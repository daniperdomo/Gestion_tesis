import React, { useState } from 'react';
import '../styles/estiloForm.css';

const TutorEmpresarialForm = () => {
    const [cedulaTutorEmp, setCedulaTutorEmp] = useState('');
    const [nombreTutorEmp, setNombreTutorEmp] = useState('');
    const [telefono, setTelefono] = useState('');
    const [empresa, setEmpresa] = useState('');

    const handleCedulaChange = (e) => {
        setCedulaTutorEmp(e.target.value);
    };

    const handleNombreChange = (e) => {
        setNombreTutorEmp(e.target.value);
    };

    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
    };

    const handleEmpresaChange = (e) => {
        setEmpresa(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Cédula del Tutor Empresarial:
                </label>
                <input 
                    type="text" 
                    value={cedulaTutorEmp} 
                    onChange={handleCedulaChange} 
                    className="form-input" 
                    maxLength={10}
                />
                <label className="form-label">
                    Nombre del Tutor Empresarial:
                </label>
                <input 
                    type="text" 
                    value={nombreTutorEmp} 
                    onChange={handleNombreChange} 
                    className="form-input" 
                    maxLength={70}
                />
                <label className="form-label">
                    Teléfono:
                </label>
                <input 
                    type="text" 
                    value={telefono} 
                    onChange={handleTelefonoChange} 
                    className="form-input" 
                    maxLength={20}
                />
                <label className="form-label">
                    Empresa:
                </label>
                <input 
                    type="text" 
                    value={empresa} 
                    onChange={handleEmpresaChange} 
                    className="form-input" 
                    maxLength={30}
                />
                <button type="submit" className="form-button">
                    Registrar Tutor Empresarial
                </button>
            </form>
        </div>
    );
};

export default TutorEmpresarialForm;
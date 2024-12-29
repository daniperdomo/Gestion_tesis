import React, { useState } from 'react';
import '../styles/estiloForm.css';

const TutorEmpresarialForm = () => {
    const [cedula_tutorEmp, setCedula_tutorEmp] = useState('');
    const [nombre_tutorEmp, setNombre_tutorEmp] = useState('');
    const [telefono, setTelefono] = useState('');
    const [empresa, setEmpresa] = useState('');

    const handleCedula_tutorEmpChange = (e) => {
        setCedula_tutorEmp(e.target.value);
    };

    const handleNombre_tutorEmpChange = (e) => {
        setNombre_tutorEmp(e.target.value);
    };

    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
    };

    const handleEmpresaChange = (e) => {
        setEmpresa(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/api/tutor_emp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({cedula_tutorEmp, nombre_tutorEmp, telefono, empresa})
            })

            if(response.ok){
                const message = await response.text();
                console.log(message);
                setCedula_tutorEmp('')
                setNombre_tutorEmp('')
                setEmpresa('')
                setTelefono('')
            } else {
                console.error('Error al registrar al tutor empresarial');
            }

        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Cédula del Tutor Empresarial:
                </label>
                <input 
                    type="text" 
                    value={cedula_tutorEmp} 
                    onChange={handleCedula_tutorEmpChange} 
                    className="form-input" 
                    maxLength={10}
                />
                <label className="form-label">
                    Nombre del Tutor Empresarial:
                </label>
                <input 
                    type="text" 
                    value={nombre_tutorEmp} 
                    onChange={handleNombre_tutorEmpChange} 
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
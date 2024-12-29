import React, { useState } from 'react';
import '../styles/estiloForm.css';

const ProfesorForm = () => {
    const [cedula_profesor, setCedula_profesor] = useState('');
    const [nombre_profesor, setNombre_profesor] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipoProfesor, setTipoProfesor] = useState('interno');
    const [infoAdicional, setInfoAdicional] = useState('');

    const handleCedula_profesorChange = (e) => {
        setCedula(e.target.value);
    };

    const handleNombre_profesorChange = (e) => {
        setNombre(e.target.value);
    };

    const handleCorreoChange = (e) => {
        setCorreo(e.target.value);
    };

    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
    };

    const handleTipoProfesorChange = (e) => {
        setTipoProfesor(e.target.value);
    };

    const handleInfoAdicionalChange = (e) => {
        setInfoAdicional(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Cédula:
                    <input type="text" value={cedula_profesor} onChange={handleCedula_profesorChange} className="form-input" maxLength={10}/>
                </label>
                <label className="form-label">
                    Nombre:
                    <input type="text" value={nombre_profesor} onChange={handleNombre_profesorChange} className="form-input" maxLength={70}/>
                </label>
                <label className="form-label">
                    Correo:
                    <input type="text" value={correo} onChange={handleCorreoChange} className="form-input" maxLength={30}/>
                </label>
                <label className="form-label">
                    Teléfono:
                    <input type="text" value={telefono} onChange={handleTelefonoChange} className="form-input" maxLength={20}/>
                </label>
                <label className="form-label">
                    Tipo de Profesor:
                    <select value={tipoProfesor} onChange={handleTipoProfesorChange} className="form-input">
                        <option value="interno">Profesor Interno</option>
                        <option value="externo">Profesor Externo</option>
                    </select>
                </label>
                {tipoProfesor === 'interno' ? (
                    <label className="form-label">
                        Dirección:
                        <input type="text" value={infoAdicional} onChange={handleInfoAdicionalChange} className="form-input" maxLength={50}/>
                    </label>
                ) : (
                    <label className="form-label">
                        Nombre de Institución:
                        <input type="text" value={infoAdicional} onChange={handleInfoAdicionalChange} className="form-input" maxLength={30}/>
                    </label>
                )}
                <button type="submit" className="form-button">
                    Registrar Especialidad
                </button>
            </form>
        </div>
    );
};


export default ProfesorForm;
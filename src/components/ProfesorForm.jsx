import React, { useState } from 'react';
import '../styles/estiloForm.css';

const ProfesorForm = () => {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipoProfesor, setTipoProfesor] = useState('interno');
    const [infoAdicional, setInfoAdicional] = useState('');

    const handleCedulaChange = (e) => {
        setCedula(e.target.value);
    };

    const handleNombreChange = (e) => {
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
        console.log('Cédula:', cedula);
        console.log('Nombre:', nombre);
        console.log('Correo:', correo);
        console.log('Teléfono:', telefono);
        console.log('Tipo de Profesor:', tipoProfesor);
        console.log('Información Adicional:', infoAdicional);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Cédula:
                    <input type="text" value={cedula} onChange={handleCedulaChange} className="form-input" />
                </label>
                <label className="form-label">
                    Nombre:
                    <input type="text" value={nombre} onChange={handleNombreChange} className="form-input" />
                </label>
                <label className="form-label">
                    Correo:
                    <input type="email" value={correo} onChange={handleCorreoChange} className="form-input" />
                </label>
                <label className="form-label">
                    Teléfono:
                    <input type="tel" value={telefono} onChange={handleTelefonoChange} className="form-input" />
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
                        <input type="text" value={infoAdicional} onChange={handleInfoAdicionalChange} className="form-input" />
                    </label>
                ) : (
                    <label className="form-label">
                        Nombre de Institución:
                        <input type="text" value={infoAdicional} onChange={handleInfoAdicionalChange} className="form-input" />
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
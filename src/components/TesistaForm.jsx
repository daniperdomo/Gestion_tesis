import React, { useState } from 'react';
import '../styles/estiloForm.css';

const TesistaForm = () => {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correoUCAB, setCorreoUCAB] = useState('');
    const [correoParticular, setCorreoParticular] = useState('');

    const handleCedulaChange = (e) => {
        setCedula(e.target.value);
    };

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
    };

    const handleCorreoUCABChange = (e) => {
        setCorreoUCAB(e.target.value);
    };

    const handleCorreoParticularChange = (e) => {
        setCorreoParticular(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Cédula:', cedula);
        console.log('Nombre:', nombre);
        console.log('Teléfono:', telefono);
        console.log('Correo UCAB:', correoUCAB);
        console.log('Correo Particular:', correoParticular);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Cédula:
                    <input type="text" value={cedula} onChange={handleCedulaChange} className="form-input" maxLength={10}/>
                </label>
                <label className="form-label">
                    Nombre:
                    <input type="text" value={nombre} onChange={handleNombreChange} className="form-input" maxLength={70}/>
                </label>
                <label className="form-label">
                    Teléfono:
                    <input type="text" value={telefono} onChange={handleTelefonoChange} className="form-input" maxLength={20}/>
                </label>
                <label className="form-label">
                    Correo UCAB:
                    <input type="text" value={correoUCAB} onChange={handleCorreoUCABChange} className="form-input" maxLength={30}/>
                </label>
                <label className="form-label">
                    Correo Particular:
                    <input type="text" value={correoParticular} onChange={handleCorreoParticularChange} className="form-input" maxLength={30}/>
                </label>
                <button type="submit" className="form-button">
                    Registrar Tesista
                </button>
            </form>
        </div>
    );
};

export default TesistaForm;
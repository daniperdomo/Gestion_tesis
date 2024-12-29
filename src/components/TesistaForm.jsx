import React, { useState } from 'react';
import '../styles/estiloForm.css';

const TesistaForm = () => {
    const [cedula_tesista, setCedula_tesista] = useState('');
    const [nombre_tesista, setNombre_tesista] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo_UCAB, setCorreo_UCAB] = useState('');
    const [correo_Particular, setCorreo_Particular] = useState('');

    const handleCedula_tesistaChange = (e) => {
        setCedula_tesista(e.target.value);
    };

    const handleNombre_tesistaChange = (e) => {
        setNombre_tesista(e.target.value);
    };

    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
    };

    const handleCorreo_UCABChange = (e) => {
        setCorreo_UCAB(e.target.value);
    };

    const handleCorreo_ParticularChange = (e) => {
        setCorreo_Particular(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/api/tesista', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({cedula_tesista, nombre_tesista, telefono, correo_UCAB, correo_Particular})
            })

            if(response.ok){
                const message = await response.text();
                console.log(message);
                setCedula_tesista('')
                setCorreo_Particular('')
                setCorreo_UCAB('')
                setTelefono('')
                setNombre_tesista('')
            }

        } catch (error) {
            
        }
        
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Cédula:
                    <input type="text" value={cedula_tesista} onChange={handleCedula_tesistaChange} className="form-input" maxLength={10}/>
                </label>
                <label className="form-label">
                    Nombre:
                    <input type="text" value={nombre_tesista} onChange={handleNombre_tesistaChange} className="form-input" maxLength={70}/>
                </label>
                <label className="form-label">
                    Teléfono:
                    <input type="text" value={telefono} onChange={handleTelefonoChange} className="form-input" maxLength={20}/>
                </label>
                <label className="form-label">
                    Correo UCAB:
                    <input type="text" value={correo_UCAB} onChange={handleCorreo_UCABChange} className="form-input" maxLength={30}/>
                </label>
                <label className="form-label">
                    Correo Particular:
                    <input type="text" value={correo_Particular} onChange={handleCorreo_ParticularChange} className="form-input" maxLength={30}/>
                </label>
                <button type="submit" className="form-button">
                    Registrar Tesista
                </button>
            </form>
        </div>
    );
};

export default TesistaForm;
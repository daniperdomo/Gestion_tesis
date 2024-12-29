import React, { useState } from 'react';
import '../styles/estiloForm.css';

const EspecialidadForm = () => {
    const [nombre_esp, setNombre_esp] = useState('');

    const handleNombre_espChange = (e) => {
        setNombre_esp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Enviar la solicitud POST al servidor
        try {
            const response = await fetch('http://localhost:8081/api/especialidad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre_esp: nombre_esp }),
            });

            if (response.ok) {
                const message = await response.text();
                console.log(message); 
                setNombre_esp(''); 
            } else {
                console.error('Error al registrar la especialidad');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className="form-container">
            <form className="form" action='/api/especialidad' method='post' onSubmit={handleSubmit}>
                <label className="form-label">
                    Nombre de la especialidad:
                </label>
                <input 
                    type="text" 
                    value={nombre_esp} 
                    onChange={handleNombre_espChange} 
                    className="form-input"
                    maxLength={30} 
                />
                <button type="submit" className="form-button">
                    Registrar Especialidad
                </button>
            </form>
        </div>
    );
};

export default EspecialidadForm;
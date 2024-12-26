import React, { useState } from 'react';
import '../styles/estiloForm.css';

const EspecialidadForm = () => {
    // Estado para almacenar el valor del nombre de la especialidad
    const [nombre, setNombre] = useState('');

    // Función para manejar cambios en el campo del nombre
    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes implementar la lógica para enviar el nombre de la especialidad
        console.log(nombre);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Nombre de la especialidad:
                </label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={handleNombreChange} 
                    className="form-input" 
                />
                <button type="submit" className="form-button">
                    Registrar Especialidad
                </button>
            </form>
        </div>
    );
};

export default EspecialidadForm;
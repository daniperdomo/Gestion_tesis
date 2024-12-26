// EspecialidadForm.jsx
import React, { useState } from 'react';

const Especialidad = () => {
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
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de la especialidad:
                <input type="text" value={nombre} onChange={handleNombreChange} />
            </label>
            <br />
            <button type="submit">Registrar Especialidad</button>
        </form>
    );
};

export default Especialidad;
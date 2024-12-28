import React, { useState } from 'react';
import '../styles/estiloForm.css';

const ConsejoEscuelaForm = () => {
    // Estado para almacenar el número de consejo y la fecha
    const [nroConsejo, setNroConsejo] = useState('');
    const [date, setDate] = useState('');

    // Función para manejar el cambio en el campo del número de consejo
    const handleNroConsejoChange = (e) => {
        setNroConsejo(e.target.value);
    };

    // Función para manejar el cambio en el campo de la fecha
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes implementar la lógica para enviar los datos
        console.log('Número de Consejo:', nroConsejo);
        console.log('Fecha de Consejo:', date);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Número de Consejo:
                </label>
                <input 
                    type="text" 
                    value={nroConsejo} 
                    onChange={handleNroConsejoChange} 
                    className="form-input" 
                    maxLength={30}
                />
                <label className="form-label">
                    Fecha de Consejo:
                </label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={handleDateChange} 
                    className="form-input" 
                />
                <button type="submit" className="form-button">
                    Registrar Consejo Escuela
                </button>
            </form>
        </div>
    );
};

export default ConsejoEscuelaForm;
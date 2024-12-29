import React, { useState } from 'react';
import '../styles/estiloForm.css';

const ConsejoEscuelaForm = () => {
    // Estado para almacenar el número de consejo y la fecha
    const [nro_Consejo, setNro_Consejo] = useState('');
    const [fecha_consejo, setFecha_consejo] = useState('');

    // Función para manejar el cambio en el campo del número de consejo
    const handleNro_ConsejoChange = (e) => {
        setNro_Consejo(e.target.value);
    };

    // Función para manejar el cambio en el campo de la fecha
    const handleFecha_consejoChange = (e) => {
        setFecha_consejo(e.target.value);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/api/consejo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nro_Consejo, fecha_consejo }),
            });

            if (response.ok) {
                const message = await response.text();
                console.log(message);
                setNro_Consejo('');
                setFecha_consejo('');
            } else {
                console.error('Error registering Consejo Escuela');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="form-container">
            <form className="form" action='/api/consejo' method='post' onSubmit={handleSubmit}>
                <label className="form-label">
                    Número de Consejo:
                </label>
                <input 
                    type="text" 
                    value={nro_Consejo} 
                    onChange={handleNro_ConsejoChange} 
                    className="form-input" 
                    maxLength={30}
                />
                <label className="form-label">
                    Fecha de Consejo:
                </label>
                <input 
                    type="date" 
                    value={fecha_consejo} 
                    onChange={handleFecha_consejoChange} 
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
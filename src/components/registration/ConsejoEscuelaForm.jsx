import React, { useState } from 'react';
import '../../styles/estiloForm.css'

const ConsejoEscuelaForm = () => {
    const [nro_Consejo, setNro_Consejo] = useState('')
    const [fecha_consejo, setFecha_consejo] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleNro_ConsejoChange = (e) => {
        setNro_Consejo(e.target.value);
    };

    const handleFecha_consejoChange = (e) => {
        setFecha_consejo(e.target.value);
    };

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
                setModalMessage('¡Consejo registrado con éxito!');
                setIsSuccess(true);
                setNro_Consejo('');
                setFecha_consejo('');
            } else {
                console.error('Error registering Consejo Escuela');
                setModalMessage('Error al registrar el consejo. Inténtalo de nuevo.');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Network error:', error);
        } finally {
            setModalVisible(true)
        }
    };

    const closeModal = () => {
        setModalVisible(false);
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
                    required
                />
                <label className="form-label">
                    Fecha de Consejo:
                </label>
                <input 
                    type="date" 
                    value={fecha_consejo} 
                    onChange={handleFecha_consejoChange} 
                    className="form-input" 
                    required
                />
                <button type="submit" className="form-button">
                    Registrar Consejo Escuela
                </button>
            </form>
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p style={{ color: isSuccess ? 'green' : 'red' }}>{modalMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsejoEscuelaForm;
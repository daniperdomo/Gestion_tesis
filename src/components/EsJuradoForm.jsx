import React, { useEffect, useState } from 'react';
import '../styles/estiloForm.css';

const EsJuradoForm = () => {
    const [profesores, setProfesores] = useState([]);
    const [propuestas, setPropuestas] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState('');
    const [selectedPropuesta, setSelectedPropuesta] = useState('');

    useEffect(() => {
        // Fetch profesores
        fetch('http://localhost:8081/api/profesores')
            .then(response => response.json())
            .then(data => setProfesores(data))
            .catch(error => console.error('Error fetching profesores:', error));

        // Fetch propuestas
        fetch('http://localhost:8081/api/propuestas')
            .then(response => response.json())
            .then(data => setPropuestas(data))
            .catch(error => console.error('Error fetching propuestas:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            codigo_prop: selectedPropuesta,
            cedula_profesor: selectedProfesor,
        };

        fetch('http://localhost:8081/api/es_jurado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                alert('Datos registrados exitosamente');
                setSelectedProfesor('');
                setSelectedPropuesta('');
            } else {
                alert('Error al registrar los datos');
            }
        })
        .catch(error => console.error('Error submitting form:', error));
    };

    return (
        <div className="form-container">
            <h2>Jurado</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">Profesor:</label>
                <select
                    className="form-input"
                    value={selectedProfesor}
                    onChange={(e) => setSelectedProfesor(e.target.value)}
                    required
                >
                    <option value="">Seleccione un profesor</option>
                    {profesores.map(profesor => (
                        <option key={profesor.cedula_profesor} value={profesor.cedula_profesor}>
                            {profesor.nombre_profesor}
                        </option>
                    ))}
                </select>

                <label className="form-label">Propuesta:</label>
                <select
                    className="form-input"
                    value={selectedPropuesta}
                    onChange={(e) => setSelectedPropuesta(e.target.value)}
                    required
                >
                    <option value="">Seleccione una propuesta</option>
                    {propuestas.map(propuesta => (
                        <option key={propuesta.codigo_prop} value={propuesta.codigo_prop}>
                            {propuesta.titulo}
                        </option>
                    ))}
                </select>

                <button type="submit" className="form-button">Registrar</button>
            </form>
        </div>
    );
};

export default EsJuradoForm;
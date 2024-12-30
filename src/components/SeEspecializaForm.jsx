import React, { useEffect, useState } from 'react';
import '../styles/estiloForm.css';

const SeEspecializaForm = () => {
    const [profesores, setProfesores] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState('');
    const [selectedEspecialidad, setSelectedEspecialidad] = useState('');

    useEffect(() => {
        // Fetch profesores
        fetch('http://localhost:8081/api/profesores')
            .then(response => response.json())
            .then(data => setProfesores(data))
            .catch(error => console.error('Error fetching profesores:', error));

        // Fetch especialidades
        fetch('http://localhost:8081/api/especialidades')
            .then(response => response.json())
            .then(data => setEspecialidades(data))
            .catch(error => console.error('Error fetching especialidades:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            cedula_profesor: selectedProfesor,
            codigo_esp: selectedEspecialidad,
        };

        fetch('http://localhost:8081/api/se_especializa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                console.log('Datos registrados exitosamente');
                setSelectedProfesor('');
                setSelectedEspecialidad('');
            } else {
                console.log('Error al registrar los datos');
            }
        })
        .catch(error => console.error('Error submitting form:', error));
    };

    return (
        <div className="form-container">
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

                <label className="form-label">Especialidad:</label>
                <select
                    className="form-input"
                    value={selectedEspecialidad}
                    onChange={(e) => setSelectedEspecialidad(e.target.value)}
                    required
                >
                    <option value="">Seleccione una especialidad</option>
                    {especialidades.map(especialidad => (
                        <option key={especialidad.codigo_esp} value={especialidad.codigo_esp}>
                            {especialidad.nombre_esp}
                        </option>
                    ))}
                </select>

                <button type="submit" className="form-button">Registrar</button>
            </form>
        </div>
    );
};

export default SeEspecializaForm;
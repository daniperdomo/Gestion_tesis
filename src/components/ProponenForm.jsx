import React, {useEffect, useState} from 'react';
import '../styles/estiloForm.css'

const ProponenForm = () => {
    const [tesistas, setTesistas] = useState([])
    const [propuestas, setPropuestas] = useState([])
    const [selectedTesista, setSelectedTesista] = useState('')
    const [selectedPropuesta, setSelectedPropuesta] = useState('')

    useEffect(() => {
        fetch('http://localhost:8081/api/tesistas')
            .then(response => response.json())
            .then(data => setTesistas(data))
            .catch(error => console.error('Error fetching tesistas:', error));

        fetch('http://localhost:8081/api/propuestas')
            .then(response => response.json())
            .then(data => setPropuestas(data))
            .catch(error => console.error('Error fetching propuestas:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            codigo_prop: selectedPropuesta,
            cedula_tesista: selectedTesista,
        };

        fetch('http://localhost:8081/api/proponen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                console.log('Datos registrados exitosamente');
                setSelectedTesista('');
                setSelectedPropuesta('');
            } else {
                console.log('Error al registrar los datos');
            }
        })
        .catch(error => console.error('Error submitting form:', error));
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">Tesista:</label>
                <select
                    className="form-input"
                    value={selectedTesista}
                    onChange={(e) => setSelectedTesista(e.target.value)}
                    required
                >
                    <option value="">Seleccione un tesista</option>
                    {tesistas.map(tesista => (
                        <option key={tesista.cedula_tesista} value={tesista.cedula_tesista}>
                            {tesista.nombre_tesista}
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

export default ProponenForm;
import React, { useEffect, useState } from 'react';
import '../../styles/estiloForm.css';

const EvaluacionInsForm = () => {
    const [propuestas, setPropuestas] = useState([]);
    const [codigo_prop, setCodigo_prop] = useState('');
    const [criterios, setCriterios] = useState([]);
    const [tesistas, setTesistas] = useState([]);
    const [jurados, setJurados] = useState([]);
    const [jurado, setJurado] = useState('');
    const [notas, setNotas] = useState({});   
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); 

    useEffect(() => {
        fetch('http://localhost:8081/api/propuestas/ins')
            .then(response => response.json())
            .then(data => setPropuestas(data))
            .catch(error => console.error('Error fetching propuestas:', error));

        fetch('http://localhost:8081/api/criterios_evaluacion/ins')
            .then(response => response.json())
            .then(data => setCriterios(data))
            .catch(error => console.error('Error fetching criterios:', error));
    }, []);

    const handleSelectPropuesta = (codigoProp) => {
        setCodigo_prop(codigoProp);

        fetch(`http://localhost:8081/api/propuestas/${codigoProp}/tesistas`)
            .then(response => response.json())
            .then(data => {
                setTesistas(data);
                // Inicializa las notas para cada criterio
                const initialNotas = {};
                data.forEach(tesista => {
                    initialNotas[tesista.cedula_tesista] = {};
                });
                setNotas(initialNotas);
            })
            .catch(error => console.error('Error fetching tesistas:', error));

        fetch(`http://localhost:8081/api/es_jurado/${codigoProp}`)
            .then(response => response.json())
            .then(data => setJurados(data))
            .catch(error => console.error('Error fetching jurados:', error));
    };

    const handleNotaChange = (codigoCe, value) => {
        // Actualiza la nota para el criterio seleccionado, aplicándola a todos los tesistas
        setNotas(prevNotas => {
            const updatedNotas = { ...prevNotas };
            tesistas.forEach(tesista => {
                updatedNotas[tesista.cedula_tesista][codigoCe] = value;
            });
            return updatedNotas;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
    
        const evaluaciones = [];
    
        tesistas.forEach(tesista => {
            criterios.forEach(criterio => {
                evaluaciones.push({
                    codigo_prop,
                    cedula_tesista: tesista.cedula_tesista,
                    cedula_jurado: jurado,
                    codigo_ce: criterio.codigo_ce,
                    nota: notas[tesista.cedula_tesista][criterio.codigo_ce] ?? 0 // Usa la nota seleccionada o 0 si no hay
                });
            });
        });
    
        console.log(evaluaciones);
    
        try {
            const response = await fetch('http://localhost:8081/api/evaluacion_tesista', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(evaluaciones),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text(); // Obtener el mensaje de error del servidor
                setModalMessage(`Error al registrar la evaluación: ${errorMessage}`);
                setIsSuccess(false);
                throw new Error('Error al registrar evaluaciones');
            }
    
            const result = await response.json();
            setModalMessage('¡Evaluación registrada con éxito!');
            setIsSuccess(true);
            console.log(result.message); // Mensaje de éxito
        } catch (error) {
            console.error('Error al enviar evaluaciones:', error);
            setModalMessage('Ocurrió un error al enviar las evaluaciones.'); // Mensaje de error genérico
            setIsSuccess(false);
        } finally {
            setModalVisible(true); // Mostrar el modal
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    
    return (
        <div className='form-container'>
            {codigo_prop ? (
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label">Jurado</label>
                        <select className="form-input" value={jurado} onChange={(e) => setJurado(e.target.value)} required>
                            <option value="">Selecciona un jurado</option>
                            {jurados.map(jurado => (
                                <option key={jurado.cedula_profesor} value={jurado.cedula_profesor}>
                                    {`${jurado.cedula_profesor} - ${jurado.nombre_profesor}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <div>
                        <label className="form-label">Datos Tesista:</label>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Cédula</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tesistas.map(tesista => (
                                    <tr key={tesista.cedula_tesista}>
                                        <td>{tesista.cedula_tesista}</td>
                                        <td>{tesista.nombre_tesista}</td>
                                        <td>{tesista.telefono}</td>
                                        <td>{tesista.correo_ucab}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div>
                        <label className="form-label">Criterios Generales</label>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Criterio</th>
                                    <th>Puntaje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {criterios.map(criterio => (
                                    <tr key={criterio.codigo_ce}>
                                        <td>{criterio.nombre_ce}</td>
                                        <td>
                                            <select 
                                                value={notas[tesistas[0]?.cedula_tesista]?.[criterio.codigo_ce] ?? 0} 
                                                onChange={(e) => handleNotaChange(criterio.codigo_ce, e.target.value)}
                                            >
                                                {[...Array(criterio.puntaje_max + 1).keys()].map(puntaje => (
                                                    <option key={puntaje} value={puntaje}>
                                                        {puntaje}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <button className="form-button" type="submit">Registrar Evaluación</button>
                </form>
            ) : (
                <form className="form">
                    <div>
                        <label className="form-label">Propuesta</label>
                        <select className="form-input" value={codigo_prop} onChange={(e) => handleSelectPropuesta(e.target.value)}>
                            <option value="">Selecciona una propuesta</option>
                            {propuestas.map(propuesta => (
                                <option key={propuesta.codigo_prop} value={propuesta.codigo_prop}>
                                    {`${propuesta.codigo_prop} - ${propuesta.titulo}`}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            )}
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

export default EvaluacionInsForm;
import React, { useEffect, useState } from 'react';
import '../../styles/estiloForm.css';

const RevisionInsForm = () => {
    const [propuestas, setPropuestas] = useState([]);
    const [codigo_prop, setCodigo_prop] = useState('');
    const [tesistas, setTesistas] = useState([]);
    const [profesorR, setProfesorR] = useState(null);
    const [profesorT, setProfesorT] = useState(null);
    const [criterios, setCriterios] = useState([]);
    const [evaluaciones, setEvaluaciones] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8081/api/propuestas/ins')
            .then(response => response.json())
            .then(data => setPropuestas(data))
            .catch(error => console.error('Error fetching propuestas:', error));

        fetch('http://localhost:8081/api/criterios_revision/ins')
            .then(response => response.json())
            .then(data => setCriterios(data))
            .catch(error => console.error('Error fetching criterios:', error));
    }, []);

    const handleSelectPropuesta = (codigoProp) => {
        setCodigo_prop(codigoProp);

        fetch(`http://localhost:8081/api/propuestas/${codigoProp}/tesistas`)
            .then(response => response.json())
            .then(data => setTesistas(data))
            .catch(error => console.error('Error fetching tesistas:', error));

        fetch(`http://localhost:8081/api/propuestas/${codigoProp}/profesorR`)
            .then(response => response.json())
            .then(data => setProfesorR(data[0]))
            .catch(error => console.error('Error fetching profesorR:', error));

        fetch(`http://localhost:8081/api/propuestas/${codigoProp}/profesorT`)
            .then(response => response.json())
            .then(data => setProfesorT(data[0]))
            .catch(error => console.error('Error fetching profesorT:', error));
    };

    const handleEvaluacionChange = (codigo_cr, value) => {

        setEvaluaciones(prevEvaluaciones => ({
            ...prevEvaluaciones,
            [codigo_cr]: value
        }));
    };

    const handleSubmitEvaluacion = async (e) => {
        e.preventDefault();

        const evaluacionesArray = Object.entries(evaluaciones).map(([codigo_cr, evaluacion]) => ({
            codigo_prop,
            codigo_cr: parseInt(codigo_cr, 10),
            nota: evaluacion
        }));

        try {
            const response = await fetch('http://localhost:8081/api/evaluacion/prop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(evaluacionesArray),
            });

            if (response.ok) {
                setModalMessage('¡Revisión registrada con éxito!');
                setIsSuccess(true);
                const result = await response.json();
                console.log('Evaluaciones registradas:', result);
            } else {
                const errorData = await response.json();
                console.error('Error al registrar las evaluaciones:', errorData);
                setModalMessage('Error al registrar la revisión. Inténtalo de nuevo.');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
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
                <form className="form" onSubmit={handleSubmitEvaluacion}>
                    <div>
                        <label className="form-label">Tema Propuesto</label>
                        <input type="text" className="form-input" value={codigo_prop} readOnly />
                    </div>
                    <div>
                        <label className="form-label">Organización donde se desarrollará el T. E. G.</label>
                        <input type="text" className="form-input" />
                    </div>
                    <div>
                        <label className="form-label">Criterios de Evaluación</label>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Criterio</th>
                                    <th>Evaluación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {criterios.map(criterio => (
                                    <tr key={criterio.codigo_cr}>
                                        <td>{criterio.nombre_cr}</td>
                                        <td>
                                            <select onChange={(e) => handleEvaluacionChange(criterio.codigo_cr, e.target.value)}>
                                                <option value="">Selecciona una opción</option>
                                                <option value="1">Aprobado</option>
                                                <option value="0">Reprobado</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                        <label className="form-label">Datos Profesor Responsable:</label>
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
                                {profesorR ? (
                                    <tr key={profesorR.cedula_profesor}>
                                        <td>{profesorR.cedula_profesor}</td>
                                        <td>{profesorR.nombre_profesor}</td>
                                        <td>{profesorR.telefono}</td>
                                        <td>{profesorR.correo}</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="4">No hay datos del profesor responsable disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div>
                        <label className="form-label">Datos Tutor:</label>
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
                                {profesorT ? (
                                    <tr key={profesorT.cedula_profesor}>
                                        <td>{profesorT.cedula_profesor}</td>
                                        <td>{profesorT.nombre_profesor}</td>
                                        <td>{profesorT.telefono}</td>
                                        <td>{profesorT.correo}</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="4">No hay datos del tutor disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <button className="form-button" type="submit">Registrar Revisión</button>
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

export default RevisionInsForm;
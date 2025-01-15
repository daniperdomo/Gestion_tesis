import React, { useEffect, useState } from 'react';
import '../../styles/estiloForm.css';

const EvaluacionExpForm = () => {
    const [propuestas, setPropuestas] = useState([]);
    const [codigo_prop, setCodigo_prop] = useState('');
    const [criterios, setCriterios] = useState([]);
    const [tesistas, setTesistas] = useState([]);
    const [jurados, setJurados] = useState([]);
    const [jurado, setJurado] = useState('');
    const [notasGenerales, setNotasGenerales] = useState({});
    const [notasTesistas, setNotasTesistas] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8081/api/propuestas/exp')
            .then(response => response.json())
            .then(data => setPropuestas(data))
            .catch(error => console.error('Error fetching propuestas:', error));

        fetch('http://localhost:8081/api/criterios_evaluacion/exp')
            .then(response => response.json())
            .then(data => setCriterios(data))
            .catch(error => console.error('Error fetching criterios:', error));
    }, []);

    const handleSelectPropuesta = (codigoProp) => {
        setCodigo_prop(codigoProp);
        setJurado(''); 

        fetch(`http://localhost:8081/api/propuestas/${codigoProp}/tesistas`)
            .then(response => response.json())
            .then(data => setTesistas(data))
            .catch(error => console.error('Error fetching tesistas:', error));

        fetch(`http://localhost:8081/api/es_jurado/${codigoProp}`)
            .then(response => response.json())
            .then(data => setJurados(data))
            .catch(error => console.error('Error fetching jurados:', error));
    };

    const criteriosFiltrados = criterios.filter(criterio => 
        [23, 24, 25].includes(criterio.codigo_ce)
    );

    const criteriosGenerales = criterios.filter(criterio => 
        ![23, 24, 25].includes(criterio.codigo_ce)
    );

    const handleNotaGeneralChange = (codigo_ce, value) => {
        setNotasGenerales(prev => ({ ...prev, [codigo_ce]: parseInt(value) }));
    };
    
    const handleNotaTesistaChange = (cedula_tesista, codigo_ce, value) => {
        setNotasTesistas(prev => ({
            ...prev,
            [cedula_tesista]: {
                ...prev[cedula_tesista],
                [codigo_ce]: parseInt(value)
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const evaluaciones = [];
    
        // Agregar evaluaciones para criterios generales
        criteriosGenerales.forEach(criterio => {
            const notaGeneral = notasGenerales[criterio.codigo_ce] !== undefined ? notasGenerales[criterio.codigo_ce] : 0; 
            tesistas.forEach(tesista => {
                evaluaciones.push({
                    codigo_prop,
                    cedula_tesista: tesista.cedula_tesista,
                    cedula_jurado: jurado,
                    codigo_ce: criterio.codigo_ce,
                    nota: notaGeneral 
                });
            });
        });
    
        // Agregar evaluaciones para criterios específicos de cada tesista
        Object.keys(notasTesistas).forEach(cedula_tesista => {
            const notas = notasTesistas[cedula_tesista];
            Object.keys(notas).forEach(codigo_ce => {
                evaluaciones.push({
                    codigo_prop,
                    cedula_tesista,
                    cedula_jurado: jurado,
                    codigo_ce: parseInt(codigo_ce),
                    nota: notas[codigo_ce] !== undefined ? notas[codigo_ce] : 0 
                });
            });
        });
    
        console.log('Evaluaciones:', evaluaciones);
    
        fetch('http://localhost:8081/api/evaluacion_tesista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(evaluaciones)
        })
            .then(response => {
                if (!response.ok) {
                    setModalMessage('Error al registrar la evaluación. Inténtalo de nuevo.');
                    setIsSuccess(false);
                    throw new Error('Error al registrar las evaluaciones');
                }
                return response.json(); // Mueve esto antes de establecer el mensaje de éxito
            })
            .then(data => {
                setModalMessage('¡Evaluación registrada con éxito!');
                setIsSuccess(true);
                console.log('Evaluaciones registradas:', data);
            })
            .catch(error => {
                console.error('Error al enviar las evaluaciones:', error);
                // Aquí puedes establecer un mensaje de error si lo deseas
            })
            .finally(() => {
                setModalVisible(true); // Mostrar el modal al final
            });
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
                                {criteriosGenerales.map(criterio => (
                                    <tr key={criterio.codigo_ce}>
                                        <td>{criterio.nombre_ce}</td>
                                        <td>
                                            <select value={notasGenerales[criterio.codigo_ce] ?? 0} onChange={(e) => handleNotaGeneralChange(criterio.codigo_ce, e.target.value)}>
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
                    {tesistas.map(tesista => (
                        <div key={tesista.id_tesista}>
                            <br />
                            <h3>{tesista.nombre_tesista}</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Criterio</th>
                                        <th>Puntaje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {criteriosFiltrados.map(criterio => (
                                        <tr key={criterio.codigo_ce}>
                                            <td>{criterio.nombre_ce}</td>
                                            <td>
                                                <select value={notasTesistas[tesista.cedula_tesista]?.[criterio.codigo_ce] ?? 0} onChange={(e) => handleNotaTesistaChange(tesista.cedula_tesista, criterio.codigo_ce, e.target.value)}>
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
                    ))}
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

export default EvaluacionExpForm;
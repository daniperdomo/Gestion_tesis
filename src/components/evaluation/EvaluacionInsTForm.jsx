import React, { useEffect, useState } from 'react';
import '../../styles/estiloForm.css';

const EvaluacionInsTForm = () => {
    const [propuestas, setPropuestas] = useState([]);
    const [codigo_prop, setCodigo_prop] = useState('');
    const [criterios, setCriterios] = useState([]);
    const [tesistas, setTesistas] = useState([]);
    const [tutor_emp, setTutor_emp] = useState([]);
    const [notasTesistas, setNotasTesistas] = useState({});
    const [notasGenerales, setNotasGenerales] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        fetch('http://localhost:8081/api/propuestas/ins')
            .then(response => response.json())
            .then(data => setPropuestas(data))
            .catch(error => console.error('Error fetching propuestas:', error));

        fetch('http://localhost:8081/api/criterios_evaluacion/ins-t')
            .then(response => response.json())
            .then(data => setCriterios(data))
            .catch(error => console.error('Error fetching criterios:', error));
    }, []);

    const handleSelectPropuesta = (codigoProp) => {
        setCodigo_prop(codigoProp);
        setNotasTesistas({});
        setNotasGenerales({});

        fetch(`http://localhost:8081/api/propuestas/${codigoProp}/tesistas`)
            .then(response => response.json())
            .then(data => setTesistas(data))
            .catch(error => console.error('Error fetching tesistas:', error));

        fetch(`http://localhost:8081/api/tutorEmp/${codigoProp}`)
            .then(response => response.json())
            .then(data => setTutor_emp(data))
            .catch(error => console.error('Error fetching tutor:', error));
    };

    const criteriosFiltrados = criterios.filter(criterio => 
        [48, 49, 50, 51, 52, 53, 54, 55, 56].includes(criterio.codigo_ce) && criterio.codigo_ce !== 54
    );

    const criteriosGenerales = criterios.filter(criterio => 
        ![48, 49, 50, 51, 52, 53, 54, 55, 56].includes(criterio.codigo_ce)
    );

    const handleNotaTesistaChange = (cedula_tesista, codigo_ce, value) => {
        setNotasTesistas(prev => {
            const updatedNotas = {
                ...prev,
                [cedula_tesista]: {
                    ...prev[cedula_tesista],
                    [codigo_ce]: parseInt(value)
                }
            };

            // Calcular la suma para los criterios 48-53
            const suma = Object.keys(updatedNotas[cedula_tesista] || {}).reduce((acc, key) => {
                if ([48, 49, 50, 51, 52, 53].includes(parseInt(key))) {
                    return acc + (updatedNotas[cedula_tesista][key] || 0);
                }
                return acc;
            }, 0);

            // Asignar la nota del criterio 54 según la suma
            let notaCriterio54 = 0;
            if (suma === 0) {
                notaCriterio54 = 0;
            } else if (suma >= 1 && suma <= 4) {
                notaCriterio54 = 1;
            } else if (suma >= 5 && suma <= 8) {
                notaCriterio54 = 2;
            } else if (suma >= 9 && suma <= 12) {
                notaCriterio54 = 3;
            } else if (suma >= 13 && suma <= 16) {
                notaCriterio54 = 4;
            } else if (suma >= 17 && suma <= 20) {
                notaCriterio54 = 5;
            }

            // Actualizar el criterio 54
            return {
                ...updatedNotas,
                [cedula_tesista]: {
                    ...updatedNotas[cedula_tesista],
                    54: notaCriterio54
                }
            };
        });
    };

    const handleNotaGeneralChange = (codigo_ce, value) => {
        setNotasGenerales(prev => ({ ...prev, [codigo_ce]: parseInt(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const evaluaciones = [];
    
        // Recopilar evaluaciones de los tesistas
        tesistas.forEach(tesista => {
            const cedula_tesista = tesista.cedula_tesista;
    
            // Calcular la suma para los criterios 48-53
            const suma = Object.keys(notasTesistas[cedula_tesista] || {}).reduce((acc, key) => {
                if ([48, 49, 50, 51, 52, 53].includes(parseInt(key))) {
                    return acc + (notasTesistas[cedula_tesista][key] || 0);
                }
                return acc;
            }, 0);
    
            // Asignar la nota del criterio 54 según la suma
            let notaCriterio54 = 0;
            if (suma === 0) {
                notaCriterio54 = 0;
            } else if (suma >= 1 && suma <= 4) {
                notaCriterio54 = 1;
            } else if (suma >= 5 && suma <= 8) {
                notaCriterio54 = 2;
            } else if (suma >= 9 && suma <= 12) {
                notaCriterio54 = 3;
            } else if (suma >= 13 && suma <= 16) {
                notaCriterio54 = 4;
            } else if (suma >= 17 && suma <= 20) {
                notaCriterio54 = 5;
            }
    
            // Agregar la evaluación para el criterio 54
            evaluaciones.push({
                codigo_prop: parseInt(codigo_prop),
                cedula_tesista,
                cedula_jurado: tutor_emp[0]?.cedula_tutorEmp,
                codigo_ce: 54, // Código del criterio 54
                nota: notaCriterio54 // Nota calculada para el criterio 54
            });
    
            // Agregar evaluaciones de criterios 55 y 56
            [55, 56].forEach(codigo_ce => {
                const nota = notasTesistas[cedula_tesista]?.[codigo_ce] !== undefined ? notasTesistas[cedula_tesista][codigo_ce] : 0; // Obtener la nota o 0 si no existe
                evaluaciones.push({
                    codigo_prop: parseInt(codigo_prop),
                    cedula_tesista,
                    cedula_jurado: tutor_emp[0]?.cedula_tutorEmp,
                    codigo_ce: codigo_ce,
                    nota
                });
            });
    
            // Agregar evaluaciones de criterios generales
            criteriosGenerales.forEach(criterio => {
                const codigo_ce = criterio.codigo_ce; // Obtén el código del criterio directamente
                evaluaciones.push({
                    codigo_prop: parseInt(codigo_prop),
                    cedula_tesista,
                    cedula_jurado: tutor_emp[0]?.cedula_tutorEmp,
                    codigo_ce: parseInt(codigo_ce),
                    nota: notasGenerales[codigo_ce] !== undefined ? notasGenerales[codigo_ce] : 0
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
                setModalMessage('Error al registrar la evaluación. Inténtalo de nuevo.');
                setIsSuccess(false);
                throw new Error('Error al registrar las evaluaciones');
            }
    
            setModalMessage('¡Evaluación registrada con éxito!');
            setIsSuccess(true);
            const result = await response.json();
            console.log('Evaluaciones registradas:', result);
        } catch (error) {
            console.error('Error al enviar las evaluaciones:', error);
        } finally {
            setModalVisible(true); 
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
                        <label className="form-label">Datos Tutor Empresarial:</label>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Cédula</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={tutor_emp[0]?.cedula_tutorEmp}>
                                    <td>{tutor_emp[0]?.cedula_tutorEmp}</td>
                                    <td>{tutor_emp[0]?.nombre_tutorEmp }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div>
                        <label className="form-label">Evaluaciones por Tesista</label>
                        {tesistas.map(tesista => (
                            <div key={tesista.cedula_tesista}>
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
                                                    <select value={notasTesistas[tesista.cedula_tesista]?.[criterio.codigo_ce] || 0} onChange={(e) => handleNotaTesistaChange(tesista.cedula_tesista, criterio.codigo_ce, e.target.value)}>
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
                                {criteriosGenerales.map(criterio => (
                                    <tr key={criterio.codigo_ce}>
                                        <td>{criterio.nombre_ce}</td>
                                        <td>
                                            <select value={notasGenerales[criterio.codigo_ce] || 0} onChange={(e) => handleNotaGeneralChange(criterio.codigo_ce, e.target.value)}>
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
                                    { `${propuesta.codigo_prop} - ${propuesta.titulo}`}
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

export default EvaluacionInsTForm;
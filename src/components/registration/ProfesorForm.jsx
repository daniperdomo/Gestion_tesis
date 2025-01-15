import React, { useState, useEffect } from 'react';
import '../../styles/estiloForm.css';

const ProfesorForm = () => {
    const [cedula_profesor, setCedula_profesor] = useState('')
    const [nombre_profesor, setNombre_profesor] = useState('')
    const [correo, setCorreo] = useState('')
    const [telefono, setTelefono] = useState('')
    const [tipoProfesor, setTipoProfesor] = useState('interno')
    const [infoAdicional, setInfoAdicional] = useState('')
    const [especialidades, setEspecialidades] = useState([])
    const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState([])
    const [dropdowns, setDropdowns] = useState([0])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCedula_profesorChange = (e) => {
        setCedula_profesor(e.target.value);
    };

    const handleNombre_profesorChange = (e) => {
        setNombre_profesor(e.target.value);
    };

    const handleCorreoChange = (e) => {
        setCorreo(e.target.value);
    };

    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
    };

    const handleTipoProfesorChange = (e) => {
        setTipoProfesor(e.target.value);
    };

    const handleInfoAdicionalChange = (e) => {
        setInfoAdicional(e.target.value);
    };

    const handleEspecialidadChange = (index, value) => {
        const newEspecialidades = [...especialidadesSeleccionadas];
        newEspecialidades[index] = value;
        setEspecialidadesSeleccionadas(newEspecialidades);
    };

    const addDropdown = () => {
        setDropdowns([...dropdowns, dropdowns.length])
    };

    useEffect(() => {
        fetch('http://localhost:8081/api/especialidades')
            .then(response => response.json())
            .then(data => setEspecialidades(data))
            .catch(error => console.error('Error fetching especialidades:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const profesorData = {
            cedula_profesor,
            nombre_profesor,
            correo,
            telefono,
            tipoProfesor,
            infoAdicional,
            especialidades: especialidadesSeleccionadas
        };

        try {
            const response = await fetch('http://localhost:8081/api/profesores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profesorData),
            });

            if (!response.ok) {
                setModalMessage('Error al registrar al profesor. Inténtalo de nuevo.');
                setIsSuccess(false);
                throw new Error('Error al registrar el profesor');
            }

            const result = await response.json();
            console.log('Profesor registrado:', result);
            setModalMessage('¡Profesor registrado con éxito!');
            setIsSuccess(true);
            setCedula_profesor('');
            setNombre_profesor('');
            setCorreo('');
            setTelefono('');
            setTipoProfesor('interno');
            setInfoAdicional('');
            setEspecialidadesSeleccionadas([]);
            setDropdowns([0]);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setModalVisible(true); // Mostrar el modal
        }
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Cédula:</label>
                    <input type="text" value={cedula_profesor} onChange={handleCedula_profesorChange} className="form-input" maxLength={10} required/>
                </div>
                <div>
                    <label className="form-label">Nombre:</label>
                    <input type="text" value={nombre_profesor} onChange={handleNombre_profesorChange} className="form-input" maxLength={70} required/>
                </div>
                <div>
                    <label className="form-label">Correo:</label>
                    <input type="email" value={correo} onChange={handleCorreoChange} className="form-input" maxLength={50} required/>
                </div>
                <div>
                    <label className="form-label">Teléfono:</label>
                    <input type="text" value={telefono} onChange={handleTelefonoChange} className="form-input" maxLength={20} required/>
                </div>
                <div>
                    <label className="form-label">Especialidades:</label>
                    {dropdowns.map((index) => (
                        <select key={index} className='form-input' onChange={(e) => handleEspecialidadChange(index, e.target.value)}>
                            <option value="">Seleccione una especialidad</option>
                            {especialidades.map((especialidad) => (
                                <option key={especialidad.codigo_esp} value={especialidad.codigo_esp}>
                                    {especialidad.nombre_esp}
                                </option>
                            ))}
                        </select>
                    ))}
                    <button type="button" onClick={addDropdown} className="form-button">
                        Agregar otra especialidad
                    </button>
                </div>
                <br />
                <div>
                    <label className="form-label">Tipo de Profesor:</label>
                    <select value={tipoProfesor} onChange={handleTipoProfesorChange} className="form-input">
                        <option value="interno">Profesor Interno</option>
                        <option value="externo">Profesor Externo</option>
                    </select>
                </div>
                {tipoProfesor === 'interno' ? (
                    <div>
                        <label className="form-label">Dirección:</label>
                        <input type="text" value={infoAdicional} onChange={handleInfoAdicionalChange} className="form-input" maxLength={50} required/>
                    </div>
                ) : (
                    <div>
                        <label className="form-label">Nombre de Institución:</label>
                        <input type="text" value={infoAdicional} onChange={handleInfoAdicionalChange} className="form-input" maxLength={30} required/>
                    </div>
                )}
                <button type="submit" className="form-button">
                    Registrar Profesor
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

export default ProfesorForm;
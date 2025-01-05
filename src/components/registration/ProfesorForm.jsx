import React, { useState, useEffect } from 'react';
import '../../styles/estiloForm.css';

const ProfesorForm = () => {
    const [cedula_profesor, setCedula_profesor] = useState('');
    const [nombre_profesor, setNombre_profesor] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipoProfesor, setTipoProfesor] = useState('interno');
    const [infoAdicional, setInfoAdicional] = useState('');
    const [especialidades, setEspecialidades] = useState([]); 
    const [nombre_Esp, setNombre_Esp] = useState(''); 

    const handleCedula_profesorChange = (e) => setCedula_profesor(e.target.value);
    const handleNombre_profesorChange = (e) => setNombre_profesor(e.target.value);
    const handleCorreoChange = (e) => setCorreo(e.target.value);
    const handleTelefonoChange = (e) => setTelefono(e.target.value);
    const handleTipoProfesorChange = (e) => setTipoProfesor(e.target.value);
    const handleInfoAdicionalChange = (e) => setInfoAdicional(e.target.value);
    const handleEspecialidadChange = (e) => setNombre_Esp(e.target.value); 

    useEffect(() => {
        const fetchEspecialidades = async () => { // Corrige el nombre de la función
            try {
                const response = await fetch('http://localhost:8081/api/especialidades');
                if (response.ok) {
                    const data = await response.json();
                    setEspecialidades(data); // Actualiza el estado con las especialidades obtenidas
                } else {
                    console.error('Error al obtener las especialidades');
                }
            } catch (error) {
                console.error('Error de red al obtener las especialidades:', error);
            }
        };

        fetchEspecialidades();
    }, []); // Solo se ejecuta al montar el componente

    const handleSubmit = async (e) => {
        e.preventDefault();

        const profesorData = {
            cedula_profesor,
            nombre_profesor,
            correo,
            telefono,
            tipoProfesor,
            infoAdicional,
            nombre_Esp 
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
                throw new Error('Error al registrar el profesor');
            }

            const result = await response.json();
            console.log('Profesor registrado:', result);
            // Reinicia los campos del formulario
            setCedula_profesor('');
            setNombre_profesor('');
            setCorreo('');
            setTelefono('');
            setTipoProfesor('interno');
            setInfoAdicional('');
            setNombre_Esp(''); 

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Cédula:
                    <input type="text" value ={cedula_profesor} onChange={handleCedula_profesorChange} className="form-input" maxLength={10} />
                </label>
                <label className="form-label">
                    Nombre:
                    <input type="text" value={nombre_profesor} onChange={handleNombre_profesorChange} className="form-input" maxLength={70} />
                </label>
                <label className="form-label">
                    Correo:
                    <input type="text" value={correo} onChange={handleCorreoChange} className="form-input" maxLength={30} />
                </label>
                <label className="form-label">
                    Teléfono:
                    <input type="text" value={telefono} onChange={handleTelefonoChange} className="form-input" maxLength={20} />
                </label>
                <label className="form-label">
                    Tipo de Profesor:
                    <select value={tipoProfesor} onChange={handleTipoProfesorChange} className="form-input">
                        <option value="interno">Profesor Interno</option>
                        <option value="externo">Profesor Externo</option>
                    </select>
                </label>
                {tipoProfesor === 'interno' ? (
                    <label className="form-label">
                        Dirección:
                        <input type="text" value={infoAdicional} onChange={handleInfoAdicionalChange} className="form-input" maxLength={50} />
                    </label>
                ) : (
                    <label className="form-label">
                        Nombre de Institución:
                        <input type="text" value={infoAdicional} onChange={handleInfoAdicionalChange} className="form-input" maxLength={30} />
                    </label>
                )}
                <label className="form-label">
                    Especialidad:
                    <select
                        className="form-input"
                        value={nombre_Esp}
                        onChange={handleEspecialidadChange}
                    >
                        <option value="">Seleccione una especialidad</option>
                        {especialidades.map((esp) => (
                            <option key={esp.codigo_esp} value={esp.codigo_esp}>
                                {esp.nombre_esp}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit" className="form-button">
                    Registrar Profesor
                </button>
            </form>
        </div>
    );
};

export default ProfesorForm;
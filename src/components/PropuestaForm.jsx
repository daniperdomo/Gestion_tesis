import React, { useState, useEffect } from 'react';
import '../styles/estiloForm.css';

const PropuestaForm = () => {
    // Estado para almacenar los valores del formulario
    const [titulo, setTitulo] = useState('');
    const [f_pres_comite, setF_pres_comite] = useState('');
    const [resultado_comite, setResultado_comite] = useState('Aprobado');
    const [observ_comite, setObserv_comite] = useState('');
    const [f_ent_escuela, setF_ent_escuela] = useState('');
    const [fecha_defensa, setFecha_defensa] = useState('');
    const [nro_consejo, setNro_consejo] = useState('');
    const [res_consejo, setRes_consejo] = useState('Aprobado');
    const [com_consejo, setCom_consejo] = useState('');
    const [cedula_profesorT, setCedula_profesorT] = useState('');
    const [cedula_profesorR, setCedula_profesorR] = useState('');
    const [fecha_revision, setFecha_revision] = useState('');
    const [res_revision, setRes_revision] = useState('PAR');
    const [tipoPropuesta, setTipoPropuesta] = useState('Experimental');
    const [cedula_tutorEmp, setCedula_tutorEmp] = useState('');
    const [profesores, setProfesores] = useState([]);
    const [consejos, setConsejos] = useState([]);
    const [tutoresEmp, setTutoresEmp] = useState([]);
    const [tesistas, setTesistas] = useState([]);
    const [cedula_tesista1, setCedula_tesista1] = useState('');
    const [cedula_tesista2, setCedula_tesista2] = useState('');

    // Funciones para manejar los cambios en los campos de entrada
    const handleTituloChange = (e) => setTitulo(e.target.value);
    const handleF_pres_comiteChange = (e) => setF_pres_comite(e.target.value);
    const handleResultado_comiteChange = (e) => setResultado_comite(e.target.value);
    const handleObserv_comiteChange = (e) => setObserv_comite(e.target.value);
    const handleF_ent_escuelaChange = (e) => setF_ent_escuela(e.target.value);
    const handleFecha_defensaChange = (e) => setFecha_defensa(e.target.value);
    const handleNro_consejoChange = (e) => setNro_consejo(e.target.value);
    const handleRes_consejoChange = (e) => setRes_consejo(e.target.value);
    const handleCom_consejoChange = (e) => setCom_consejo(e.target.value);
    const handleCedula_profesorTChange = (e) => setCedula_profesorT(e.target.value);
    const handleCedula_profesorRChange = (e) => setCedula_profesorR(e.target.value);
    const handleFecha_revisionChange = (e) => setFecha_revision(e.target.value);
    const handleRes_revisionChange = (e) => setRes_revision(e.target.value);
    const handleTipoPropuestaChange = (e) => {
        setTipoPropuesta(e.target.value);
        setCedula_tutorEmp('');
    };

    useEffect(() => {
        // Obtener profesores internos
        fetch('http://localhost:8081/api/profesores-internos')
            .then(response => response.json())
            .then(data => setProfesores(data))
            .catch(error => console.error('Error fetching profesores:', error));

        // Obtener consejos
        fetch('http://localhost:8081/api/consejos')
            .then(response => response.json())
            .then(data => setConsejos(data))
            .catch(error => console.error('Error fetching consejos:', error));

        // Obtener tutores empresariales
        fetch('http://localhost:8081/api/tutoresEmp')
            .then(response => response.json())
            .then(data => setTutoresEmp(data))
            .catch(error => console.error('Error fetching tutores:', error));

        // Obtener tesistas
        fetch('http://localhost:8081/api/tesistas')
            .then(response => response.json())
            .then(data => setTesistas(data))
            .catch(error => console.error('Error fetching tutores:', error));
    }, []);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const propuestaData = {
            titulo,
            f_pres_comite,
            resultado_comite,
            observ_comite,
            f_ent_escuela,
            fecha_defensa,
            nro_consejo,
            res_consejo,
            com_consejo,
            cedula_profesorT,
            cedula_profesorR,
            fecha_revision,
            res_revision,
            tipoPropuesta,
            cedula_tutorEmp,
            cedula_tesista1,
            cedula_tesista2
        };

        try {
            const response = await fetch('http://localhost:8081/api/propuesta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propuestaData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Propuesta registrada:', result);
                setTitulo('');
                setF_pres_comite('');
                setResultado_comite('Aprobado');
                setObserv_comite('');
                setF_ent_escuela('');
                setFecha_defensa('');
                setNro_consejo('');
                setRes_consejo('Aprobado');
                setCom_consejo('');
                setCedula_profesorT('');
                setCedula_profesorR('');
                setFecha_revision('');
                setRes_revision('PAR');
                setTipoPropuesta('Experimental');
                setCedula_tutorEmp('');
                setProfesores([]);
                setConsejos([]);
                setTutoresEmp([]);
                setTesistas([]);
                setCedula_tesista1('');
                setCedula_tesista2('');
            } else {
                const errorData = await response.json();
                console.error('Error al registrar la propuesta:', errorData);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Título:</label>
                    <input className="form-input" type="text" value={titulo} onChange={handleTituloChange} required />
                </div>
                <div>
                    <label className="form-label">Fecha de presentación al comité:</label>
                    <input className="form-input" type="date" value={f_pres_comite} onChange={handleF_pres_comiteChange} required />
                </div>
                <div>
                    <label className="form-label">Resultado del comité:</label>
                    <select className="form-input" value={resultado_comite} onChange={handleResultado_comiteChange}>
                        <option value="Aprobado">Aprobado</option>
                        <option value="Rechazado">Rechazado</option>
                    </select>
                </div>
                <div>
                    <label className="form-label">Observaciones del comité:</label>
                    <textarea className="form-input" value={observ_comite} onChange={handleObserv_comiteChange}></textarea>
                </div>
                <div>
                    <label className="form-label">Fecha de entrega a la escuela:</label>
                    <input className="form-input" type="date" value={f_ent_escuela} onChange={handleF_ent_escuelaChange} required />
                </div>
                <div>
                    <label className="form-label">Fecha de defensa:</label>
                    <input className="form-input" type="date" value={fecha_defensa} onChange={handleFecha_defensaChange} required />
                </div>
                <div>
                    <label className="form-label">Número de consejo:</label>
                    <select className="form-input" value={nro_consejo} onChange={handleNro_consejoChange} required>
                        <option value="">Seleccione un consejo</option>
                        {consejos.map((consejo) => (
                            <option key={consejo.nro_consejo} value={consejo.nro_consejo}>
                                {consejo.nro_consejo}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="form-label">Resultado del consejo:</label>
                    <select className="form-input" value={res_consejo} onChange={handleRes_consejoChange}>
                        <option value="Aprobado">Aprobado</option>
                        <option value="Rechazado">Rechazado</option>
                    </select>
                </div>
                <div>
                    <label className="form-label">Comentarios del consejo:</label>
                    <textarea className="form-input" value={com_consejo} onChange={handleCom_consejoChange}></textarea>
                </div>
                <div>
                    <label className="form-label">Profesor Tutor:</label>
                    <select className="form-input" value={cedula_profesorT} onChange={handleCedula_profesorTChange} required>
                        <option value="">Seleccione un profesor</option>
                        {profesores.map((profesor) => (
                            <option key={profesor.cedula_profesor} value={profesor.cedula_profesor}>
                                {profesor.nombre_profesor}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="form-label">Profesor Revisor:</label>
                    <select className="form-input" value={cedula_profesorR} onChange={handleCedula_profesorRChange} required>
                        <option value="">Seleccione un profesor</ option>
                        {profesores.map((profesor) => (
                            <option key={profesor.cedula_profesor} value={profesor.cedula_profesor}>
                                {profesor.nombre_profesor}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="form-label">Fecha de revisión:</label>
                    <input className="form-input" type="date" value={fecha_revision} onChange={handleFecha_revisionChange} required />
                </div>
                <div>
                    <label className="form-label">Resultado de revisión:</label>
                    <select className="form-input" value={res_revision} onChange={handleRes_revisionChange}>
                        <option value="PAR">PAR</option>
                        <option value="PRR">PRR</option>
                    </select>
                </div>
                <div>
                    <label className="form-label">Tipo de Propuesta:</label>
                    <select className="form-input" value={tipoPropuesta} onChange={handleTipoPropuestaChange}>
                        <option value="Experimental">Experimental</option>
                        <option value="Instrumental">Instrumental</option>
                    </select>
                </div>
                {tipoPropuesta === 'Instrumental' && (
                    <div>
                        <label className="form-label">Tutor Empresarial:</label>
                        <select className="form-input" value={cedula_tutorEmp} onChange={(e) => setCedula_tutorEmp(e.target.value)} required>
                            <option value="">Seleccione un tutor</option>
                            {tutoresEmp.map((tutor) => (
                                <option key={tutor.cedula_tutorEmp} value={tutor.cedula_tutorEmp}>
                                    {tutor.nombre_tutorEmp}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div>
                    <label className="form-label">Tesista/s:</label>
                    <select className="form-input" value={cedula_tesista1} onChange={(e) => setCedula_tesista1(e.target.value)} required>
                        <option value="">Selecciona un tesista </option>
                        {tesistas.map(tesista => (
                            <option key={tesista.cedula_tesista} value={tesista.cedula_tesista}>
                                {tesista.nombre_tesista}
                            </option>
                        ))}
                    </select>

                    <select className="form-input" value={cedula_tesista2} onChange={(e) => setCedula_tesista2(e.target.value)}>
                        <option value="">Selecciona un segundo tesista (opcional)</option>
                        {tesistas.map(tesista => (
                            <option key={tesista.cedula_tesista} value={tesista.cedula_tesista}>
                                {tesista.nombre_tesista}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="form-button" type="submit">Registrar Propuesta</button>
            </form>
        </div>
    );
};

export default PropuestaForm;
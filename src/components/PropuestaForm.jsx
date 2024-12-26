import React, { useState } from 'react';
import '../styles/estiloForm.css';

const PropuestaForm = () => {
    // Estado para almacenar los valores del formulario
    const [titulo, setTitulo] = useState('');
    const [fPresComite, setFPresComite] = useState('');
    const [resultadoComite, setResultadoComite] = useState('Aprobado');
    const [observComite, setObservComite] = useState('');
    const [fEntEscuela, setFEntEscuela] = useState('');
    const [fechaDefensa, setFechaDefensa] = useState('');
    const [nroConsejo, setNroConsejo] = useState('');
    const [resConsejo, setResConsejo] = useState('Aprobado');
    const [comConsejo, setComConsejo] = useState('');
    const [cedulaProfesorT, setCedulaProfesorT] = useState('');
    const [cedulaProfesorR, setCedulaProfesorR] = useState('');
    const [fechaRevision, setFechaRevision] = useState('');
    const [resRevision, setResRevision] = useState('PAR');

    // Funciones para manejar los cambios en los campos de entrada
    const handleTituloChange = (e) => setTitulo(e.target.value);
    const handleFPresComiteChange = (e) => setFPresComite(e.target.value);
    const handleResultadoComiteChange = (e) => setResultadoComite(e.target.value);
    const handleObservComiteChange = (e) => setObservComite(e.target.value);
    const handleFEntEscuelaChange = (e) => setFEntEscuela(e.target.value);
    const handleFechaDefensaChange = (e) => setFechaDefensa(e.target.value);
    const handleNroConsejoChange = (e) => setNroConsejo(e.target.value);
    const handleResConsejoChange = (e) => setResConsejo(e.target.value);
    const handleComConsejoChange = (e) => setComConsejo(e.target.value);
    const handleCedulaProfesorTChange = (e) => setCedulaProfesorT(e.target.value);
    const handleCedulaProfesorRChange = (e) => setCedulaProfesorR(e.target.value);
    const handleFechaRevisionChange = (e) => setFechaRevision(e.target.value);
    const handleResRevisionChange = (e) => setResRevision(e.target.value);

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Título:', titulo);
        console.log('Fecha de Presentación al Comité:', fPresComite);
        console.log('Resultado del Comité:', resultadoComite);
        console.log('Observaciones del Comité:', observComite);
        console.log('Fecha de Entrega a la Escuela:', fEntEscuela);
        console.log('Fecha de Defensa:', fechaDefensa);
        console.log('Número de Consejo:', nroConsejo);
        console.log('Resultado del Consejo:', resConsejo);
        console.log('Comentarios del Consejo:', comConsejo);
        console.log('Cédula del Profesor Tutor:', cedulaProfesorT);
        console.log('Cédula del Profesor Revisor:', cedulaProfesorR);
        console.log('Fecha de Revisión:', fechaRevision);
        console.log('Resultado de Revisión:', resRevision);
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <label className="form-label">Título:</label>
                <input 
                    type="text" 
                    value={titulo} 
                    onChange={handleTituloChange} 
                    className="form-input" 
                    maxLength="100" 
                />
                
                <label className="form-label">Fecha de Presentación al Comité:</label>
                <input 
                    type="date" 
                    value={fPresComite} 
                    onChange={handleFPresComiteChange} 
                    className="form-input" 
                />
                
                <label className="form-label">Resultado del Comité:</label>
                <select 
                    value={resultadoComite} 
                    onChange={handleResultadoComiteChange} 
                    className="form-input"
                >
                    <option value="Aprobado">Aprobado</option>
                    <option value="No Aprobado">No Aprobado</option>
                </select>
                
                <label className="form-label">Observaciones del Comité:</label>
                <input 
                    type="text" 
                    value={observComite} 
                    onChange={handleObservComiteChange} 
                    className="form-input" 
                    maxLength="150" 
                />
                
                <label className="form-label">Fecha de Entrega a la Escuela:</label>
                <input 
                    type="date" 
                    value={fEntEscuela} 
                    onChange={handleFEntEscuelaChange} 
                    className="form-input" 
                />
                
                <label className="form-label">Fecha de Defensa:</label>
                <input 
                    type="datetime-local" 
                    value={fechaDefensa} 
                    onChange={handleFechaDefensaChange} 
                    className="form-input" 
                />
                
                <label className="form-label">Número de Consejo:</label>
                <input 
                    type="number" 
                    value={nroConsejo} 
                    onChange={handleNroConsejoChange} 
                    className="form-input" 
                />
                
                <label className="form-label">Resultado del Consejo:</label>
                <select 
                    value={resConsejo} 
                    onChange={handleResConsejoChange} 
                    className="form-input"
                >
                    <option value="Aprobado">Aprobado</option>
                    <option value="No Aprobado">No Aprobado</option>
                </select>
                
                <label className="form-label">Comentarios del Consejo:</label>
                <input 
                    type="text" 
                    value={comConsejo} 
                    onChange={handleComConsejoChange} 
                    className="form-input" 
                    maxLength="150" 
                />
                
                <label className="form-label">Cédula del Profesor Tutor:</label>
                <input 
                    type="text" 
                    value={cedulaProfesorT} 
                    onChange={handleCedulaProfesorTChange} 
                    className="form-input" 
                    maxLength="10" 
                />
                
                <label className="form-label">Cédula del Profesor Revisor:</label>
                <input 
                    type="text" 
                    value={cedulaProfesorR} 
                    onChange={handleCedulaProfesorRChange} 
                    className="form-input" 
                    maxLength="10" 
                />
                
                <label className="form-label">Fecha de Revisión:</label>
                <input 
                    type="date" 
                    value={fechaRevision} 
                    onChange={handleFechaRevisionChange} 
                    className="form-input" 
                />
                
                <label className="form-label">Resultado de Revisión:</label>
                <select 
                    value={resRevision} 
                    onChange={handleResRevisionChange} 
                    className="form-input"
                >
                    <option value="PAR">PAR</option>
                    <option value="PRR">PRR</option>
                </select>
                
                <button type="submit" className="form-button">
                    Registrar Propuesta
                </button>
            </form>
        </div>
    );
};

export default PropuestaForm;
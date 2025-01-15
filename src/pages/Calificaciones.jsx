import React, { useEffect, useState } from 'react';
import '../styles/estiloForm.css';
import Header from '../components/header';
import Footer from '../components/footer';

const Calificaciones = () => {
    const [propuestas, setPropuestas] = useState([]);
    const [codigo_prop, setCodigo_prop] = useState('');
    const [tesistas, setTesistas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/api/propuestas')
            .then(response => response.json())
            .then(data => setPropuestas(data))
            .catch(error => console.error('Error fetching propuestas:', error));
    }, []);

    const handleSelectPropuesta = (codigo_prop) => {
        setCodigo_prop(codigo_prop);
        fetch(`http://localhost:8081/api/calificaciones/${codigo_prop}`)
            .then(response => response.json())
            .then(data => {
                const tesistasConCalificaciones = data.map(tesista => {
                    const notaFinal = calcularNotaFinal(tesista.suma_notas);
                    return { ...tesista, nota_final: notaFinal };
                });
                setTesistas(tesistasConCalificaciones);
                console.log(tesistasConCalificaciones);
            })
            .catch(error => console.error('Error fetching tesistas:', error));
    };

    const calcularNotaFinal = (suma) => {
        if (suma < 10) return 0;
        if (suma >= 10 && suma <= 22) return 1;
        if (suma >= 23 && suma <= 37) return 2;
        if (suma >= 38 && suma <= 52) return 3;
        if (suma >= 53 && suma <= 67) return 4;
        if (suma >= 68 && suma <= 82) return 5;
        if (suma >= 83 && suma <= 97) return 6;
        if (suma >= 98 && suma <= 112) return 7;
        if (suma >= 113 && suma <= 127) return 8;
        if (suma >= 128 && suma <= 142) return 9;
        if (suma >= 143 && suma <= 157) return 10;
        if (suma >= 158 && suma <= 172) return 11;
        if (suma >= 173 && suma <= 187) return 12;
        if (suma >= 188 && suma <= 202) return 13;
        if (suma >= 203 && suma <= 217) return 14;
        if (suma >= 218 && suma <= 232) return 15;
        if (suma >= 233 && suma <= 247) return 16;
        if (suma >= 248 && suma <= 262) return 17;
        if (suma >= 263 && suma <= 277) return 18;
        if (suma >= 278 && suma <= 292) return 19;
        if (suma >= 293 && suma <= 300) return 20;
    };

    return (
        <>
            <Header />
            <div className="form-container">
                {codigo_prop ? (
                    <div>
                        <label className="form-label">Datos Tesista:</label>
                        {tesistas.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Cédula</th>
                                        <th>Nombre</th>
                                        <th>Calificación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tesistas.map(tesista => (
                                        <tr key={tesista.cedula_tesista}>
                                            <td>{tesista.cedula_tesista}</td>
                                            <td>{tesista.nombre_tesista}</td>
                                            <td>{tesista.nota_final}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No se han hecho evaluaciones en esta propuesta.</p> // Mensaje cuando no hay tesistas
                        )}
                    </div>
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
            </div>
            <Footer />
        </>
    );
};

export default Calificaciones;
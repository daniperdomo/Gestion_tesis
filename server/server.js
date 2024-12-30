const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 8081;

const sql = require("mssql/msnodesqlv8");
const config = {
    server: "JESUS\\SQLEXPRESS",
    database: "Gestion_Tesis",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
};

sql.connect(config, function(error) {
    if (error) {
        console.log("Error connecting to the database:", error);
    } else {
        console.log('DB connected');
    }
});

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/especialidad', (req, res) => {
    const { nombre_esp } = req.body;

    const request = new sql.Request();
    request.input('nombre_esp', sql.VarChar, nombre_esp);
    request.query('INSERT INTO Especialidades (nombre_esp) VALUES (@nombre_esp)', (error) => {
        if (error) {
            console.log("Error inserting specialty:", error);
            return res.status(500).send('Error inserting specialty');
        }
        res.status(201).send('Specialty registered successfully');
    });
});

app.post('/api/consejo', (req, res) => {
    const { nro_Consejo, fecha_consejo } = req.body;

    const request = new sql.Request();
    request.input('nro_Consejo', sql.VarChar, nro_Consejo);
    request.input('fecha_consejo', sql.Date, fecha_consejo);
    request.query('INSERT INTO Consejos_Escuela (nro_Consejo, fecha_consejo) VALUES (@nro_Consejo, @fecha_consejo)', (error) => {
        if (error) {
            console.log("Error inserting consejo:", error);
            return res.status(500).send('Error inserting consejo');
        }
        res.status(201).send('Consejo registered successfully');
    });
});

app.post('/api/tutor_emp', (req, res) => {
    const { cedula_tutorEmp, nombre_tutorEmp, telefono, empresa } = req.body;

    const request = new sql.Request();
    request.input('cedula_tutorEmp', sql.VarChar, cedula_tutorEmp);
    request.input('nombre_tutorEmp', sql.VarChar, nombre_tutorEmp);
    request.input('telefono', sql.VarChar, telefono);
    request.input('empresa', sql.VarChar, empresa);
    request.query('INSERT INTO Tutores_emp (cedula_tutorEmp, nombre_tutorEmp, telefono, empresa) VALUES (@cedula_tutorEmp, @nombre_tutorEmp, @telefono, @empresa)', (error) => {
        if (error) {
            console.log("Error inserting tutor empresarial:", error);
            return res.status(500).send('Error inserting tutor empresarial');
        }
        res.status(201).send('Tutor empresarial registered successfully');
    });
});

app.post('/api/profesores', (req, res) => {
    const { cedula_profesor, nombre_profesor, correo, telefono, tipoProfesor, infoAdicional } = req.body;

    const request = new sql.Request();
    
    request.input('cedula_profesor', sql.VarChar, cedula_profesor);
    request.input('nombre_profesor', sql.VarChar, nombre_profesor);
    request.input('correo', sql.VarChar, correo);
    request.input('telefono', sql.VarChar, telefono);
    
    request.query('INSERT INTO Profesores (cedula_profesor, nombre_profesor, correo, telefono) VALUES (@cedula_profesor, @nombre_profesor, @correo, @telefono)', (error, result) => {
        if (error) {
            console.log("Error inserting professor:", error);
            return res.status(500).json({ error: 'Error inserting professor' });
        }

        // Insertar en la tabla correspondiente según el tipo de profesor
        const additionalRequest = new sql.Request();
        additionalRequest.input('cedula_profesor', sql.VarChar, cedula_profesor);
        
        if (tipoProfesor === 'interno') {
            additionalRequest.input('direccion', sql.VarChar, infoAdicional);
            additionalRequest.query('INSERT INTO Internos (cedula_profesor, direccion) VALUES (@cedula_profesor, @direccion)', (error) => {
                if (error) {
                    console.log("Error inserting internal professor:", error);
                    return res.status(500).json({ error: 'Error inserting internal professor' });
                }
                res.status(201).json({ message: 'Internal professor registered successfully' });
            });
        } else if (tipoProfesor === 'externo') {
            additionalRequest.input('institucion', sql.VarChar, infoAdicional);
            additionalRequest.query('INSERT INTO Externos (cedula_profesor, institucion) VALUES (@cedula_profesor, @institucion)', (error) => {
                if (error) {
                    console.log("Error inserting external professor:", error);
                    return res.status(500).json({ error: 'Error inserting external professor' });
                }
                res.status(201).json({ message: 'External professor registered successfully' });
            });
        }
    });
});

app.post('/api/tesista', async (req, res) => {
    const { cedula_tesista, nombre_tesista, telefono, correo_UCAB, correo_Particular, intereses } = req.body;

    const request = new sql.Request();

    try {
        request.input('cedula_tesista', sql.VarChar, cedula_tesista);
        request.input('nombre_tesista', sql.VarChar, nombre_tesista);
        request.input('telefono', sql.VarChar, telefono);
        request.input('correo_ucab', sql.VarChar, correo_UCAB);
        request.input('correo_particular', sql.VarChar, correo_Particular);

        await request.query('INSERT INTO Tesistas (cedula_tesista, nombre_tesista, telefono, correo_ucab, correo_particular) VALUES (@cedula_tesista, @nombre_tesista, @telefono, @correo_ucab, @correo_particular)');

        for (const interes of intereses) {
            if (interes) {
                const interesRequest = new sql.Request();
                interesRequest.input('cedula_tesista', sql.VarChar, cedula_tesista);
                interesRequest.input('interes', sql.VarChar, interes);
                await interesRequest.query('INSERT INTO Intereses (cedula_tesista, interes) VALUES (@cedula_tesista, @interes)');
            }
        }

        res.status(201).send('Tesista registrado exitosamente');
    } catch (error) {
        console.error("Error al registrar al tesista:", error);
        res.status(500).send('Error al registrar al tesista');
    }
});

// Ruta para insertar en la tabla Se_especializa
app.post('/api/se_especializa', (req, res) => {
    const { cedula_profesor, codigo_esp } = req.body;

    const request = new sql.Request();
    request.input('cedula_profesor', sql.VarChar, cedula_profesor);
    request.input('codigo_esp', sql.Int, codigo_esp);
    request.query('insert into Se_especializa (cedula_profesor, codigo_esp) values (@cedula_profesor, @codigo_esp)', (error) => {
        if (error) {
            console.log("Error inserting into Se_especializa:", error);
            return res.status(500).send('Error inserting into Se_especializa');
        }
        res.status(201).send('Data registered successfully');
    });
});

app.get('/api/profesores', (req, res) => {
    const request = new sql.Request();
    request.query('select cedula_profesor, nombre_profesor from Profesores', (error, result) => {
        if (error) {
            console.log("Error fetching profesores:", error);
            return res.status(500).send('Error fetching profesores');
        }
        res.json(result.recordset);
    });
});

app.get('/api/especialidades', (req, res) => {
    const request = new sql.Request();
    request.query('select codigo_esp, nombre_esp from Especialidades', (error, result) => {
        if (error) {
            console.log("Error fetching especialidades:", error);
            return res.status(500).send('Error fetching especialidades');
        }
        res.json(result.recordset);
    });
});

app.post('/api/propuesta', async (req, res) => {
    const { setTitulo, setFPresComite, setResultadoComite, setObservComite, setFEntEscuela, setFechaDefensa,
        setNroConsejo, setResConsejo, setComConsejo, setCedulaProfesorT, setCedulaProfesorR, setFechaRevision,
        setResRevision} = req.body;

    const request = new sql.Request();

    try {
        request.input('setTitulo', sql.VarChar, setTitulo);
        request.input('setFPresComite', sql.VarChar, setFPresComite);
        request.input('setResultadoComite', sql.VarChar, setResultadoComite);
        request.input('setObservComite', sql.VarChar, setObservComite);
        request.input('setFEntEscuela', sql.VarChar, setFEntEscuela);
        request.input('setFechaDefensa', sql.VarChar, setFechaDefensa);
        request.input('setNroConsejo', sql.VarChar, setNroConsejo);
        request.input('setResConsejo', sql.VarChar, setResConsejo);
        request.input('setComConsejo', sql.VarChar, setComConsejo);
        request.input('setCedulaProfesorT', sql.VarChar, setCedulaProfesorT);
        request.input('setCedulaProfesorR', sql.VarChar, setCedulaProfesorR);
        request.input('setFechaRevision', sql.VarChar, setFechaRevision);
        request.input('setResRevision', sql.VarChar, setResRevision);

        //Ahora si lo adelante jeje saludos   
        await request.query('INSERT INTO Propuestas (setTitulo, setFPresComite, setResultadoComite, setObservComite, setFEntEscuela, setFechaDefensa, setNroConsejo, setResConsejo, setComConsejo, setCedulaProfesorT, setCedulaProfesorR, setFechaRevision, setResRevision), VALUES (@setTitulo, @setFPresComite, @setResultadoComite, @setObservComite, @setFEntEscuela, @setFechaDefensa, @setNroConsejo, @setResConsejo, @setComConsejo, @setCedulaProfesorT, @setCedulaProfesorR, @setFechaRevision, @setResRevision)');

        res.status(201).send('Propuesta registrado exitosamente');
    } catch (error) {
        console.error("Error al registrar la Propuesta:", error);
        res.status(500).send('Error al registrar la Propuesta');
    }
});

app.post('/api/es_jurado', (req, res) => {
    const { codigo_prop, cedula_profesor } = req.body;

    const request = new sql.Request();
    request.input('codigo_prop', sql.Int, codigo_prop);
    request.input('cedula_profesor', sql.VarChar, cedula_profesor);
    request.query('INSERT INTO Es_jurado (codigo_prop, cedula_profesor) VALUES (@codigo_prop, @cedula_profesor)', (error) => {
        if (error) {
            console.log("Error inserting into Es_jurado:", error);
            return res.status(500).send('Error inserting into Es_jurado');
        }
        res.status(201).send('Datos registrados exitosamente');
    });
});

app.get('/api/propuestas', (req, res) => {
    const request = new sql.Request();
    request.query('SELECT codigo_prop, titulo FROM Propuestas', (error, result) => {
        if (error) {
            console.log("Error fetching propuestas:", error);
            return res.status(500).send('Error fetching propuestas');
        }
        res.json(result.recordset);
    });
});

app.post('/api/proponen', (req, res) => {
    const {codigo_prop, cedula_tesista} = req.body

    const request = new sql.Request();
    request.input('codigo_prop', sql.Int, codigo_prop);
    request.input('cedula_tesista', sql.VarChar, cedula_tesista);
    request.query('insert into Proponen(codigo_prop, cedula_tesista) values (@codigo_prop, @cedula_tesista)', (error) => {
        if (error) {
            console.log("Error inserting into Proponen:", error);
            return res.status(500).send('Error inserting into Proponen');
        }
        res.status(201).send('Datos registrados exitosamente');
    });
})

app.get('/api/tesistas', (req, res) => {
    const request = new sql.Request();
    request.query('select cedula_tesista, nombre_tesista from Tesistas', (error, result) => {
        if (error) {
            console.log("Error fetching tesitas:", error);
            return res.status(500).send('Error fetching tesistas');
        }
        res.json(result.recordset);
    });
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log("Server started on port", port);
});
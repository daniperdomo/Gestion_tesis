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
    const { cedula_profesor, nombre_profesor, correo, telefono, tipoProfesor, infoAdicional, especialidades } = req.body;

    const request = new sql.Request();
    
    request.input('cedula_profesor', sql.VarChar, cedula_profesor);
    request.input('nombre_profesor', sql.VarChar, nombre_profesor);
    request.input('correo', sql.VarChar, correo);
    request.input('telefono', sql.VarChar, telefono);
    
    request.query('INSERT INTO Profesores (cedula_profesor, nombre_profesor, correo, telefono) VALUES (@cedula_profesor, @nombre_profesor, @correo, @telefono)', (error) => {
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
            });
        } else if (tipoProfesor === 'externo') {
            additionalRequest.input('institucion', sql.VarChar, infoAdicional);
            additionalRequest.query('INSERT INTO Externos (cedula_profesor, institucion) VALUES (@cedula_profesor, @institucion)', (error) => {
                if (error) {
                    console.log("Error inserting external professor:", error);
                    return res.status(500).json({ error: 'Error inserting external professor' });
                }
            });
        }

        const insertEspecialidadesPromises = especialidades.map((especialidad) => {
            return new Promise((resolve, reject) => {
                if (especialidad) {
                    const especialidadRequest = new sql.Request();
                    especialidadRequest.input('codigo_esp', sql.Int, especialidad);
                    especialidadRequest.input('cedula_profesor', sql.VarChar, cedula_profesor);
                    especialidadRequest.query(`insert into Se_especializa (cedula_profesor, codigo_esp) values (@cedula_profesor, @codigo_esp)`, (error) => {
                        if (error) {
                            console.log("Error inserting into Se_especializa:", error);
                            return reject(error);
                        }
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        });

        Promise.all(insertEspecialidadesPromises)
            .then(() => {
                res.status(201).json({ message: 'Professor registered successfully' });
            })
            .catch((error) => {
                console.log("Error inserting into Se_especializa:", error);
                res.status(500).json({ error: 'Error inserting into Se_especializa' });
            });
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
    const { 
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
    } = req.body;

    try {
        const request = new sql.Request();
        request.input('titulo', sql.VarChar, titulo);
        request.input('f_pres_comite', sql.Date, f_pres_comite);
        request.input('resultado_comite', sql.VarChar, resultado_comite);
        request.input('observ_comite', sql.VarChar, observ_comite);
        request.input('f_ent_escuela', sql.Date, f_ent_escuela);
        request.input('fecha_defensa', sql.DateTime, fecha_defensa);
        request.input('nro_consejo', sql.VarChar, nro_consejo);
        request.input('res_consejo', sql.VarChar, res_consejo);
        request.input('com_consejo', sql.VarChar, com_consejo);
        request.input('cedula_profesorT', sql.VarChar, cedula_profesorT);
        request.input('cedula_profesorR', sql.VarChar, cedula_profesorR);
        request.input('fecha_revision', sql.Date, fecha_revision);
        request.input('res_revision', sql.VarChar, res_revision);

        const result = await request.query(`
            INSERT INTO Propuestas (titulo, f_pres_comite, resultado_comite, observ_comite, f_ent_escuela, fecha_defensa, nro_consejo, res_consejo, com_consejo, cedula_profesorT, cedula_profesorR, fecha_revision, res_revision)
            OUTPUT INSERTED.codigo_prop
            VALUES (@titulo, @f_pres_comite, @resultado_comite, @observ_comite, @f_ent_escuela, @fecha_defensa, @nro_consejo, @res_consejo, @com_consejo, @cedula_profesorT, @cedula_profesorR, @fecha_revision, @res_revision)
        `);

        const codigo_prop = result.recordset[0].codigo_prop; 

        if (tipoPropuesta === 'Instrumental') {
            const additionalRequest = new sql.Request();
            additionalRequest.input('codigo_prop', sql.Int, codigo_prop);
            additionalRequest.input('cedula_tutorEmp', sql.VarChar, cedula_tutorEmp);
            await additionalRequest.query(`
                INSERT INTO Instrumentales (codigo_prop, cedula_tutorEmp)
                VALUES (@codigo_prop, @cedula_tutorEmp)
            `);
        } else if (tipoPropuesta === 'Experimental') {
            const additionalRequest = new sql.Request();
            additionalRequest.input('codigo_prop', sql.Int, codigo_prop);
            await additionalRequest.query(`
                INSERT INTO Experimentales (codigo_prop)
                VALUES (@codigo_prop)
            `);
        } else {
            return res.status(400).json({ error: 'Tipo de propuesta no válido' });
        }

        if (cedula_tesista1) {
            const proponenRequest = new sql.Request();
            proponenRequest.input('cedula_tesista1', sql.VarChar, cedula_tesista1);
            proponenRequest.input('codigo_prop', sql.Int, codigo_prop);
            await proponenRequest.query(`
                INSERT INTO proponen (cedula_tesista, codigo_prop) 
                VALUES (@cedula_tesista1, @codigo_prop)
            `);
        }

        if (cedula_tesista2) {
            const proponenRequest = new sql.Request();
            proponenRequest.input('cedula_tesista2', sql.VarChar, cedula_tesista2);
            proponenRequest.input('codigo_prop', sql.Int, codigo_prop);
            await proponenRequest.query(`
                INSERT INTO proponen (cedula_tesista, codigo_prop) 
                VALUES (@cedula_tesista2, @codigo_prop)
            `);
        }

        res.status(201).json({ message: 'Propuesta inserted successfully' });
    } catch (error) {
        console.log("Error inserting propuesta:", error);
        res.status(500).json({ error: 'Error inserting propuesta' });
    }
});

app.get('/api/consejos', (req, res) => {
    const request = new sql.Request();
    request.query('select nro_consejo from Consejos_escuela', (error, result) => {
        if (error) {
            console.log("Error fetching consejo:", error);
            return res.status(500).send('Error fetching consejo');
        }
        res.json(result.recordset);
    });
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

app.get('/api/propuestas/exp', (req, res) => {
    const request = new sql.Request();
    request.query(`
        select codigo_prop, titulo 
        from Propuestas 
        where codigo_prop in (select codigo_prop from experimentales)`, (error, result) => {
        if (error) {
            console.log("Error fetching experimentales:", error);
            return res.status(500).send('Error fetching experimentales');
        }
        res.json(result.recordset);
    });
});

app.get('/api/propuestas/ins', (req, res) => {
    const request = new sql.Request();
    request.query(`
        select codigo_prop, titulo 
        from Propuestas 
        where codigo_prop in (select codigo_prop from instrumentales)`, (error, result) => {
        if (error) {
            console.log("Error fetching instrumentales:", error);
            return res.status(500).send('Error fetching intrumentales');
        }
        res.json(result.recordset);
    });
});

app.get('/api/propuestas/:codigo_prop/tesistas', (req, res) => {
    const codigo_prop = req.params.codigo_prop;
    const request = new sql.Request();
    request.input('codigo_prop', sql.Int, codigo_prop)

    request.query(`
        select *
        from Tesistas t
        where t.cedula_tesista in (select cedula_tesista from Proponen p where p.codigo_prop = @codigo_prop)`, (error, result) => {
            if (error) {
                console.log("Error fetching tesistas:", error);
                return res.status(500).send('Error fetching tesistas');
            }
            res.json(result.recordset);
        });

});

app.get('/api/propuestas/:codigo_prop/profesorR', (req, res) => {
    const codigo_prop = req.params.codigo_prop;
    const request = new sql.Request();

    request.input('codigo_prop', sql.Int, codigo_prop)

    request.query(`
        select *
        from Profesores p
        where p.cedula_profesor = (select cedula_profesorR from Propuestas pr where pr.codigo_prop = @codigo_prop)`, (error, result) => {
            if (error) {
                console.log("Error fetching profesor:", error);
                return res.status(500).send('Error fetching profesor');
            }
            res.json(result.recordset);
        });

});

app.get('/api/propuestas/:codigo_prop/profesorT', (req, res) => {
    const codigo_prop = req.params.codigo_prop;
    const request = new sql.Request();

    request.input('codigo_prop', sql.Int, codigo_prop)

    request.query(`
        select *
        from Profesores p
        where p.cedula_profesor = (select cedula_profesorT from Propuestas pr where pr.codigo_prop = @codigo_prop)`, (error, result) => {
            if (error) {
                console.log("Error fetching profesorT:", error);
                return res.status(500).send('Error fetching profesorT');
            }
            res.json(result.recordset);
        });

});

app.get('/api/tesistas', (req, res) => {
    const request = new sql.Request();
    request.query('select * from Tesistas', (error, result) => {
        if (error) {
            console.log("Error fetching tesitas:", error);
            return res.status(500).send('Error fetching tesistas');
        }
        res.json(result.recordset);
    });
});

app.get('/api/tutoresEmp', (req, res) => {
    const request = new sql.Request();
    request.query('select cedula_tutorEmp, nombre_tutorEmp from Tutores_emp', (error, result) => {
        if (error) {
            console.log("Error fetching tutores:", error);
            return res.status(500).send('Error fetching tutores');
        }
        res.json(result.recordset);
    });
});

app.get('/api/profesores-internos', (req, res) => {
    const request = new sql.Request();
    request.query(`
        select p.cedula_profesor, p.nombre_profesor, p.correo, p.telefono
        from Profesores p
        inner join Internos i on p.cedula_profesor = i.cedula_profesor
    `, (error, result) => {
        if (error) {
            console.log("Error fetching internos:", error);
            return res.status(500).json({ error: 'Error fetching internos' });
        }
        res.json(result.recordset);
    });
});

app.get('/api/criterios_revision/exp', (req, res) => {
    const request = new sql.Request()
    request.query(`
        select codigo_cr, nombre_cr
        from Criterios_revision
        where tipo = 'E'
    `, (error, result) => {
        if (error) {
            console.log("Error fetching criterios_revision:", error);
            return res.status(500).json({ error: 'Error fetching criterios_revision' });
        }
        res.json(result.recordset);
    })
})

app.get('/api/criterios_revision/ins', (req, res) => {
    const request = new sql.Request()
    request.query(`
        select codigo_cr, nombre_cr
        from Criterios_revision
        where tipo = 'I'
    `, (error, result) => {
        if (error) {
            console.log("Error fetching criterios_revision:", error);
            return res.status(500).json({ error: 'Error fetching criterios_revision' });
        }
        res.json(result.recordset);
    })
})

app.post('/api/evaluacion/prop', async (req, res) => {
    const evaluaciones = req.body;

    // Validación de datos de entrada
    if (!Array.isArray(evaluaciones) || evaluaciones.length === 0) {
        return res.status(400).json({ error: 'Faltan evaluaciones' });
    }

    try {
        for (const evaluacion of evaluaciones) {
            const { codigo_prop, codigo_cr, nota } = evaluacion;

            if (codigo_prop === undefined || codigo_cr === undefined || nota === undefined) {
                return res.status(400).json({ error: 'Faltan campos obligatorios en la evaluación' });
            }

            const request = new sql.Request();

            request.input('codigo_prop', sql.Int, codigo_prop);
            request.input('codigo_cr', sql.Int, codigo_cr);
            request.input('nota', sql.Int, nota); // Usamos Int para 1 o 0

            await request.query(`
                insert into Evaluacion_prop (codigo_prop, codigo_cr, nota)
                values (@codigo_prop, @codigo_cr, @nota);
            `);
        }

        res.status(201).json({ message: 'Evaluaciones registradas exitosamente' });
    } catch (error) {
        console.error('Error inserting evaluations:', error);
        res.status(500).json({ error: 'Error al registrar las evaluaciones' });
    }
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log("Server started on port", port);
});
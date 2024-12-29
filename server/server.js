const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 8081;

const sql = require("mssql/msnodesqlv8");
const config = {
    server: "JESUS\\SQLEXPRESS", // Change this to your SQL server name
    database: "Gestion_Tesis", // Change this to your database name
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

// CORS configuration
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Endpoint to register a specialty
app.post('/api/especialidad', (req, res) => {
    const { nombre_esp } = req.body;

    const request = new sql.Request();
    request.input('nombre_esp', sql.VarChar, nombre_esp);
    request.query('INSERT INTO Especialidades (nombre_esp) VALUES (@nombre_esp)', (error, result) => {
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
    request.query('INSERT INTO Consejos_Escuela (nro_Consejo, fecha_consejo) VALUES (@nro_Consejo, @fecha_consejo)', (error, result) => {
        if (error) {
            console.log("Error inserting consejo:", error);
            return res.status(500).send('Error inserting consejo');
        }
        res.status(201).send('Consejo registered successfully');
    });
});

// Serve static files (if you have a React frontend)
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle routes for the frontend (if necessary)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log("Server started on port", port);
});
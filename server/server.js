const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 8080;
const mysql = require("mysql");

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gestion_tesis",
});


app.use(express.static(path.join(__dirname, 'client/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log("Server started on port ", port);
});
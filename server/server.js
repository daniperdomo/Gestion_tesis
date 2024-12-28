const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 8080;
const mysql = require("mysql");

// const sql = require("mssql/msnodesqlv8")
// const config = {
//     server: "JESUS\\SQLEXPRESS", //Donde dice JESUS deben poner el nombre que les aparece a ustedes cuando ejecutan SQL Server
//     database: "Nomina",
//     driver: "msnodesqlv8",
//     options: {
//         trustedConnection: true
//     }
// }
// sql.connect (config, function(error) {
//     if(error) console.log(error)
//     var request = new sql.Request()
//     request.query("select * from info_gerencia", function(error, records){
//         if(error) console.log(error)
//         else console.log(records)
//     })
// })

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
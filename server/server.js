const express = require("express");
const app = express();

const cors = require("cors")
const corsOptions = {
    origin: ["http://localhost:5173"],
}

const mysql = require("mysql")
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gestion_tesis"
})

app.use(cors(corsOptions))

app.get("/api", (req, res) => {
    res.json({fruits: ["pineapple", "avocado", "mora"]})
})

app.get("/especialidades", (req, res) => {
        const sql = "select * from especialidades";
        db.query(sql, (error, data) => {
            if (error) return res.json(error);
            return res.json(data);
        });
    })

app.listen(8080, () => {
    console.log("server started on port 8080")
})
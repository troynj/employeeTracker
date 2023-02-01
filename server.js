const express = require("express")
const mysql = require('mysql2');

const PORT = process.env.PORT || 3002;
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function startDatabase() {
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dompany_db'
  },
  
);
// try to connect and if successful then log success await connection.connect ();
console. log ('Connected to the classlist db database.');
}
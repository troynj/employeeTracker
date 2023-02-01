const express = require("express")
const mysql = require('mysql2');

const PORT = process.env.PORT || 3002;
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);
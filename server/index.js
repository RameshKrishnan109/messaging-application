const express = require('express');
const { Client } = require('pg')
const shortid = require('shortid');
const cors = require('cors')

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres123',
    database: 'MessagesDb'
})

client.connect()

app.post("/register", async (req, res) => {

    let userExsits = false;

    let result = await client.query(`SELECT email from "Users" WHERE email='${req.body.email}'`);
    if (result.rowCount != 0) {
        userExsits = true;
    }

    if (!userExsits) { 

        client.query(`INSERT INTO "Users" (id,email,password,username) VALUES('${shortid.generate()}', '${req.body.email}', '${req.body.password}'), '${req.body.username}'`, (err, result) => {
            res.send({
                message: "User successfully added!!"
            })
        })
    }else{
        res.send({
            message: "User already exists"
        })
    }
})

app.post("/login", (req, res) => {

    const sql = `SELECT "id" FROM "Users" WHERE email='${req.body.email}' AND password='${req.body.password}'`
    client.query(sql, (err, result) => {
        if (result.rowCount == 0) {
            res.send({
                message: `Email or password is incorrect`
            })
        }else{
            res.send({
                message: "Login Success!!"
            })
        }
    })
})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);
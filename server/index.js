const express = require('express');
const path = require('path');
const pool = require('../db/queries.js');
const bodyParser = require('body-parser');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

// get info for all users
app.get('/api/users', (request, response) => {
    pool
        .query('SELECT * FROM USERS')
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            response.send(err);
        });
});

// get info for one user by id
app.get('/api/users/:id', (request, response) => {
    var id = request.params.id;
    pool
        .query(`SELECT * FROM users WHERE user_id = ${id}`)
        .then(res => {
            response.send(res.rows[0]);
        })
        .catch(err => {
            response.send(err);
        });
});

// post a new user into the database
app.post('/api/users', (request, response) => {
    console.log(request.body);
    response.send(request.body);
    const queryString = 'INSERT INTO users(firstname, lastname, email, username, password) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const queryValues = [request.body.firstname, request.body.lastname, request.body.email, request.body.username, request.body.password];
    pool
        .query(queryString, queryValues)
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            console.log(err);
        });
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
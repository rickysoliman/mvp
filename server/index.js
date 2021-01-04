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

// get all quiz results
app.get('/api/quizresults', (request, response) => {
    pool
        .query('SELECT * FROM quiz_results')
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            response.send(err);
        });
});

// get quiz results by user id
app.get('/api/quizresults/:user_id', (request, response) => {
    var id = request.params.id;
    pool
        .query(`SELECT * FROM quiz_results WHERE user_id = ${id}`)
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            response.send(err);
        });
});

// post a new user into the database
app.post('/api/users', (request, response) => {
    // console.log(request.body);
    // response.send(request.body);
    const queryString = 'INSERT INTO users(firstname, lastname, email, username, password) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const queryValues = [request.body.firstname, request.body.lastname, request.body.email, request.body.username, request.body.password];
    pool
        .query(queryString, queryValues)
        .then(res => {
            response.send(res.rows);
        })
        .catch(err => {
            response.send(err);
        });
});

// post a new quiz result into the database
app.post('/api/quizresults', (request, response) => {
    // console.log(request.body);
    // response.send(request.body);
    const queryString = 'INSERT INTO quiz_results(user_id, quiz_type, score) VALUES($1, $2, $3) RETURNING *';
    const queryValues = [request.body.userId, request.body.quizType, request.body.score];
    pool
        .query(queryString, queryValues)
        .then(res => {
            response.send(response.rows);
        })
        .catch(err => {
            response.send(err);
        });
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
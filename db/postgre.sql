\c dvdrental;

DROP DATABASE IF EXISTS theory_professor_users;

CREATE DATABASE theory_professor_users WITH OWNER rickymarasigan;

\c theory_professor_users;

CREATE SCHEMA theory_professor_users;

CREATE TABLE users (
    user_id SERIAL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE quiz_results (
    quiz_id SERIAL,
    user_id INT NOT NULL,
    quiz_type VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY (quiz_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
            REFERENCES users(user_id)
);

SELECT * FROM users;
SELECT * FROM quiz_results;

/*
\i '/Users/rickymarasigan/Desktop/mvp/db/postgre.sql';
*/
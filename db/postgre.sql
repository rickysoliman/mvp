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

SELECT * FROM users;

/*
\i '/Users/rickymarasigan/Desktop/mvp/db/postgre.sql';
*/
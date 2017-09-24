CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    displayname TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

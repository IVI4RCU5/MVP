DROP DATABASE IF EXISTS mvp;

CREATE DATABASE mvp;

USE mvp;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  author INT,
  recipient INT,
  content VARCHAR(300),
  FOREIGN KEY author REFERENCES users(id)
  FOREIGN KEY recipient REFERENCES users(id)
);

CREATE TABLE friends (
  user INT,
  friend INT,
  FOREIGN KEY user REFERENCES users(id),
  FOREIGN KEY friend REFERENCES users(id)
)
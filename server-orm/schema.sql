CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
   -- Describe your table here.
   text VARCHAR(140),
   user_id INT UNSIGNED NOT NULL,
   room_id INT UNSIGNED NOT NULL,
   message_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE users (
  username VARCHAR(30) DEFAULT 'anonymous',
  user_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE rooms (
  roomname VARCHAR(30) DEFAULT 'lobby',
  room_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
);
/* Create other tables and define schemas for them here! */




--   Execute this file from the command line by typing:
--  *    mysql -u root < server/schema.sql
--  *  to create the database and the tables.


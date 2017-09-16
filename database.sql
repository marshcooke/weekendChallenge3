-- Create database
CREATE DATABASE todo_app;

-- Create table
CREATE TABLE todos (
	id SERIAL PRIMARY KEY,
	task varchar(20),
	complete boolean
);
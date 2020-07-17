-- Drops the employee_db if it exists currently --
DROP DATABASE IF EXISTS employeeDB;
-- Creates the "employee_db" database --
CREATE DATABASE employeeDB;

-- Ensures that the query that follows will use employee_db --
USE employeeDB;

-- Creates the table "department" within employee_db --
CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL
);

-- Creates the table "role" within employee_db --
CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Creates the table "employee" within employee_db --
CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Inserting data into "department" table --
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Legal');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Engineering');

-- Inserting data into "role" table --
INSERT INTO role (title, salary, department_id) VALUES ('Accountant',75000,1);
INSERT INTO role (title, salary, department_id) VALUES ('Lawyer',300000,2);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing team',150000,3);
INSERT INTO role (title, salary, department_id) VALUES ('Software Dev',125000,4);

-- Inserting data into "employee" table --
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Ramon', 'De Luna',2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Victor', 'chambor',1,1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Amber','De Luna',4,1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Erik','De Luna',3,1);
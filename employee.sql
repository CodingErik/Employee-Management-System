ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Erikmysql'; 

CREATE DATABASE employeeDB;

USE employeeDB;


--  DEPARTMENT TABLE
CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
);

-- CREATING ROLE TABLE  
CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    salary DECIMAL NOT NULL,
    deparment_id INT,
    FOREIGN KEY (department_id) REFERENCES departement(id)
);

-- CREATING EMPLOYEE TABLE 
create table employee (
    id int primary key not null auto_increment,
    name text not null,
    manager_id int,
    foreign key (manager_id) references employee(id)
);



insert into employee (name, manager_id)
values('Mark', 1),
    ('Ariel', 2),
    ('Samir', 2),
    ('Ty', 1);
-- select A.name as 'Employee',
--     B.name as 'Manager'
-- from employee as A
--     Inner Join employee as B on A.manager_id = B.id;
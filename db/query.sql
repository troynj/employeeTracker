-- WHEN I choose to view all departments
-- THEN I am presented with a formatted table showing department names and department ids
-- SELECT name AS Name, id AS "Department ID" FROM department;

-- WHEN I choose to view all roles
-- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
-- SELECT role.title AS "Job Title",
--   role.id AS "Role ID",
--   department.name AS "Department",
--   CONCAT('$ ', role.salary) AS "Salary"
-- FROM role
--   LEFT JOIN department ON role.department_id = department.id;

-- WHEN I choose to view all employees
-- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
-- SELECT employee.id AS 'Employee ID', 
--        employee.first_name AS 'First Name', 
--        employee.last_name AS 'Last Name', 
--        role.title AS 'Job Title', 
--        department.name AS 'Department', 
--        role.salary AS 'Salary', 
--        CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager'
-- FROM employee
-- JOIN role ON employee.role_id = role.id
-- JOIN department ON role.department_id = department.id
-- LEFT JOIN employee AS manager ON employee.manager_id = manager.id
-- ORDER BY employee.id;

-- WHEN I choose to add a department
-- THEN I am prompted to enter the name of the department and that department is added to the database


-- WHEN I choose to add a role
-- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

-- WHEN I choose to add an employee
-- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

-- WHEN I choose to update an employee role
-- THEN I am prompted to select an employee to update and their new role and this information is updated in the database
INSERT INTO employee 
                                (first_name, last_name, role_id, manager_id)
                              VALUES 
                                (?, ?,
                                (SELECT role.id 
                                  FROM role WHERE role.title = ?),
                                (SELECT id 
                                  FROM  employee
                                    WHERE CONCAT(first_name, ' ',  last_name) = ?));
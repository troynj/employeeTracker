class Employee {
  constructor(connection) {
    this.connection = connection;
  }

  async viewEmployeeNames() {
    const viewNamesQuery = {
      sql: `SELECT CONCAT(first_name, ' ', last_Name) FROM employee`,
      rowsAsArray: true,
    };
    return new Promise((resolve, reject) => {
      this.connection.query(viewNamesQuery, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results.flat(1));
        }
      });
    });
  }

  async viewManagerNames() {
    const viewNamesQuery = {
      sql: `SELECT CONCAT(first_name, ' ', last_Name) FROM employee WHERE manager_id == null`,
      rowsAsArray: true,
    };
    return new Promise((resolve, reject) => {
      this.connection.query(viewNamesQuery, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results.flat(1));
        }
      });
    });
  }

  async viewOne(name) {
    const viewOneValue = [name];
    const viewOneQuery = `SELECT employee.id AS 'Employee ID ', 
    employee.first_name AS 'First Name ', 
    employee.last_name AS 'Last Name ', 
    role.title AS 'Job Title ', 
    department.name AS 'Department ', 
    role.salary AS 'Salary ', 
    CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager ' 
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  WHERE CONCAT(employee.first_name, ' ', employee.last_name) = (?)`;
    return new Promise((resolve, reject) => {
      this.connection.query(
        viewOneQuery,
        viewOneValue,
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            console.table(results);
            resolve(results);
          }
        }
      );
    });
  }

  async viewAll() {
    const viewAllQuery = `SELECT employee.id AS 'Employee ID ', 
                            employee.first_name AS 'First Name ', 
                            employee.last_name AS 'Last Name ', 
                            role.title AS 'Job Title ', 
                            department.name AS 'Department ', 
                            role.salary AS 'Salary ', 
                            CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager '
                          FROM employee
                            JOIN role ON employee.role_id = role.id
                            JOIN department ON role.department_id = department.id
                            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                          ORDER BY employee.id;`;
    return new Promise((resolve, reject) => {
      this.connection.query(viewAllQuery, function (err, results) {
        if (err) {
          reject(err);
        } else {
          console.table(results);
          resolve(results);
        }
      });
    });
  }

  async addEmployee(firstName, lastName, role, manager) {
    const addEmployeeValues = [firstName, lastName, role, manager];
    const addEmployeeQuery = `INSERT INTO employee 
                                (first_name, last_name, role_id, manager_id)
                              VALUES 
                                (?, ?,
                                (SELECT role.title 
                                  FROM role WHERE role.title = ?),
                                (SELECT manager.manager_id 
                                  FROM employee AS manager 
                                    WHERE CONCAT(manager.first_name, ' ', manager.last_name) = ?));`;

    return new Promise((resolve, reject) => {
      this.connection.query(
        addEmployeeQuery,
        addEmployeeValues,
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  async updateEmployeeRole(title, name) {
    const updateEmployeeValues = [title, name];
    const updateEmployeeQuery = `UPDATE employee
                                  SET role_id = 
                                    (SELECT id 
                                      FROM role 
                                        WHERE title = (?))
                                    WHERE CONCAT(first_name, ' ', last_name) = (?)`;

    return new Promise((resolve, reject) => {
      this.connection.query(
        updateEmployeeQuery,
        updateEmployeeValues,
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
}

module.exports = Employee;

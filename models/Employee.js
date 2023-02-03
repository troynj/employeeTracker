class Employee {
  constructor(connection) {
    this.connection = connection;
  }

  async viewNames() {
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
          console.log(typeof results);
          resolve(results);
        }
      });
    });
  }

  async addEmployee(firstName, lastName, roleId, managerId) {
    const addEmployeeValues = [firstName, lastName, roleId, managerId];
    const addEmployeeQuery = `INSERT INTO employee 
                                (first_name, last_name, role_id, manager_id)
                              VALUES 
                                (?, ?,
                                (SELECT role.title 
                                  FROM role WHERE role.title = ?),
                                (SELECT manager.manager_id 
                                  FROM employee AS manager 
                                    WHERE manager.first_name = ?));`;

    return new Promise((resolve, reject) => {
      this.connection.query(
        addEmployeeQuery,
        ...addEmployeeQuery,
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

  async updateEmployeeRole(title, first_name) {
    const updateEmployeeValues = [title, first_name];
    const updateEmployeeQuery = `UPDATE employee
                                  SET role_id = 
                                    (SELECT id 
                                      FROM role 
                                        WHERE title = ?)
                                    WHERE first_name = ?`;

    return new Promise((resolve, reject) => {
      this.connection.query(
        updateEmployeeQuery,
        ...updateEmployeeValues,
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

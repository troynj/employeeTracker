class Employees {
  constructor(connection) {
    this.connection = connection;
  }

  async viewAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM employee', function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async addEmployee(firstName, lastName, roleId, managerId) {
    return new Promise((resolve, reject) => {
this.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?)', [firstName, lastName, roleId, managerId]
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async updateEmployeeRole(roleId, employeeId) {
    return new Promise((resolve, reject) => {
      this.connection.query(`UPDATE employee SET role_id = (?) WHERE id = (?)`, [roleId, employeeId], function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Employees;

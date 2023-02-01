class Departments {
  constructor(connection) {
    this.connection = connection;
  }

  async viewAll() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM department', function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async addDepartment(departmentName) {
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO department (name) VALUES (?)', [departmentName], function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Departments;
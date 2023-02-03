class Department {
  constructor(connection) {
    this.connection = connection;
  }
  async viewTitles() {
    const viewTitlesQuery = {
      sql: `SELECT name FROM department;`,
      rowsAsArray: true,
    };

    return new Promise((resolve, reject) => {
      this.connection.query(viewTitlesQuery, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results.flat(1));
        }
      });
    });
  }

  async viewAll() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT name AS "Department Name", id AS "Department ID" FROM department;',
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            console.table(results)
            resolve(results);
          }
        }
      );
    });
  }
  async addDepartment(departmentName) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO department (name) VALUES (?)",
        departmentName,
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

module.exports = Department;

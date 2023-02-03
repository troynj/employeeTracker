class Role {
  constructor(connection) {
    this.connection = connection;
  }

  async viewTitles() {
    const viewTitlesQuery = {
      sql: `SELECT title FROM role`,
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
    const viewAllQuery = `SELECT 
                            role.title AS "Job Title",
                            role.id AS "Role ID",
                            department.name AS "Department",
                            CONCAT('$ ', role.salary) AS "Salary"
                          FROM role
                            LEFT JOIN department 
                              ON role.department_id = department.id;`;
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

  async addRole(title, salary, department) {
    const addRoleValues = [title, salary, department];
    const addRoleQuery = `INSERT INTO role 
                            (title, salary, department_id) 
                          VALUES
                            ( ?, ?,
                            (SELECT role.id 
                              FROM role 
                                WHERE role.name = ?))`;

    return new Promise((resolve, reject) => {
      this.connection.query(
        addRoleQuery,
        ...addRoleValues,
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

module.exports = Role;

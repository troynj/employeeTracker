class Role {
  constructor(connection) {
    this.connection = connection;
  }

  async viewTitles() {
    const viewTitlesQuery = {
      sql: `SELECT title FROM role;`,
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

  async viewOne(name) {
    const viewOneValue = [name];
    const viewOneQuery = `SELECT 
    role.title AS "Job Title",
    role.id AS "Role ID",
    department.name AS "Department",
    CONCAT('$ ', role.salary) AS "Salary"
  FROM role
    LEFT JOIN department 
      ON role.department_id = department.id
      WHERE role.title = ?`;
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
    const addRoleValues = [title, Number(salary), department];
    console.log("addRole()", addRoleValues);
    const addRoleQuery = `INSERT INTO role 
                            (title, salary, department_id) 
                          VALUES
                            (?, ?, (SELECT department.id FROM department WHERE department.name = ?));`;

    return new Promise((resolve, reject) => {
      this.connection.query(
        addRoleQuery,
        addRoleValues,
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

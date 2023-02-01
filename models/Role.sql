class Role {
  constructor(connection) {
    this.connection = connection;
  }

  async viewAllRoles() {
    return new Promise((resolve, reject) => {
      this.connection.query(`SELECT * FROM role`, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async addRole(title, salary, department_id) {
    return new Promise((resolve, reject) => {
      this.connection.query(`INSERT INTO role (title, salary, department_id) 
                             VALUES (?, ?, ?)`,
                             [title, salary, department_id] ,
                             function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Role;

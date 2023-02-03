const inquirer = require("inquirer");
const Department = require("./models/Department");
const Employee = require("./models/Employee");
const Role = require("./models/Role");
const connection = require("./connection");
const department = new Department(connection);
const role = new Role(connection);
const employee = new Employee(connection);

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          new inquirer.Separator(),
          "Exit",
        ],
      },
    ])
    .then(async ({ action }) => {
      var response = "";
      switch (action) {
        case "View All Departments":
          department.viewAll();
          break;
        case "View All Roles":
          role.viewAll();
          break;
        case "View All Employees":
          employee.viewAll();
          break;
        case "Add a Department":
          response = await buildResponse("enter", "department", ["title"]);
          console.log("department: ", response);
          department.addDepartment(response);
          break;
        case "Add a Role":
          response = buildResponse("enter", "role", [
            "name",
            "salary",
            "department",
          ]);
          role.addRole(response);
          // console.log(response);
          break;
        case "Add an Employee":
          response = buildResponse("enter", "employee", [
            "first name",
            "last name",
            "role",
            "manager",
          ]);
          emp.addEmployee(response);
          // console.log(response);
          break;
        case "Update an Employee Role":
          const resName = await buildResponse("select", "employee", ["name"]);
          const resRole = await buildResponse("select", "role", ["title"]);
          const fnArr= resName[0].split(' ')
          console.log(fnArr[0])
          console.log("BACK", resName, resRole);
          employee.updateEmployeeRole(resRole, fnArr[0]);
          break;
        default:
          break;
      }
    });
}

async function buildResponse(method, table, column) {
  var outputArr = [];
  for (var i = 0; i < column.length; i++) {
    if (method === "enter") {
      const { ans } = await enter(column[i], table);
      console.log(ans);
      outputArr.push(ans);
    } else if (method === "select") {
      var promptArr = [];
      if (table === "employee") {
        promptArr = await employee.viewNames();
      } else if (table === "role") {
        promptArr = await role.viewTitles();
      }
      const { ans } = await select(column[i], table, promptArr);
      console.log(ans);
      outputArr.push(ans);
    }
  }
  console.log("outputArr", outputArr);
  return outputArr;
}

async function enter(column, table, promptArr) {
  return await inquirer.prompt([
    {
      name: "ans",
      message: `Enter the ${column} of the ${table}`,
    },
  ]);
}

async function select(column, table, promptArr) {
  return await inquirer.prompt([
    {
      type: "list",
      name: "ans",
      message: `Select the ${column} of the ${table}`,
      choices: promptArr,
    },
  ]);
}

module.exports = mainMenu;

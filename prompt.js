const inquirer = require("inquirer");
const Department = require("./models/Department");
const Employee = require("./models/Employee");
const Role = require("./models/Role");
const connection = require("./config/connection");
const department = new Department(connection);
const role = new Role(connection);
const employee = new Employee(connection);

async function mainMenu() {
  await inquirer
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
          // console.log("department: ", response);
          department.addDepartment(response);
          department.viewOne(response)
          break;
        case "Add a Role":
          response = await buildResponse("enter", "role", ["name", "salary"]);
          const inputdept = await buildResponse("select", "department", [
            "title",
          ]);
          role.addRole(...response, ...inputdept);
          role.viewOne(response[0]);
          // console.log(response);
          break;
        case "Add an Employee":
          const tempName = await buildResponse("enter", "employee", [
            "first name",
            "last name",
          ]);
          const tempRole = await buildResponse("select", "role", ["title"]);
          console.log("abouttoenter");
          const tempMan = await buildResponse("select", "manager", ["name"]);
          console.log("tempName", tempName);
          // console.log("td", tempRole);
          // console.log("tm", tempMan);
          employee.addEmployee(...tempName, tempRole, tempMan);
          employee.viewOne(...tempName);
          // console.log(response);
          break;
        case "Update an Employee Role":
          const resName = await buildResponse("select", "employee", ["name"]);
          const resRole = await buildResponse("select", "role", ["title"]);
          console.log("resName", resName[0]);
          employee.updateEmployeeRole(...resRole, resName[0]);
          var passer = resName[0].split(' ')
          employee.viewOne(...passer);
          break;
        case "Exit":
          return true;
        default:
          break;
      }
    });
  return false;
}

async function buildResponse(method, table, column) {
  var outputArr = [];
  for (var i = 0; i < column.length; i++) {
    if (method === "enter") {
      const { ans } = await inquirer.prompt([
        {
          name: "ans",
          message: `Enter the ${column[i]} of the ${table}`,
        },
      ]);
      // console.log(ans);
      outputArr.push(ans);
    } else if (method === "select") {
      var promptArr = [];
      if (table === "employee") {
        promptArr = await employee.viewEmployeeNames();
      } else if (table === "manager") {
        promptArr = await employee.viewManagerNames();
      } else if (table === "role") {
        promptArr = await role.viewTitles();
      } else if (table === "department") {
        promptArr = await department.viewTitles();
      }
      const { ans } = await inquirer.prompt([
        {
          type: "list",
          name: "ans",
          message: `Select the ${column[i]} of the ${table}`,
          choices: promptArr,
        },
      ]);
      // console.log(ans);
      outputArr.push(ans);
    }
  }
  // console.log("outputArr", outputArr);
  return outputArr;
}

module.exports = mainMenu;

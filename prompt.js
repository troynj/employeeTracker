const inquirer = require('inquirer')

const choices = [
  'View All Departments',
  'View All Roles',
  'View All Employees',
  'Add a Department',
  'Add a Role',
  'Add an Employee',
  'Update an Employee Role',
  'new inquirer.Separator()',
  'Exit'
];

inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: choices.map(choice => {
        return {
          name: choice,
          value: choice
        };
      })
    }
  ])
  .then(async({ action }) => {
  
    switch (action) {
      case 'View All Departments':
        departments.viewAll()
      break;
      case 'View All Roles':
        roles.viewAll()
      break;
      case 'View All Employees':
        employees.viewAll()
      break;
      case 'Add a Department':
        departments.viewAll()
      break;
      case 'Add a Role':
       await addRolePrompt()
      break;
      case 'Add an Employee':
        await addEmployeePrompt()
      break;
      case 'Update an Employee Role':
await updateEmployeeRolePrompt()
      break;
      default:

      break;
    }  });

    function addRolePrompt() {
      inquirer.prompt([
        {
          name: 'title',
          message: 'Enter the Title: '
        },
        {
          name: 'salary',
          message: 'Enter the Salary: '
        }
      ]).then(({title, salary}) => {

        if (!title || !salary) {
          console.log("error")
        }

        if(typeof Number(salary) !== "number") {
          console.log("error")
        }
        else {
          Number(salary)
          roles.addRole(title, salary, id) //get id from list
        }
      })
    }
    function addEmployeePrompt() {
      inquirer.prompt([
        {
          name: 'title',
          message: 'Enter the First Name: '
        },
        {
          name: 'salary',
          message: 'Enter the Last Name: '
        },
        {
          name: 'salary',
          message: 'Enter the Role ID: ' //get from list
        },
        {
          name: 'salary',
          message: 'Enter the Manager ID: ' // get from list
        }
      ]).then(({title, salary}) => {

        if (!title || !salary) {
          console.log("error")
        }

        if(typeof Number(salary) !== "number") {
          console.log("error")
        }
        else {
          Number(salary)
          roles.addRole(title, salary, id)
        }
      })
    }
    function addEmployeeRolePrompt()
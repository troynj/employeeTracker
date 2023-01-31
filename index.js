const inquirer = require("inquirer");

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "Make a Selection:",
        choices: [
          "View all Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
        ],
      },
    ])
    .then(({ menu }) => {
      switch (menu) {
        case "View all Employees":console.log("Entered")
          break;
        case "Add a Department":
          break;
        case "Add a Role":
          break;
        case "Add an Employee":
          break;
        case "Update an Employee Role":
          break;
          default: console.log("No Conditions Met")
      }
    });
}

mainMenu();

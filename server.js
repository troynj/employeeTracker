const connection = require("./config/connection");
const init = require("./prompt");


  connection.connect((err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`Connected to the Database.`);
    init();
  });


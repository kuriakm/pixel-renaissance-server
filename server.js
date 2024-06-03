// Standard setup
// Require express to start code
const express = require("express");
// Require cors to start code
const cors = require("cors");
/* Set app to express application */
const app = express();
app.use(express.static("public"));
app.use(cors());

/* Checks if port is accessed */
app.listen(3001, () => {
  console.log("I'm listening");
});

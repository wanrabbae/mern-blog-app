require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./src/router/routes");

require("./config/db");

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", routes);

module.exports = app;

app.listen(port, () => console.log(`Server run in http://localhost:${port}`));

//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDUzODliYWQ2ZjM1MWExYjYyYzBjNSIsImlhdCI6MTYzMjAxOTkyNywiZXhwIjoxNjMyMDIyOTI3fQ.mJLjziDh67lj8uqArE5-6FQWiOVtOH5MkjL3NNmn-6o

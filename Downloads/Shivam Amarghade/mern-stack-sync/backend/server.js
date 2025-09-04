const express = require("express");
const bodyParser = require("express").json;
const initDb = require("./src/initDb");
const tasksRouter = require("./src/routes/tasks");

const PORT = process.env.PORT || 3000;

initDb();

const app = express();
app.use(bodyParser());

app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

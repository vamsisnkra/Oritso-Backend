const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/tasks", taskRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

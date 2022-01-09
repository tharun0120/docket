require("dotenv").config();
const express = require("express");
const connectDB = require("./db/mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev", {}));
app.use(userRouter);
app.use(taskRouter);

// app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

app.get("/test", (req, res) => {
  res.status(200).send("Server is up and running Successfully");
});

app.listen(port, () => {
  console.log("Server is up on Port " + port);
});

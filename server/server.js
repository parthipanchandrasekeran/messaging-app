const express = require("express");
const { createServer } = require("http");
const socketIO = require("socket.io");
const app = express();
const { v4: uuidv4 } = require("uuid");
const server = createServer(app);

const cors = require("cors");
const io = socketIO(server, { cors: { origin: "*" } });

require("dotenv").config();
const { PORT } = process.env || 5000;

//require routes
const mesages = require("./routes/messages");
const users = require("./routes/users");

app.use(cors());
app.use(express.json());

//app.use("/static", express.static("public"));

app.use((req, res, next) => {
  req.io = io;
  console.log("started");
  return next();
});

app.use("/messages", mesages);
app.use("/users", users);

server.listen(PORT, () => {
  console.log("server runs at " + PORT);
});

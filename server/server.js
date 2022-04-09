const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const cors = require("cors");

require("dotenv").config();
const { PORT } = process.env;

//require routes
const mesages = require("./routes/messages");
const users = require("./routes/users");

app.use(cors());
app.use(express.json());
//app.use("/static", express.static("public"));
app.use("/messages", mesages);
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

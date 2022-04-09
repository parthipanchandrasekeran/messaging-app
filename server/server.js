const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const cors = require("cors");

require("dotenv").config();
const { PORT } = process.env;

//require routes
const warehouse = require("./routes/warehouse");
const inventory = require("./routes/inventory");

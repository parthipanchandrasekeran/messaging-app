const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4 } = require("uuid");

require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;

// // Read data file
function readUsers() {
  const userData = fs.readFileSync("./data/userlist.json");
  const parsedData = JSON.parse(userData);
  return parsedData;
}

// // Write data file
function writeUsers(data) {
  fs.writeFileSync("./data/userlist.json", JSON.stringify(data));
}

// // Read data file
function readMessages() {
  const messageData = fs.readFileSync("./data/master.json");
  const parsedData = JSON.parse(messageData);
  return parsedData;
}

// // Write data file
function writeMessages(data) {
  fs.writeFileSync("./data/master.json", JSON.stringify(data));
}

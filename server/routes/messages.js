const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4 } = require("uuid");
const moment = require("moment");
require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;
const app = express();

// Read data file
function readMessages() {
  const messageData = fs.readFileSync("./data/master.json");
  const parsedData = JSON.parse(messageData);
  return parsedData;
}

// // Write data file
function writeMessages(data) {
  fs.writeFileSync("./data/master.json", JSON.stringify(data));
}

//create new conversation post call

router.route("/:userid").post((req, res) => {
  let messages = readMessages();
  const newConversation = {
    conversationid: v4(),
    conversation: "Group",
    totaluserid: [req.params.userid, req.body.subuserid],
    created: moment().format(),
    conversations: [],
  };
  messages.unshift(newConversation);
  writeMessages(messages);
  console.log("New Conversation created");
  res.status(200).send(newConversation);
});

module.exports = router;

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

//get list of conversations

router.route("/:userid").get((req, res) => {
  const messages = readMessages();

  const finalList = messages.filter((message) => {
    return message.totaluserid.find((submessageid) => {
      if (submessageid === req.params.userid) {
        return message;
      }
    });
  });
  finalList.length >= 1
    ? (res.status(200).send(finalList),
      console.log("Get Message List call passed"))
    : (res.status(400).send("No Valid Match Found/Invalid Request"),
      console.log("No Valid Conversation returned by Get conversation call"));
});

//Post call Add new message to existing conversation list

router.route("/add/:conversationid").post((req, res) => {
  const messages = readMessages();

  let modifiedList = messages.filter((message) => {
    return message.conversationid !== req.params.conversationid;
  });

  let selectedConversation = messages.find((message) => {
    return message.conversationid === req.params.conversationid;
  });

  selectedConversation.conversations.unshift({
    userid: req.body.userid,
    username: req.body.username,
    message: req.body.message,
    timestamp: moment().format(),
  });
  modifiedList.unshift(selectedConversation);
  writeMessages(modifiedList);

  res.status(200).send(modifiedList);
  console.log(modifiedList);
});
module.exports = router;

const express = require("express");
const router = express.Router();
const fs = require("fs");
const moment = require("moment");
const { v4 } = require("uuid");
require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;
const app = express();

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

//Get Route userlist
router.route("/:userid").get((req, res) => {
  const userlist = readUsers();
  const userListUpdated = userlist.find((user) => {
    return req.params.userid === user.userid;
  });
  console.log("Reading User List");
  userListUpdated
    ? res.status(200).send(userListUpdated)
    : res.status(400).send("User ID does not exit or User ID format Invalid");
});

//Add new user to existing userlist

router.route("/:userid/add-user").post((req, res) => {
  userListInfoValidator(req.body)
    ? (res
        .status(200)
        .send(
          newUserAddition(req.params.userid, req.body.userAdded[0].username)
        ),
      writeUsers(
        newUserAddition(req.params.userid, req.body.userAdded[0].username)
      ),
      console.log("New User Added"))
    : res
        .status(400)
        .send(
          "Invalid entries sent - no action done on server. Fix and Resend"
        );
});

function userListInfoValidator(data) {
  if (data.userid && data.username && data.userAdded[0].username) {
    return true;
  } else {
    return false;
  }
}

function newUserAddition(userid, username) {
  const userlist = readUsers();
  let modifiedUserlist = userlist;

  const userDataAddition = {
    userid: v4(),
    username: username,
    created: moment().format(),
  };
  userlist.forEach((user, index) => {
    if (user.userid === userid && username) {
      modifiedUserlist[index].userAdded.unshift(userDataAddition);
      return;
    } else {
      return;
    }
  });

  return modifiedUserlist;
}

module.exports = router;

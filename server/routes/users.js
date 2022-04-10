const express = require("express");
const router = express.Router();
const fs = require("fs");
const moment = require("moment");
const { v4 } = require("uuid");
require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;
const app = express();

// useful functions -- begins

//checks new user list request has all required entries

function userListInfoValidator(data) {
  if (data.userid && data.username && data.userAdded[0].username) {
    return true;
  } else {
    return false;
  }
}

//adds new user accepts userid and username of new user
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

// useful functions -- Ends

//Route call begins

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

//Create new user and user ID

router.route("/newuser").post((req, res) => {
  const userlist = readUsers();

  if (req.body.username) {
    const newUser = {
      userid: v4(),
      username: req.body.username,
      created: moment().format(),
      lastLogged: moment().format(),
      userAdded: [
        {
          userid: "",
          username: "",
          created: "",
        },
      ],
    };
    let updatedList = userlist;
    updatedList.unshift(newUser);
    res.status(200).send(updatedList[0]);
    writeUsers(updatedList);
    console.log("New User Created and Added");
  } else {
    res.status(400).send("Invalid UserName or Missing Parameters");
  }
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

//Delete user from existing list

router.route("/:userid/delete/:subuserid").delete((req, res) => {
  const userlist = readUsers();
  let finalList = userlist.find((user) => {
    return req.params.userid === user.userid;
  });

  if (finalList) {
    const userListUpdated = finalList.userAdded.filter((subuser) => {
      return subuser.userid !== req.params.subuserid;
    });

    finalList.userAdded = userListUpdated;

    const listToWrite = userlist.map((user) => {
      if (user.userid === req.params.userid) {
        return finalList;
      } else {
        return user;
      }
    });

    listToWrite
      ? (res.status(200).send(listToWrite),
        writeUsers(listToWrite),
        console.log("SubUser Deleted Successfully"))
      : console.log("No Data Deleted");
  } else {
    res.status(400).send("Invalid Entries - no action performed on database");
  }
});

module.exports = router;

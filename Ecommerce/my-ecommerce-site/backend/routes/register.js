const express = require("express");
const router = express.Router();

/*
1. read existing JSON 
*/
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  const { fname, lname, occupation_cat, occupation, email, password } =
    req.body;
  const newUser = { fname, lname, occupation_cat, occupation, email, password };
  // const subscribe = { subscribeAt : new Date(), email}

  const filePath = path.join(__dirname, "..", "data", "user.json");
  // step 1 - 2 : read the existing file and parse it into an array
  let users = [];
  if (fs.existsSync(filePath)) {
    let data = fs.readFileSync(filePath, "utf-8");
    users = JSON.parse(data);

    const duplicate = users.find((user) => user.email === email);
    if (duplicate) {
      return res.status(409).json({ status: "This email has already been used." });
    }
    //step 3 append new data
    users.push(newUser);
    // step 4 write array back into file

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.status(200).json({ status: "Register successfully", newUser });
  } else {
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.status(200).json({ status: "Register successfully", newUser });
  }
});

module.exports = router;


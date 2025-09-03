const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  const { username, password } = req.body;

  const filePath = path.join(__dirname, "../data/user.json");
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "No registered users found." });
  }

  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const foundUser = users.find((user) => user.email === username);

  if (!foundUser) {
    return res.status(401).json({ message: "Incorrected Username" });
  }

  if (foundUser.password !== password) {
    return res.status(401).json({ message: "Incorrected Password" });
  }

  return res.status(200).json({ message: "Login successfully" });

});

module.exports = router;

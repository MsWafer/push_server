const express = require("express");
const router = express.Router();
const gcm = require("node-gcm");
require("dotenv").config();
const sender = new gcm.Sender(process.env.API_KEY_BURO);

//push
router.post("/", async (req, res) => {
  try {
    if (req.body.key != process.env.PUSH_SERVER_KEY) {
      return res.status(401).json({ err: "Неверный ключ" });
    }
    let message = new gcm.Message(req.body.message);
    sender.send(
      message,
      { registrationTokens: req.body.tokens },
      function (err, response) {
        if (err) {
          console.error(err);
          return res.json(err);
        } else {
          console.log(response);
          return res.json(response);
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: "server error" });
  }
});

module.exports = router;

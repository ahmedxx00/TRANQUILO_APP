const express = require("express");
const router = express.Router();

const needle = require("needle");

var { google } = require("googleapis");
var MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
var SCOPES = [MESSAGING_SCOPE];

var project_id = "tranquilo-22a58";

//######################################################################

module.exports = router;

//#####################################################################

router.post("/send", async (req, res, next) => {
  let post_data = req.body; // get post body

  let receiver_token = post_data.receiver_token;
  let sender_app_name = post_data.sender_app_name;
  let sender = post_data.sender;
  let title = post_data.title;
  let message = post_data.message;

  let access_token = await getAccessToken()
    .then((acc_tk) => acc_tk)
    .catch((error) => {
      res.end();
    });

  var options = {
    "headers": {
      "Authorization": "Bearer " + access_token,
      "Content-Type" : "application/json",
    },
  };

  needle.post(
    "https://fcm.googleapis.com/v1/projects/" + project_id + "/messages:send",
    JSON.stringify({
      message: {
        token: receiver_token,
        data: {
          sender: sender,
          sender_app_name: sender_app_name,
          title: title,
          message: message,
        },
      },
    }),
    options,
    function (err, response, body) {
      res.end();
      // console.log(body);
    }
  );
});

function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const key = require("../tranquilo-22a58-service_account.json");
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

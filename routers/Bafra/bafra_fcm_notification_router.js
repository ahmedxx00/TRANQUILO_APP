const express = require("express");
const router = express.Router();

const needle = require("needle");

var { google } = require("googleapis");
var MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
var SCOPES = [MESSAGING_SCOPE];

var project_id = "bafra-24bea";

//######################################################################

module.exports = router;

//#############[ sending data msg to single device ]####### without npm firebase-admin package #############
// ############ of course we can use firebase-admin to send for single device as well like below  #########
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
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
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
      // if(err){
      //   res.status(200);
      //   res.json({
      //     success: "false",
      //     msg: "not sent : " + err.message,
      //   });
      // }else{
      //   res.status(200);
      //   res.json({
      //     success: "true",
      //     msg: "sent",
      //   });
      // }

      res.end();

      // console.log(body);
    }
  );
});

function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const key = require("../../bafra-24bea-531f241fecdf.json");
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
//#############[ sending to multiple devices ]####### with firebase-admin package #############

const messaging = require("../../bafra_firebase_admin_config");

router.post("/sendToAll", async (req, res, next) => {
  let post_data = req.body; // get post body

  let rec_tks = JSON.parse(post_data.rec_tks); // JsonObject has -> List<String> rec_tokens
  let sender_app_name = post_data.sender_app_name;
  let sender = post_data.sender;
  let title = post_data.title;
  let message = post_data.message;

  let Msg = {
    token: "",
    data: {
      sender: sender,
      sender_app_name: sender_app_name,
      title: title,
      message: message,
    },
  };

  let rec_tokens = rec_tks["rec_tokens"];
  rec_tokens.forEach((tk) => {
    Msg["token"] = tk;
    messaging
      .send(Msg)
      .then((response) => {})
      .catch((error) => {});
  });

});


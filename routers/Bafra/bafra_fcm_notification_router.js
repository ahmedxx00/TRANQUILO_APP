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

/*
router.post("/send", async (req, res, next) => {
  let post_data = req.body; // get post body

  let android_version = parseInt(post_data.android_version);
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

  let payload;

  if (android_version <= 28) {
    // less than android 9 → data-only
    payload = {
      message: {
        token: receiver_token,
        data: {
          sender: sender,
          sender_app_name: sender_app_name,
          title: title,
          message: message,
        },
      },
    };
  } else {
    // android 10 or higher → data + notification payload
    payload = {
      message: {
        token: receiver_token,
        android: {
          priority: "HIGH",
          ttl: 3600000, // hour
          notification: {
            channel_id: "bafra_notification", // same notification channel name in android
          },
        },
        notification: {
          title: title,
          body: message,
        },
        data: {
          sender: sender,
          sender_app_name: sender_app_name,
          title: title,
          message: message,
        },
      },
    };
  }
  needle.post(
    "https://fcm.googleapis.com/v1/projects/" + project_id + "/messages:send",
    JSON.stringify(payload),
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
*/
//#############[ sending to multiple devices ]####### with firebase-admin package #############

const messaging = require("../../bafra_firebase_admin_config");

router.post("/send", (req, res, next) => {
  let post_data = req.body; // get post body

  let android_version = parseInt(post_data.android_version);
  let receiver_token = post_data.receiver_token;
  let sender_app_name = post_data.sender_app_name;
  let sender = post_data.sender;
  let title = post_data.title;
  let message = post_data.message;

  let Msg = null;

  if (android_version <= 28) {
    // less than android 9 → data-only
    Msg = {
      token: receiver_token,
      data: {
        sender: sender,
        sender_app_name: sender_app_name,
        title: title,
        message: message,
      },
    };
  } else {
    // android 10 or higher → data + notification payload
    Msg = {
      token: receiver_token,
      android: {
        priority: "HIGH",
        ttl: 3600000, // hour
        notification: {
          channel_id: "bafra_notification", // same notification channel name in android
        },
      },
      notification: {
        title: title,
        body: message,
      },
      data: {
        sender: sender,
        sender_app_name: sender_app_name,
        title: title,
        message: message,
      },
    };
  }
  if (Msg != null) {
    messaging
      .send(Msg)
      .then((response) => {})
      .catch((error) => {});
  }
});

router.post("/sendToAll", (req, res, next) => {
  let post_data = req.body; // get post body

  let rec_tks = JSON.parse(post_data.rec_tks); // JsonObject has -> List<Object> rec_tokens
  let sender_app_name = post_data.sender_app_name;
  let sender = post_data.sender;
  let title = post_data.title;
  let message = post_data.message;

  let rec_tokens = rec_tks["rec_tokens"];

  rec_tokens.forEach((obj) => {
    let Msg;

    if (parseInt(obj["android_version"]) <= 28) {
      // less than android 9 → data-only
      Msg = {
        token: obj["token"],
        data: {
          sender: sender,
          sender_app_name: sender_app_name,
          title: title,
          message: message,
        },
      };
    } else {
      // android 10 or higher → data + notification payload
      Msg = {
        token: obj["token"],
        android: {
          priority: "HIGH",
          ttl: 3600000, // hour
          notification: {
            channel_id: "bafra_notification", // same notification channel name in android
          },
        },
        notification: {
          title: title,
          body: message,
        },
        data: {
          sender: sender,
          sender_app_name: sender_app_name,
          title: title,
          message: message,
        },
      };
    }
    messaging
      .send(Msg)
      .then((response) => {})
      .catch((error) => {});
  });
});

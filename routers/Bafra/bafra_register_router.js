const express = require("express");
const router = express.Router();

const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil
// const ObjectId = require("mongodb").ObjectId;

const CONSTANTS = require("../../CONSTANTS");

module.exports = router;

//#################### [  bafra APP  ] ###############################
router.post("/user", (req, res, next) => {
  // --[ bafra ]--
  let post_data = req.body; // get post body

  let phone = post_data.phone;
  let plain_pass = post_data.password;

  let enc_pass = CONSTANTS.encrypt(plain_pass); // get encrypted password

  db.collection("bafra_users").findOne({ phone: phone }, (err, result1) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result1) {
        res.status(200);
        res.json({
          success: "false",
          msg: "already_registered",
        });
      } else {
        db.collection("bafra_users").insertOne(
          {
            phone: phone,
            password: enc_pass,
            blocked: false,
            created_at: new Date(), // UTC Date
          },
          (err, result2) => {
            if (err) {
              res.status(200);
              res.json({
                success: "false",
                msg: "query 2 error",
              });
            } else {
              db.collection("our_bafra_clients").insertOne(
                {
                  phone: phone,
                  num_of_success_orders: parseInt(0),
                  total_at_last_gift: parseInt(0),
                  next_gift_due: parseInt(0),
                  grand_total: parseInt(0),
                  created_at: new Date(),
                },
                (err, result3) => {
                  if (err) {
                    res.status(200);
                    res.json({
                      success: "false",
                      msg: "query 3 error",
                    });
                  } else {
                    res.status(201);
                    res.json({
                      success: "true",
                      msg: "user register successful",
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});
//#####################################################################

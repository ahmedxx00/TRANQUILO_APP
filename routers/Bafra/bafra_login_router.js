const express = require("express");
const router = express.Router();

const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil

const CONSTANTS = require("../../CONSTANTS");
// const ObjectId = require("mongodb").ObjectId;

module.exports = router;

//#################### [  bafra APP  ] ###############################
router.post("/user", (req, res, next) => {
  // --[ bafra ]--
  let post_data = req.body; // get post params
  let phone = post_data.phone; // get phone
  let plain_pass = post_data.password;
  let enc_pass = CONSTANTS.encrypt(plain_pass); // get encrypted password

  db.collection("bafra_users").findOne({ phone: phone }, (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        // if user matches
        if (result.blocked == false) {
          if (result.password == enc_pass) {
            //###################################
            res.status(200);
            res.json({
              success: "true",
              msg: result.phone,
            });
            //####################################
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "wrong_password",
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "blocked",
          });
        }
      } else {
        // no bafraUser matches
        res.status(200);
        res.json({
          success: "false",
          msg: "not_exists",
        });
      }
    }
  });
});

//#################### [  BA APP  ] ###############################
router.post("/admin", (req, res, next) => {
  // --[ BA ]--
  let post_data = req.body; // get post params
  let phone = post_data.phone; // get phone
  let plain_pass = post_data.password;
  let enc_pass = CONSTANTS.encrypt(plain_pass); // get encrypted password

  db.collection("bafra_admins").findOne({ phone: phone }, (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        // if bafraAdmin matches
        if (result.blocked == false) {
          if (result.password == enc_pass) {
            //###################################
            res.status(200);
            res.json({
              success: "true",
              msg: result.phone,
            });
            //####################################
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "wrong_password",
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "blocked",
          });
        }
      } else {
        // no bafraAdmin matches
        res.status(200);
        res.json({
          success: "false",
          msg: "not_exists",
        });
      }
    }
  });
});

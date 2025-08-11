const express = require("express");
const router = express.Router();

const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil

const CONSTANTS = require("../../CONSTANTS");
// const ObjectId = require("mongodb").ObjectId;

module.exports = router;

//#################### [  Dakhakhny APP  ] ###############################
router.post("/user", async (req, res, next) => {
  // --[ Dakhakhny ]--
  let post_data = req.body; // get post params
  let phone = post_data.phone; // get phone
  let plain_pass = post_data.password;
  let enc_pass = await CONSTANTS.encrypt(plain_pass); // get encrypted password

  db.collection("dakhakhny_users").findOne({ phone: phone }, (err, result) => {
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
        // no dakhakhnyUser matches
        res.status(200);
        res.json({
          success: "false",
          msg: "not_exists",
        });
      }
    }
  });
});

//#################### [  DA APP  ] ###############################
router.post("/admin", async (req, res, next) => {
  // --[ DA ]--
  let post_data = req.body; // get post params
  let phone = post_data.phone; // get phone
  let plain_pass = post_data.password;
  let enc_pass = await CONSTANTS.encrypt(plain_pass); // get encrypted password

  db.collection("dakhakhny_admins").findOne({ phone: phone }, (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        // if dakhakhnyAdmin matches
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
        // no dakhakhnyAdmin matches
        res.status(200);
        res.json({
          success: "false",
          msg: "not_exists",
        });
      }
    }
  });
});

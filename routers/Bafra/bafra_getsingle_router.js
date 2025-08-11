const express = require("express");
const router = express.Router();

const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil

const CONSTANTS = require("../../CONSTANTS");
module.exports = router;
// const ObjectId = require("mongodb").ObjectId;


//#################### [  bafra APP  ] ######################
router.get("/gift", (req, res, next) => {
  
  let phone = req.query.phone; // login_phone

  db.collection("bafra_gifts")
    .find({
      phone: phone,
    })
    .sort({ created_at: -1 })
    .limit(1)
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items && items.length > 0) {
          let item = items[0]; // only one

          let x = item.user_added_wallet_number;
          let y = item.user_got_his_money;

          if (!x && !y) {
            // no wallet number && no transfer occured
            res.status(200);
            res.json({
              success: "true",
              msg: "user_has_gift_waiting_for_wallet_number",
              gift: item,
            });
          } else if (x && !y) {
            // wallet number added && no transfer occured
            res.status(200);
            res.json({
              success: "false",
              msg: "user_has_gift_waiting_for_money_transfer",
              gift: item,
            });
          } else if (x && y) {
            // wallet number added && transfer occured
            res.status(200);
            res.json({
              success: "false",
              msg: "user_has_no_gift",
            });
          }
        } else {// no gift inside db 
          res.status(200);
          res.json({
            success: "false",
            msg: "user_has_no_gift",
          });
        }
      }
    });
});
//#################### [  OWNER APP  ] ###############################

router.get("/userPassword", (req, res, next) => {
  let phone = req.query.phone;

  db.collection("bafra_users").findOne({ phone: phone }, async (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        let plain = await CONSTANTS.decrypt(result.password);
        res.status(200);
        res.json({
          success: "true",
          msg: plain,
        });
      } else {
        res.status(200);
        res.json({
          success: "false",
          msg: "no password for this bafra",
        });
      }
    }
  });
});

router.get("/adminPassword", (req, res, next) => {
  let phone = req.query.phone;

  db.collection("bafra_admins").findOne({ phone: phone }, async (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        let plain = await CONSTANTS.decrypt(result.password);
        res.status(200);
        res.json({
          success: "true",
          msg: plain,
        });
      } else {
        res.status(200);
        res.json({
          success: "false",
          msg: "no password for this admin",
        });
      }
    }
  });
});



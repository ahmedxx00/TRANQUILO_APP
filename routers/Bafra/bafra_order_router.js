const express = require("express");
const router = express.Router();

const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil
const ObjectId = require("mongodb").ObjectId;

module.exports = router;

// const CONSTANTS = require("../CONSTANTS");
// const pool = CONSTANTS.pool;

// router.post("/createy", (req, res, next) => {
//   // --[ UAPP ]--

//   let oArray = JSON.parse(req.body.oArray); // length now 4

//   // let ordTime = new Date().toLocaleTimeString("en-us", {
//   //   timeZone: "Africa/Cairo",
//   //   hour12: false
//   // });

//   console.log(oArray);
//   // console.log(oArray.gg);
//   // console.log(typeof(oArray._id));
//   // console.log(oArray.gg.hh);
//   // console.log(typeof(oArray.gg.ff));
//   // console.log(typeof(oArray.gg));
//   // console.log(typeof(oArray.ordered_products));

//   oArray._id = new ObjectId("602aa03177e156943f258234");
//   oArray.created_at = new Date();

//   console.log(oArray);

//   console.log(typeof oArray.created_at);
//   console.log(typeof oArray.myDate);
//   console.log(new Date(oArray.myDate));

//   // console.log(req.body.oArray);
// });

// TODO update inside apps and vps

//#################### [  bafra admin APP  ] ###############################
// TODO update inside apps and vps

router.put("/arrived", (req, res, next) => {
  let put_data = req.body; // put body

  let user_phone = put_data.user_phone; // user_phone in the order

  let admin = put_data.admin;
  let total = parseInt(put_data.total); // int

  db.collection("our_bafra_clients").findOne(
    { phone: user_phone },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result1) {
          let next_gift_due =
            parseInt(result1.grand_total) +
            total -
            parseInt(result1.total_at_last_gift);

          db.collection("our_bafra_clients").updateOne(
            { phone: user_phone },
            {
              $inc: {
                num_of_success_orders: parseInt(1),
                grand_total: total,
              },
              $set: { next_gift_due: next_gift_due },
            },
            (err, result2) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 2 error",
                });
              } else {
                db.collection("bafra_admins").updateOne(
                  { phone: admin },
                  { $inc: { money: total } },

                  (err, result3) => {
                    if (err) {
                      res.status(200);
                      res.json({
                        success: "false",
                        msg: "query 3 error",
                      });
                    } else {
                      db.collection("bafra_admins").findOne(
                        { phone: admin },

                        (err, result4) => {
                          if (err) {
                            res.status(200);
                            res.json({
                              success: "false",
                              msg: "query 4 error",
                            });
                          } else {
                            res.status(200);
                            res.json({
                              success: "true",
                              msg: "done",
                              money: parseInt(result4.money), // return result after update
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        } else {
          db.collection("bafra_admins").updateOne(
            { phone: admin },
            { $inc: { money: total } },

            (err, result5) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 5 error",
                });
              } else {
                db.collection("bafra_admins").findOne(
                  { phone: admin },

                  (err, result6) => {
                    if (err) {
                      res.status(200);
                      res.json({
                        success: "false",
                        msg: "query 6 error",
                      });
                    } else {
                      res.status(200);
                      res.json({
                        success: "true",
                        msg: "done",
                        money: parseInt(result6.money), // return result after update
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

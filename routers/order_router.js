const express = require("express");
const router = express.Router();

const mongodbutil = require("../mongodbutil");
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

//#################### [  narcos APP  ] ###############################
router.post("/create", (req, res, next) => {
  // --[ UAPP ]--

  let post_data = req.body; // get post body

  let sentOrder = JSON.parse(post_data.sentOrder);
  sentOrder.created_at = new Date(); // adding created_at field

  let login_phone = sentOrder.login_phone; // login_phone

  db.collection("orders").insertOne(sentOrder, (err, result1) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      db.collection("our_clients").findOne(
        { phone: login_phone },
        (err, result2) => {
          if (err) {
            res.status(200);
            res.json({
              success: "false",
              msg: "query 2 error",
            });
          } else {
            if (result2) {
              res.status(200);
              res.json({
                success: "true",
                msg: "done",
              });
            } else {
              db.collection("our_clients").insertOne(
                {
                  phone: login_phone,
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
                    res.status(200);
                    res.json({
                      success: "true",
                      msg: "done",
                    });
                  }
                }
              );
            }
          }
        }
      );
    }
  });
});
//###############################################################
// TODO update inside apps and vps

router.put("/dlv", (req, res, next) => {
  let put_data = req.body; // put body

  let _id = put_data._id;

  let login_phone = put_data.login_phone; // user login_phone

  let admin_handler = put_data.admin_handler;
  let total = parseInt(put_data.total); // int

  db.collection("orders").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { delivered: true } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        db.collection("our_clients").findOne(
          { phone: login_phone },
          (err, result2) => {
            if (err) {
              res.status(200);
              res.json({
                success: "false",
                msg: "query 2 error",
              });
            } else {
              let next_gift_due =
                parseInt(result2.grand_total) +
                total -
                parseInt(result2.total_at_last_gift);

              db.collection("our_clients").updateOne(
                { phone: login_phone },
                {
                  $inc: {
                    num_of_success_orders: parseInt(1),
                    grand_total: total,
                  },
                  $set: { next_gift_due: next_gift_due },
                },
                (err, result3) => {
                  if (err) {
                    res.status(200);
                    res.json({
                      success: "false",
                      msg: "query 3 error",
                    });
                  } else {
                    db.collection("admins").updateOne(
                      { phone: admin_handler },
                      { $inc: { money: total } },
                      (err, result4) => {
                        if (err) {
                          res.status(200);
                          res.json({
                            success: "false",
                            msg: "query 4 error",
                          });
                        } else {
                          db.collection("admins").findOne(
                            { phone: admin_handler },
                            (err, result5) => {
                              if (err) {
                                res.status(200);
                                res.json({
                                  success: "false",
                                  msg: "query 5 error",
                                });
                              } else {
                                res.status(200);
                                res.json({
                                  success: "true",
                                  msg: "done",
                                  money: parseInt(result5.money), // return result after update
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
            }
          }
        );
      }
    }
  );
});

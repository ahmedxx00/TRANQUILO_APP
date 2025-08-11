const express = require("express");
const router = express.Router();

const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil
// const ObjectId = require("mongodb").ObjectId;

const CONSTANTS = require("../../CONSTANTS");

module.exports = router;

//#################### [  bafra APP  ] ###############################
/*
router.post("/user", async (req, res, next) => {
  // --[ bafra ]--
  let post_data = req.body; // get post body

  let phone = post_data.phone;
  let plain_pass = post_data.password;
  let code = post_data.code;
  let referal = post_data.referal;

  db.collection("bafra_users").findOne(
    { phone: phone },
    async (err, result1) => {
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
          let enc_pass = await CONSTANTS.encrypt(plain_pass); // get encrypted password
          let my_issued_code_object =
            await CONSTANTS.generateOneRegistrationCodeByUser(phone);
          let my_issued_code = my_issued_code_object.code; // string code

          db.collection("bafra_users").insertOne(
            {
              phone: phone,
              password: enc_pass,
              blocked: false,
              referal: referal,
              my_issued_code: my_issued_code,
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
                      // [1] update the referal code that i used it in register
                      db.collection("registration_codes").updateOne(
                        { code: code },
                        { $set: { used_by: phone, used: true } },

                        (err, result4) => {
                          if (err) {
                            res.status(200);
                            res.json({
                              success: "false",
                              msg: "query 4 error",
                            });
                          } else {
                            // [2] insert my own newly issued code to refer a friend in the future
                            db.collection("registration_codes").insertOne(
                              my_issued_code_object,
                              (err, result5) => {
                                if (err) {
                                  res.status(200);
                                  res.json({
                                    success: "false",
                                    msg: "query 5 error",
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
                );
              }
            }
          );
        }
      }
    }
  );
});
*/

router.post("/user", async (req, res, next) => {
  // --[ bafra ]--
  let post_data = req.body; // get post body

  let phone = post_data.phone;
  let plain_pass = post_data.password;
  let lat = parseFloat(post_data.lat);
  let lng = parseFloat(post_data.lng);

  db.collection("bafra_users").findOne(
    { phone: phone },
    async (err, result1) => {
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
          let enc_pass = await CONSTANTS.encrypt(plain_pass); // get encrypted password

          db.collection("bafra_users").insertOne(
            {
              phone: phone,
              password: enc_pass,
              blocked: false,
              registration_lat: lat,
              registration_lng: lng,
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
    }
  );
});
//#####################################################################

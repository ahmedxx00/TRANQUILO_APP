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

//#################### [  Dakhakhny APP  ] ###############################
router.post("/create", (req, res, next) => {
  // --[ Dakhakhny ]--

  let post_data = req.body; // get post body

  let user_phone = post_data.user_phone;
  let ordered_products = JSON.parse(post_data.ordered_products);

  let city_code = post_data.city_code; // always have value --> for future use if needed

  // -- updateOne with [ $setOnInsert ] and [ upsert : true ] -- if document exists it will be updated but we
  // -- didnt pass any [$inc or $set] instead we passed [$setOnInsert] which only executes in case of insert
  // and the insert will happen only if document not exists -- Conclution :-- here if exists nothing happen
  // and if not exists it inserts the phone and the body of [ $setOnInsert ].. the ( result2 ) is the document
  // whether it is created or updated but AGAIN we didnt feed the updateOne any update parameter to update with.

  db.collection("our_dakhakhny_clients").findOne(
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
          //############### decreasing products amount_in_stock #################
          // ordered_products :{
          //
          //  "سجاير":{ // [key1] group name
          //    "marlboro_red.png": 2, // [key2] : amount was in the order
          //    "lm_white.png": 1, // [key2] : amount was in the order
          //   },
          //
          //  "ولاعات":{
          //    "djeep_red.png": 2,
          //    "djeep_classic.png": 1,
          //   },
          //
          // }

          // we here use  the placeholder operator [$] to deal with array values in mongodb
          // decreasing products [ amount_in_stock ]

          Object.keys(ordered_products).forEach(function (key1) {
            Object.keys(ordered_products[key1]).forEach(function (key2) {
              db.collection("dakhakhny_products").updateOne(
                { group_name: key1, "products.img": key2 },
                {
                  $inc: {
                    "products.$.amount_in_stock": -parseInt(
                      ordered_products[key1][key2]
                    ),
                  },
                },

                (err, result2) => {
                  if (err) {
                    res.status(200);
                    res.json({
                      success: "false",
                      msg: "query 2 error",
                    });
                  }
                }
              );
            });
          });

          res.status(200);
          res.json({
            success: "true",
            msg: "done",
          });
        } else {
          db.collection("our_dakhakhny_clients").insertOne(
            {
              phone: user_phone,
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
                //############### decreasing products amount_in_stock #################
                // ordered_products :{
                //
                //  "سجاير":{ // [key1] group name
                //    "marlboro_red.png": 2, // [key2] : amount was in the order
                //    "lm_white.png": 1, // [key2] : amount was in the order
                //   },
                //
                //  "ولاعات":{
                //    "djeep_red.png": 2,
                //    "djeep_classic.png": 1,
                //   },
                //
                // }

                // we here use  the placeholder operator [$] to deal with array values in mongodb
                // decreasing products [ amount_in_stock ]

                Object.keys(ordered_products).forEach(function (key1) {
                  Object.keys(ordered_products[key1]).forEach(function (key2) {
                    db.collection("dakhakhny_products").updateOne(
                      { group_name: key1, "products.img": key2 },
                      {
                        $inc: {
                          "products.$.amount_in_stock": -parseInt(
                            ordered_products[key1][key2]
                          ),
                        },
                      },

                      (err, result4) => {
                        if (err) {
                          res.status(200);
                          res.json({
                            success: "false",
                            msg: "query 4 error",
                          });
                        }
                      }
                    );
                  });
                });

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
});

//###############################################################
// TODO update inside apps and vps

router.put("/dlv", (req, res, next) => {
  let put_data = req.body; // put body

  let user_phone = put_data.user_phone; // user_phone in the order

  let admin = put_data.admin;
  let total = parseInt(put_data.total); // int

  db.collection("our_dakhakhny_clients").findOne(
    { phone: user_phone },
    (err, result2) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 2 error",
        });
      } else {
        if (result2) {
          let next_gift_due =
            parseInt(result2.grand_total) +
            total -
            parseInt(result2.total_at_last_gift);

          db.collection("our_dakhakhny_clients").updateOne(
            { phone: user_phone },
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
                db.collection("dakhakhny_admins").updateOne(
                  { phone: admin },
                  { $inc: { money: total } },

                  (err, result4) => {
                    if (err) {
                      res.status(200);
                      res.json({
                        success: "false",
                        msg: "query 4 error",
                      });
                    } else {
                      db.collection("dakhakhny_admins").findOne(
                        { phone: admin },

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
        } else {
          db.collection("dakhakhny_admins").updateOne(
            { phone: admin },
            { $inc: { money: total } },

            (err, result4) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 4 error",
                });
              } else {
                db.collection("dakhakhny_admins").findOne(
                  { phone: admin },

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
    }
  );
});

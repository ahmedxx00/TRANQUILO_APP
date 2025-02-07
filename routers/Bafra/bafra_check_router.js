const express = require("express");
const router = express.Router();

const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil

// const CONSTANTS = require("../CONSTANTS");

module.exports = router;

// const ObjectId = require("mongodb").ObjectId;
// const pool = CONSTANTS.pool;

//------------------------- sms api ---------------------------

// const Vonage = require("@vonage/server-sdk");

// const vonage = new Vonage({
//   apiKey: CONSTANTS.VONAGE_API_KEY,
//   apiSecret: CONSTANTS.VONAGE_API_SECRET,
// });

// generateRandomCode = () => Math.floor(100000 + Math.random() * 900000); // random code function

//#################### [  ESTBA7A APP  ] ###############################

// router.get("/talkToServer", (req, res, next) => {
//   let phone = req.query.phone;
//   let nowTime = req.query.nowTime;
//   let APP_VERSION = req.query.APP_VERSION;

//   db.collection("latest_version").findOne(
//     { app_name: "estba7a" },
//     (err, result1) => {
//       if (err) {
//         res.status(200);
//         res.json({
//           success: "false",
//           msg: "query 1 error",
//         });
//       } else {
//         if (result1.latest_version > APP_VERSION) {
//           res.status(200);
//           res.json({
//             success: "false",
//             msg: "outDatedVersion",
//             anotherMsg: result1.version_url,
//           });
//         } else {
//           db.collection("working_hours")
//             .find({
//               hint: "main",
//             })
//             .limit(1)
//             .toArray((err, items2) => {
//               if (err) {
//                 res.status(200);
//                 res.json({
//                   success: "false",
//                   msg: "query 2 error",
//                 });
//               } else {
//                 if (items2.length > 0) {
//                   // only one

//                   let start_time = items2[0].start_time;
//                   let end_time = items2[0].end_time;

//                   if (
//                     new Date(nowTime) > start_time &&
//                     new Date(nowTime) < end_time
//                   ) {
//                     // check if he has order
//                     db.collection("orders")
//                       .find({
//                         user_phone: phone,
//                         delivered: false,
//                         canceled_by_user: false,
//                         canceled_by_owner: false,
//                       })
//                       .sort({ created_at: -1 })
//                       .limit(1)
//                       .toArray((err, items3) => {
//                         if (err) {
//                           res.status(200);
//                           res.json({
//                             success: "false",
//                             msg: "query 3 error",
//                           });
//                         } else {
//                           if (items3.length > 0) {
//                             // has one pending order

//                             items3.forEach((item) => {
//                               res.status(200);
//                               res.json({
//                                 success: "true",
//                                 msg: "has pending order",
//                                 lastOrder: item,
//                               });
//                             });
//                           } else {
//                             // go get products list
//                             db.collection("products")
//                               .find({}, { projection: { _id: 0 } })
//                               .toArray((err, items4) => {
//                                 if (err) {
//                                   res.status(200);
//                                   res.json({
//                                     success: "false",
//                                     msg: "query 4 error",
//                                   });
//                                 } else {
//                                   if (items4.length > 0) {
//                                     res.status(200);
//                                     res.json({
//                                       success: "true",
//                                       msg: "products loaded",
//                                       allProducts: items4,
//                                     });
//                                   } else {
//                                     res.status(200);
//                                     res.json({
//                                       success: "false",
//                                       msg: "no products",
//                                     });
//                                   }
//                                 }
//                               });
//                           }
//                         }
//                       });
//                   } else {
//                     res.status(200);
//                     res.json({
//                       success: "false",
//                       msg: "not working hour",
//                       start_time: start_time,
//                       end_time: end_time,
//                     });
//                   }
//                 }
//               }
//             });
//         }
//       }
//     }
//   );
// });

//#################### [  tranquilo APP  ] ###############################

router.get("/lastOrder", (req, res, next) => {
  let login_phone = req.query.login_phone;
  let app_name = req.query.app_name;
  let APP_VERSION = req.query.APP_VERSION;

  db.collection("bafra_users").findOne(
    { phone: login_phone },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result1.blocked == false) {
          db.collection("bafra_latest_version").findOne(
            { app_name: app_name },
            (err, result2) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 2 error",
                });
              } else {
                if (result2 && result2.latest_version > APP_VERSION) {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "outDatedVersion",
                    anotherMsg: result2.version_url,
                  });
                } else {
                  res.status(200);
                  res.json({
                    success: "true",
                    msg: "fetch_firestore_orders",
                  });
                }
              }
            }
          );
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "blocked",
          });
        }
      }
    }
  );
});

router.get("/ifPointLiesWithinPolygon", (req, res, next) => {
  let lat = parseFloat(req.query.lat);
  let lng = parseFloat(req.query.lng);
  let nowTime = new Date(req.query.nowTime);

  db.collection("bafra_polygons").findOne(
    {
      geom: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
        },
      },
    },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result) {
          let start_time = result.start_time;
          let end_time = result.end_time;
          let code = result.code;
          let payment_method = result.payment_method; // map
          let usdt_rate = result.usdt_rate; // int

          if (nowTime > start_time && nowTime < end_time) {
            // go get products list
            db.collection("bafra_products")
              .find({}, { projection: { _id: 0 } })
              .toArray((err, items2) => {
                if (err) {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "query 2 error",
                  });
                } else {
                  if (items2.length > 0) {
                    res.status(200);
                    res.json({
                      success: "true",
                      msg: "lies_and_now_working",
                      allProducts: items2,
                      code: code,
                      payment_method: payment_method,
                      usdt_rate: usdt_rate,
                      end_time: end_time, // to end session when timeout
                    });
                  } else {
                    res.status(200);
                    res.json({
                      success: "false",
                      msg: "no products",
                    });
                  }
                }
              });
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "lies_but_not_now_working",
              start_time: start_time,
              end_time: end_time,
              code: code,
            });
          }
        } else {
          // tell him about the now supported areas
          db.collection("bafra_polygons")
            .find({}, { projection: { name: 1, _id: 0 } })
            .toArray((err, namesArray) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 1 error",
                });
              } else {
                if (namesArray.length > 0) {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "NoArea",
                    areasNames: namesArray, // [{"name":"polygon1_name"},{"name":"polygon2_name"},{"name":"polygon3_name"}]
                  });
                } else {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "هناك بعض الصيانة بالتطبيق",
                  });
                }
              }
            });
        }
      }
    }
  );
});

//------------------------ admin -----------------

router.get(
  "/updateAdminLocationTHENCheckIfBlockedOrOutDated",
  (req, res, next) => {
    let login_phone = req.query.login_phone;
    let app_name = req.query.app_name;
    let APP_VERSION = req.query.APP_VERSION;
    let lat = parseFloat(req.query.lat);
    let lng = parseFloat(req.query.lng);

    db.collection("bafra_admins").updateOne(
      { phone: login_phone },
      { $set: { lat: lat, lng: lng, dateOfLocation: new Date() } },
      (err, result1) => {
        if (err) {
          res.status(200);
          res.json({
            success: "false",
            msg: "query 1 error",
          });
        } else {
          db.collection("bafra_admins").findOne(
            { phone: login_phone },
            (err, result2) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 2 error",
                });
              } else {
                let money = result2.money;

                if (result2.blocked == false) {
                  db.collection("bafra_latest_version").findOne(
                    { app_name: app_name },
                    (err, result3) => {
                      if (err) {
                        res.status(200);
                        res.json({
                          success: "false",
                          msg: "query 3 error",
                        });
                      } else {
                        if (result3 && result3.latest_version > APP_VERSION) {
                          res.status(200);
                          res.json({
                            success: "false",
                            msg: "outDatedVersion",
                            anotherMsg: result3.version_url,
                          });
                        } else {
                          res.status(200);
                          res.json({
                            success: "true",
                            msg: "done",
                            anotherMsg: money.toString(),
                          });
                        }
                      }
                    }
                  );
                } else {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "blocked",
                  });
                }
              }
            }
          );
        }
      }
    );
  }
);

router.get("/ifAdminIsAssignedToAnyPolygon", (req, res, next) => {
  let admin_handler = req.query.admin_handler;
  let nowTime = new Date(req.query.nowTime);

  db.collection("bafra_polygons").findOne(
    {
      admin_handler: admin_handler,
    },
    async (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result) {
          let start_time = result.start_time;
          let end_time = result.end_time;
          let code = result.code;

          if (nowTime > start_time && nowTime < end_time) {
            res.status(200);
            res.json({
              success: "true",
              msg: "assigned_and_now_working",
              code: code,
              end_time: end_time, // to end session when timeout
            });
          } else {
            if (nowTime > end_time) {
              res.status(200);
              res.json({
                success: "true",
                msg: "assigned_and_actual_shift_ended",
                code: code,
              });
            } else {
              res.status(200);
              res.json({
                success: "false",
                msg: "assigned_but_not_now_working",
                start_time: start_time,
                end_time: end_time,
              });
            }
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "not_assigned",
          });
        }
      }
    }
  );
});
//------------------------ owner -----------------

router.get("/ownerMain", (req, res, next) => {
  // --[ bafra Owner]--
  let x, y;
  db.collection("bafra_gifts")
    .find(
      {
        user_added_wallet_number: true,
        user_got_his_money: false,
      },
      {}
    )
    .toArray((err, gifts) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        x = gifts.length;

        db.collection("bafra_feedbacks")
          .find(
            {
              read: false,
            },
            {}
          )
          .toArray((err, feedbacks) => {
            if (err) {
              res.status(200);
              res.json({
                success: "false",
                msg: "query 2 error",
              });
            } else {
              y = feedbacks.length;
              res.status(200);
              res.json({
                success: "true",
                msg: "done",
                x: parseInt(x),
                y: parseInt(y),
              });
            }
          });
      }
    });
});

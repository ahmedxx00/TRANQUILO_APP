//=================== before ES6 syntax ======================
const express = require("express");
const router = express.Router();
const mongodbutil = require("../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil
module.exports = router;

// const ObjectId = require("mongodb").ObjectId;
// const CONSTANTS = require("../CONSTANTS");
// const pool = CONSTANTS.pool;

//#################### [  Estba7a APP  ] ###############################
router.get("/allProducts", (req, res, next) => {
  // --[ Estba7a ]--
  db.collection("products")
    .find({}, { projection: { _id: 0 } })
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            allProducts: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no product",
          });
        }
      }
    });
});
//###############################################################
// router.get("/orders", (req, res, next) => {
//   db.collection("orders")
//     .find({
//       canceled_by_user: false,
//       canceled_by_owner: false,
//       delivered: false,
//     })
//     .sort({ created_at: 1 }) // ascending
//     .toArray((err, orders) => {
//       if (err) {
//         res.status(200);
//         res.json({
//           success: "false",
//           msg: "query 1 error",
//         });
//       } else {
//         db.collection("working_hours").findOne(
//           { hint: "main" },
//           (err, result2) => {
//             if (err) {
//               res.status(200);
//               res.json({
//                 success: "false",
//                 msg: "query 2 error",
//               });
//             } else {
//               res.status(200);
//               res.json({
//                 success: "true",
//                 msg: "done",
//                 start_time: result2.start_time,
//                 end_time: result2.end_time,
//                 orders: orders,
//               });
//             }
//           }
//         );
//       }
//     });
// });
//---------------------------------------------------
//-------[APY]---------------
router.get("/orders", (req, res, next) => {
  let admin_handler = req.query.admin_handler;
  let app_name = req.query.app_name;
  let APP_VERSION = req.query.APP_VERSION;

  let money;

  db.collection("admins").findOne(
    {
      phone: admin_handler,
    },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result1) {
          if (result1.blocked == false) {
            money = parseInt(result1.money);

            db.collection("latest_version").findOne(
              {
                app_name: app_name,
              },
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
                    db.collection("polygons").findOne(
                      {
                        admin_handler: admin_handler,
                      },
                      (err, result3) => {
                        if (err) {
                          res.status(200);
                          res.json({
                            success: "false",
                            msg: "query 3 error",
                          });
                        } else {
                          if (result3) {
                            let start_time = result3.start_time;
                            let end_time = result3.end_time;
                            let code = result3.code;
                            let delivery_point = result3.delivery_point;

                            db.collection("orders")
                              .find({
                                code: code,
                                canceled_by_user: false,
                                canceled_by_owner: false,
                                delivered: false,
                              })
                              .sort({ created_at: 1 }) // ascending
                              .toArray((err, orders) => {
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
                                    start_time: start_time,
                                    end_time: end_time,
                                    orders: orders,
                                    code: code,
                                    delivery_point: delivery_point,
                                    money: money,
                                  });
                                }
                              });
                          } else {
                            res.status(200);
                            res.json({
                              success: "false",
                              msg: "no_polygon",
                            });
                          }
                        }
                      }
                    );
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
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no_such_admin",
          });
        }
      }
    }
  );
});

router.get("/allPolygons", (req, res, next) => {
  // --[ OO ]--
  db.collection("polygons")
    .find({})
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          db.collection("admins")
            .find({})
            .toArray(async (err, admins) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 2 error",
                });
              } else {
                if (admins.length > 0) {
                  //------------------ prepare the list----------------------
                  let adminsList = await prepareList(admins);
                  function prepareList(admins) {
                    return new Promise((resolve, reject) => {
                      let y = [];
                      for (const admin of admins) {
                        y.push({
                          phone: admin["phone"],
                          nick_name: admin["nick_name"],
                          blocked: admin["blocked"],
                        });
                      }
                      y.unshift({
                        phone: "",
                        nick_name: "",
                        blocked: false,
                      });
                      resolve(y);
                    });
                  }
                  //---------------------------------------------
                  res.status(200);
                  res.json({
                    success: "true",
                    msg: "done",
                    polygonList: items,
                    adminsList: adminsList, // array of admins
                  });
                } else {
                  res.status(200);
                  res.json({
                    success: "true",
                    msg: "done",
                    polygonList: items,
                    adminsList: [
                      {
                        phone: "",
                        nick_name: "",
                        blocked: false,
                      },
                    ], // empty array
                  });
                }
              }
            });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no polygon",
          });
        }
      }
    });
});

router.get("/admins", (req, res, next) => {
  // --[ OO ]--
  db.collection("admins")
    .find({})
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            adminList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no admins",
          });
        }
      }
    });
});

router.get("/users", (req, res, next) => {
  // --[ OO ]--
  db.collection("users")
    .find({})
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            userList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no users",
          });
        }
      }
    });
});

router.get("/latest", (req, res, next) => {
  // --[ OO ]--
  db.collection("latest_version")
    .find({})
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            latestList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no latest",
          });
        }
      }
    });
});

// TODO update inside apps and vps 
router.get("/ourClients", (req, res, next) => {
  // --[ OO ]--
  db.collection("our_clients")
    .find({})
    .sort({ next_gift_due: -1 })
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            clientsList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no clients",
          });
        }
      }
    });
});

router.get("/registrationCodes", (req, res, next) => {
  // --[ OO ]--
  db.collection("registration_codes")
    .find({})
    .sort({ used: -1 }) // boolean descending true first
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            registrationCodesList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no registration codes",
          });
        }
      }
    });
});

router.get("/userFeedbacks", (req, res, next) => {
  // --[ OO ]--
  db.collection("user_feedbacks")
    .find({})
    .sort({ created_at: -1 })
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            userFeedbackList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no feedbacks",
          });
        }
      }
    });
});

router.get("/userGifts", (req, res, next) => {
  // --[ OO ]--
  db.collection("user_gifts")
    .find({user_got_his_money : false})
    .sort({ created_at: -1 })
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            giftList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no gifts",
          });
        }
      }
    });
});
//#################### [  $-M-$ APP  ] ###############################
router.get("/merchants", (req, res, next) => {
  db.collection("merchants")
    .find({})
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            merchantList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no merchants",
          });
        }
      }
    });
});
//#################### [  $-T-$ APP  ] ###############################
router.get("/transporters", (req, res, next) => {
  db.collection("transporters")
    .find({})
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            transporterList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no transporters",
          });
        }
      }
    });
});
//#################### [  $-H-$ APP  ] ###############################
router.get("/hiders", (req, res, next) => {
  db.collection("hiders")
    .find({})
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            hiderList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no hiders",
          });
        }
      }
    });
});
//#################### [  Bash APP  ] ###############################
router.get("/exClients", (req, res, next) => {
  let his_exchanger = req.query.his_exchanger;

  db.collection("ex_clients")
    .find({ his_exchanger: his_exchanger })
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            clientList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no clients",
          });
        }
      }
    });
});

router.get("/exchangers", (req, res, next) => {
  db.collection("exchangers")
    .find({})
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            exchangerList: items,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no exchangers",
          });
        }
      }
    });
});

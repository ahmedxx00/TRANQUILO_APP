const express = require("express");
const router = express.Router();

const mongodbutil = require("../mongodbutil");
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
  let order_phone = req.query.order_phone;
  let login_phone = req.query.login_phone;
  let app_name = req.query.app_name;
  let APP_VERSION = req.query.APP_VERSION;

  db.collection("users").findOne({ phone: login_phone }, (err, result1) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result1.blocked == false) {
        db.collection("latest_version").findOne(
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
                db.collection("orders")
                  .find({
                    user_phone: order_phone,
                    delivered: false,
                    canceled_by_user: false,
                    canceled_by_owner: false,
                  })
                  .sort({ created_at: -1 })
                  .limit(1)
                  .toArray((err, items) => {
                    if (err) {
                      res.status(200);
                      res.json({
                        success: "false",
                        msg: "query 3 error",
                      });
                    } else {
                      if (items && items.length > 0) {
                        let item = items[0]; // only one

                        // incase delivery point changed due to police attack

                        let code = item.code;
                        let ordLat = parseFloat(item.delivery_point.lat);
                        let ordLng = parseFloat(item.delivery_point.lng);

                        db.collection("polygons").findOne(
                          { code: code },
                          (err, polygon) => {
                            if (err) {
                              res.status(200);
                              res.json({
                                success: "false",
                                msg: "query 4 error",
                              });
                            } else {
                              let polLat = polygon.delivery_point.lat;
                              let polLng = polygon.delivery_point.lng;

                              if (ordLat == polLat && ordLng == polLng) {
                                res.status(200);
                                res.json({
                                  success: "true",
                                  msg: "has_pending_order",
                                  lastOrder: item,
                                });
                              } else {
                                item.delivery_point.lat = polLat;
                                item.delivery_point.lng = polLng;
                                item.meeting_point_changed = true; // boolean

                                res.status(200);
                                res.json({
                                  success: "true",
                                  msg: "has_pending_order",
                                  lastOrder: item,
                                });
                              }
                            }
                          }
                        );
                      } else {
                        res.status(200);
                        res.json({
                          success: "false",
                          msg: "has_no_order",
                        });
                      }
                    }
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
  });
});

router.get("/ifPointLiesWithinPolygon", (req, res, next) => {
  let lat = parseFloat(req.query.lat);
  let lng = parseFloat(req.query.lng);
  let nowTime = req.query.nowTime;

  db.collection("polygons").findOne(
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
          let admin_handler = result.admin_handler;
          let delivery_point = result.delivery_point;
          let code = result.code;

          if (new Date(nowTime) > start_time && new Date(nowTime) < end_time) {
            // go get products list
            db.collection("products")
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
                      admin_handler: admin_handler,
                      delivery_point: delivery_point,
                      code: code,
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
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "NoArea",
          });
        }
      }
    }
  );
});

router.get("/ifRegistrationCodeValid", (req, res, next) => {
  let code = req.query.code;

  db.collection("registration_codes").findOne(
    {
      code: code,
      used: false,
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
          res.status(200);
          res.json({
            success: "true",
            msg: "validCode",
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "invalid_code",
          });
        }
      }
    }
  );
});

//#################### [  $-M-$ APP  ] ###############################
router.get("/merchantBlockedOrOutDated", (req, res, next) => {
  let nick_name = req.query.nick_name;
  let app_name = req.query.app_name;
  let APP_VERSION = req.query.APP_VERSION;

  db.collection("merchants").findOne(
    {
      nick_name: nick_name,
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
                    res.status(200);
                    res.json({
                      success: "true",
                      msg: "done",
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
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "غير موجود",
          });
        }
      }
    }
  );
});
//#################### [  $-T-$ APP  ] ###############################
router.get("/transporterBlockedOrOutDated", (req, res, next) => {
  let nick_name = req.query.nick_name;
  let app_name = req.query.app_name;
  let APP_VERSION = req.query.APP_VERSION;

  db.collection("transporters").findOne(
    {
      nick_name: nick_name,
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
                    res.status(200);
                    res.json({
                      success: "true",
                      msg: "done",
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
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "غير موجود",
          });
        }
      }
    }
  );
});
//#################### [  $-H-$ APP  ] ###############################
router.get("/hiderBlockedOrOutDated", (req, res, next) => {
  let nick_name = req.query.nick_name;
  let app_name = req.query.app_name;
  let APP_VERSION = req.query.APP_VERSION;

  db.collection("hiders").findOne(
    {
      nick_name: nick_name,
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
                    res.status(200);
                    res.json({
                      success: "true",
                      msg: "done",
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
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "غير موجود",
          });
        }
      }
    }
  );
});
//#################### [  Bash APP  ] ###############################
router.get("/exchangerBlockedOrOutDated", (req, res, next) => {
  let nick_name = req.query.nick_name;
  let app_name = req.query.app_name;
  let APP_VERSION = req.query.APP_VERSION;

  db.collection("exchangers").findOne(
    {
      nick_name: nick_name,
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
                    res.status(200);
                    res.json({
                      success: "true",
                      msg: "done",
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
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "غير موجود",
          });
        }
      }
    }
  );
});
router.get("/exClientBlockedOrOutDated", (req, res, next) => {
  let nick_name = req.query.nick_name;
  let his_exchanger = req.query.his_exchanger;
  let app_name = req.query.app_name;
  let APP_VERSION = req.query.APP_VERSION;

  db.collection("ex_clients").findOne(
    {
      nick_name: nick_name, his_exchanger : his_exchanger
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
                    res.status(200);
                    res.json({
                      success: "true",
                      msg: "done",
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
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "غير موجود",
          });
        }
      }
    }
  );
});
const express = require("express");
const router = express.Router();
const mongodbutil = require("../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil
const ObjectId = require("mongodb").ObjectId;

const CONSTANTS = require("../CONSTANTS");

module.exports = router;

//##################################[ tranquilo APP ]###################################
router.put("/canceled_by_user", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;

  db.collection("orders").findOne(
    { _id: new ObjectId(_id) },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result1) {
          db.collection("orders").updateOne(
            { _id: new ObjectId(_id) },
            { $set: { canceled_by_user: true } },
            (err, result2) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 2 error",
                });
              } else {
                res.status(200);
                res.json({
                  success: "true",
                  msg: "updated",
                });
              }
            }
          );
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no such order",
          });
        }
      }
    }
  );
});

router.put("/userGiftAddWalletNumber", (req, res, next) => {
  let put_data = req.body;

  let giftId = put_data.giftId;
  let wallet_number = put_data.wallet_number;

  db.collection("user_gifts").updateOne(
    { _id: new ObjectId(giftId) },
    {
      $set: {
        user_added_wallet_number: true,
        wallet_number: wallet_number,
      },
    },
    (err, result2) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 2 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});
//#####################################################################
router.put("/start_time", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let start_time = put_data.start_time;

  db.collection("polygons").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { start_time: new Date(start_time) } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

router.put("/end_time", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let end_time = put_data.end_time;

  db.collection("polygons").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { end_time: new Date(end_time) } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

router.put("/polygonName", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let name = put_data.name;

  db.collection("polygons").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { name: name } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

router.put("/polygonCode", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let code = put_data.code;

  db.collection("polygons").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { code: code } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

router.put("/polygonHandler", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let admin_handler = put_data.admin_handler;

  db.collection("polygons").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { admin_handler: admin_handler } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

router.put("/deliveryLat", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let lat = parseFloat(put_data.lat);

  db.collection("polygons").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { "delivery_point.lat": lat } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

router.put("/deliveryLng", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let lng = parseFloat(put_data.lng);

  db.collection("polygons").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { "delivery_point.lng": lng } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

router.put("/memTitle", (req, res, next) => {
  let put_data = req.body;

  let groupName = put_data.groupName;
  let memTitle = put_data.memTitle;
  let newValue = put_data.newValue;

  db.collection("products").findOne(
    { group_name: groupName },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        let x = result1.products;

        for (i = 0; i < x.length; i++) {
          if (x[i].title == memTitle) {
            x[i].title = newValue;

            db.collection("products").updateOne(
              { group_name: groupName },
              { $set: { products: x } },

              (err, result2) => {
                if (err) {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "query 2 error",
                  });
                } else {
                  res.status(200);
                  res.json({
                    success: "true",
                    msg: "updated",
                  });
                }
              }
            );
          }
        }
      }
    }
  );
});

router.put("/memPrice", (req, res, next) => {
  let put_data = req.body;

  let groupName = put_data.groupName;
  let memTitle = put_data.memTitle;
  let newPrice = put_data.newPrice;

  db.collection("products").findOne(
    { group_name: groupName },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        let x = result1.products;

        for (i = 0; i < x.length; i++) {
          if (x[i].title == memTitle) {
            x[i].price = parseInt(newPrice);

            db.collection("products").updateOne(
              { group_name: groupName },
              { $set: { products: x } },

              (err, result2) => {
                if (err) {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "query 2 error",
                  });
                } else {
                  res.status(200);
                  res.json({
                    success: "true",
                    msg: "updated",
                  });
                }
              }
            );
          }
        }
      }
    }
  );
});

router.put("/memMaxNum", (req, res, next) => {
  let put_data = req.body;

  let groupName = put_data.groupName;
  let memTitle = put_data.memTitle;
  let newMaxNum = put_data.newMaxNum;

  db.collection("products").findOne(
    { group_name: groupName },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        let x = result1.products;

        for (i = 0; i < x.length; i++) {
          if (x[i].title == memTitle) {
            x[i].max_num = parseInt(newMaxNum);

            db.collection("products").updateOne(
              { group_name: groupName },
              { $set: { products: x } },

              (err, result2) => {
                if (err) {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "query 2 error",
                  });
                } else {
                  res.status(200);
                  res.json({
                    success: "true",
                    msg: "updated",
                  });
                }
              }
            );
          }
        }
      }
    }
  );
});

router.put("/groupName", (req, res, next) => {
  let put_data = req.body;

  let groupName = put_data.groupName;
  let newValue = put_data.newValue;

  db.collection("products").updateOne(
    { group_name: groupName },
    { $set: { group_name: newValue } },

    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

router.put("/canceled_by_owner", (req, res, next) => {
  let put_data = req.body;

  let code = put_data.code;

  db.collection("orders").updateMany(
    {
      code: code,
      canceled_by_user: false,
      canceled_by_owner: false,
      delivered: false,
    },
    { $set: { canceled_by_owner: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "polygon pending orders canceled successfully",
        });
      }
    }
  );
});

router.put("/adminNick", (req, res, next) => {
  let put_data = req.body;
  let phone = put_data.phone;
  let nick_name = put_data.nick_name;

  db.collection("s").updateOne(
    { phone: phone },
    { $set: { nick_name: nick_name } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "changed",
        });
      }
    }
  );
});

router.put("/adminZeroMoney", (req, res, next) => {
  let put_data = req.body;
  let phone = put_data.phone;

  db.collection("admins").updateOne(
    { phone: phone },
    { $set: { money: parseInt(0) } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "changed",
        });
      }
    }
  );
});

router.put("/userFeedbackRead", (req, res, next) => {
  let put_data = req.body;
  let feedbackId = put_data.feedbackId;

  db.collection("user_feedbacks").updateOne(
    { _id: new ObjectId(feedbackId) },
    { $set: { read: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
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
});

router.put("/userGotHisMoney", (req, res, next) => {
  let put_data = req.body;
  let giftId = put_data.giftId;

  db.collection("user_gifts").updateOne(
    { _id: new ObjectId(giftId) },
    { $set: { user_got_his_money: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
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
});

//====================== admin =======================
router.put("/adminBlock", (req, res, next) => {
  let put_data = req.body;
  let phone = put_data.phone;

  db.collection("admins").updateOne(
    { phone: phone },
    { $set: { blocked: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "blocked",
        });
      }
    }
  );
});
router.put("/adminUnBlock", (req, res, next) => {
  let put_data = req.body;
  let phone = put_data.phone;

  db.collection("admins").updateOne(
    { phone: phone },
    { $set: { blocked: false } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "unblocked",
        });
      }
    }
  );
});
router.put("/adminPassword", async (req, res, next) => {
  let put_data = req.body;

  let phone = put_data.phone;
  let old_password = put_data.old_password;
  let new_password = put_data.new_password;

  let enc_oldpass = await CONSTANTS.encrypt(old_password);
  let enc_newpass = await CONSTANTS.encrypt(new_password);

  db.collection("admins").findOne({ phone: phone }, (err, result1) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result1) {
        if (result1.password == enc_oldpass) {
          db.collection("admins").updateOne(
            { phone: phone },
            { $set: { password: enc_newpass } },
            (err, result2) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 2 error",
                });
              } else {
                res.status(200);
                res.json({
                  success: "true",
                  msg: "تم تغيير الباسوورد",
                });
              }
            }
          );
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "الباسوورد القديم خاطئ",
          });
        }
      } else {
        res.status(200);
        res.json({
          success: "false",
          msg: "الادمن غير موجود",
        });
      }
    }
  });
});
router.put("/adminLocation", (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let lat = parseFloat(put_data.lat);
  let lng = parseFloat(put_data.lng);

  db.collection("admins").updateOne(
    { nick_name: nick_name },
    { $set: { lat: lat, lng: lng, dateOfLocation: new Date() } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});
//=====================================================
router.put("/pointLat", (req, res, next) => {
  let put_data = req.body; // get post body

  let polygonId = put_data.polygonId;
  let groupPosition = parseInt(put_data.groupPosition);
  let pointPosition = parseInt(put_data.pointPosition);
  let newLat = parseFloat(put_data.newLat);

  db.collection("polygons").findOne(
    {
      _id: new ObjectId(polygonId),
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
          let coordinates = result1.geom.coordinates; // Array

          coordinates[groupPosition][pointPosition][1] = newLat;

          db.collection("polygons").updateOne(
            {
              _id: new ObjectId(polygonId),
            },
            { $set: { "geom.coordinates": coordinates } },
            (err, result2) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 2 error",
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
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no such polygon",
          });
        }
      }
    }
  );
});

router.put("/pointLng", (req, res, next) => {
  let put_data = req.body; // get post body

  let polygonId = put_data.polygonId;
  let groupPosition = parseInt(put_data.groupPosition);
  let pointPosition = parseInt(put_data.pointPosition);
  let newLng = parseFloat(put_data.newLng);

  db.collection("polygons").findOne(
    {
      _id: new ObjectId(polygonId),
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
          let coordinates = result1.geom.coordinates; // Array

          coordinates[groupPosition][pointPosition][0] = newLng;

          db.collection("polygons").updateOne(
            {
              _id: new ObjectId(polygonId),
            },
            { $set: { "geom.coordinates": coordinates } },
            (err, result2) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 2 error",
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
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no such polygon",
          });
        }
      }
    }
  );
});

router.put("/latestName", (req, res, next) => {
  let put_data = req.body;
  let _id = put_data._id;
  let newValue = put_data.newValue;

  db.collection("latest_version").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { app_name: newValue } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "changed",
        });
      }
    }
  );
});

router.put("/latestVer", (req, res, next) => {
  let put_data = req.body;
  let _id = put_data._id;
  let newValue = put_data.newValue;

  db.collection("latest_version").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { latest_version: newValue } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "changed",
        });
      }
    }
  );
});

router.put("/latestUrl", (req, res, next) => {
  let put_data = req.body;
  let _id = put_data._id;
  let newValue = put_data.newValue;

  db.collection("latest_version").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { version_url: newValue } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "changed",
        });
      }
    }
  );
});

router.put("/registrationCodePrinted", (req, res, next) => {
  let put_data = req.body;
  let code = put_data.code;

  db.collection("registration_codes").updateOne(
    { code: code },
    { $set: { printed: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "changed",
        });
      }
    }
  );
});

//#################### [  $-M-$ APP  ] ###############################

router.put("/merchantLocation", (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let lat = parseFloat(put_data.lat);
  let lng = parseFloat(put_data.lng);

  db.collection("merchants").updateOne(
    { nick_name: nick_name },
    { $set: { lat: lat, lng: lng, dateOfLocation: new Date() } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});
router.put("/merchantBlock", (req, res, next) => {
  let put_data = req.body;
  let nick_name = put_data.nick_name;

  db.collection("merchants").updateOne(
    { nick_name: nick_name },
    { $set: { blocked: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "blocked",
        });
      }
    }
  );
});

router.put("/merchantUnBlock", (req, res, next) => {
  let put_data = req.body;
  let nick_name = put_data.nick_name;

  db.collection("merchants").updateOne(
    { nick_name: nick_name },
    { $set: { blocked: false } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "unblocked",
        });
      }
    }
  );
});

router.put("/merchantPassword", async (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let old_password = put_data.old_password;
  let new_password = put_data.new_password;

  let enc_oldpass = await CONSTANTS.encrypt(old_password);
  let enc_newpass = await CONSTANTS.encrypt(new_password);

  db.collection("merchants").findOne(
    { nick_name: nick_name },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result1) {
          if (result1.password == enc_oldpass) {
            db.collection("merchants").updateOne(
              { nick_name: nick_name },
              { $set: { password: enc_newpass } },
              (err, result2) => {
                if (err) {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "query 2 error",
                  });
                } else {
                  res.status(200);
                  res.json({
                    success: "true",
                    msg: "تم تغيير الباسوورد",
                  });
                }
              }
            );
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "الباسوورد القديم خاطئ",
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "merchant not exists",
          });
        }
      }
    }
  );
});

router.put("/merchantPattern", (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let new_pattern = put_data.new_pattern;

  db.collection("merchants").updateOne(
    { nick_name: nick_name },
    { $set: { pattern: new_pattern } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});
//#################### [  $-T-$ APP  ] ###############################

router.put("/transporterLocation", (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let lat = parseFloat(put_data.lat);
  let lng = parseFloat(put_data.lng);

  db.collection("transporters").updateOne(
    { nick_name: nick_name },
    { $set: { lat: lat, lng: lng, dateOfLocation: new Date() } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});
router.put("/transporterBlock", (req, res, next) => {
  let put_data = req.body;
  let nick_name = put_data.nick_name;

  db.collection("transporters").updateOne(
    { nick_name: nick_name },
    { $set: { blocked: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "blocked",
        });
      }
    }
  );
});

router.put("/transporterUnBlock", (req, res, next) => {
  let put_data = req.body;
  let nick_name = put_data.nick_name;

  db.collection("transporters").updateOne(
    { nick_name: nick_name },
    { $set: { blocked: false } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "unblocked",
        });
      }
    }
  );
});

router.put("/transporterPassword", async (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let old_password = put_data.old_password;
  let new_password = put_data.new_password;

  let enc_oldpass = await CONSTANTS.encrypt(old_password);
  let enc_newpass = await CONSTANTS.encrypt(new_password);

  db.collection("transporters").findOne(
    { nick_name: nick_name },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result1) {
          if (result1.password == enc_oldpass) {
            db.collection("transporters").updateOne(
              { nick_name: nick_name },
              { $set: { password: enc_newpass } },
              (err, result2) => {
                if (err) {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "query 2 error",
                  });
                } else {
                  res.status(200);
                  res.json({
                    success: "true",
                    msg: "تم تغيير الباسوورد",
                  });
                }
              }
            );
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "الباسوورد القديم خاطئ",
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "transporter not exists",
          });
        }
      }
    }
  );
});

router.put("/transporterPattern", (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let new_pattern = put_data.new_pattern;

  db.collection("transporters").updateOne(
    { nick_name: nick_name },
    { $set: { pattern: new_pattern } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});
//#################### [  $-H-$ APP  ] ###############################

router.put("/hiderLocation", (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let lat = parseFloat(put_data.lat);
  let lng = parseFloat(put_data.lng);

  db.collection("hiders").updateOne(
    { nick_name: nick_name },
    { $set: { lat: lat, lng: lng, dateOfLocation: new Date() } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});
router.put("/hiderBlock", (req, res, next) => {
  let put_data = req.body;
  let nick_name = put_data.nick_name;

  db.collection("hiders").updateOne(
    { nick_name: nick_name },
    { $set: { blocked: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "blocked",
        });
      }
    }
  );
});

router.put("/hiderUnBlock", (req, res, next) => {
  let put_data = req.body;
  let nick_name = put_data.nick_name;

  db.collection("hiders").updateOne(
    { nick_name: nick_name },
    { $set: { blocked: false } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "unblocked",
        });
      }
    }
  );
});

router.put("/hiderPassword", async (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let old_password = put_data.old_password;
  let new_password = put_data.new_password;

  let enc_oldpass = await CONSTANTS.encrypt(old_password);
  let enc_newpass = await CONSTANTS.encrypt(new_password);

  db.collection("hiders").findOne({ nick_name: nick_name }, (err, result1) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result1) {
        if (result1.password == enc_oldpass) {
          db.collection("hiders").updateOne(
            { nick_name: nick_name },
            { $set: { password: enc_newpass } },
            (err, result2) => {
              if (err) {
                res.status(200);
                res.json({
                  success: "false",
                  msg: "query 2 error",
                });
              } else {
                res.status(200);
                res.json({
                  success: "true",
                  msg: "تم تغيير الباسوورد",
                });
              }
            }
          );
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "الباسوورد القديم خاطئ",
          });
        }
      } else {
        res.status(200);
        res.json({
          success: "false",
          msg: "hider not exists",
        });
      }
    }
  });
});

router.put("/hiderPattern", (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let new_pattern = put_data.new_pattern;

  db.collection("hiders").updateOne(
    { nick_name: nick_name },
    { $set: { pattern: new_pattern } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

//====================== user =======================
router.put("/userBlock", (req, res, next) => {
  let put_data = req.body;
  let phone = put_data.phone;

  db.collection("users").updateOne(
    { phone: phone },
    { $set: { blocked: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "blocked",
        });
      }
    }
  );
});
router.put("/userUnBlock", (req, res, next) => {
  let put_data = req.body;
  let phone = put_data.phone;

  db.collection("users").updateOne(
    { phone: phone },
    { $set: { blocked: false } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "unblocked",
        });
      }
    }
  );
});
//====================== Bash =======================
router.put("/exClientBlock", (req, res, next) => {
  let put_data = req.body;
  let nick_name = put_data.nick_name;
  let his_exchanger = put_data.his_exchanger;

  db.collection("ex_clients").updateOne(
    { nick_name: nick_name, his_exchanger: his_exchanger },
    { $set: { blocked: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "blocked",
        });
      }
    }
  );
});
router.put("/exClientUnBlock", (req, res, next) => {
  let put_data = req.body;
  let nick_name = put_data.nick_name;
  let his_exchanger = put_data.his_exchanger;

  db.collection("ex_clients").updateOne(
    { nick_name: nick_name, his_exchanger: his_exchanger },
    { $set: { blocked: false } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "unblocked",
        });
      }
    }
  );
});
router.put("/exClientLocation", (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let his_exchanger = put_data.his_exchanger;
  let lat = parseFloat(put_data.lat);
  let lng = parseFloat(put_data.lng);

  db.collection("ex_clients").updateOne(
    { nick_name: nick_name, his_exchanger: his_exchanger },
    { $set: { lat: lat, lng: lng, dateOfLocation: new Date() } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

router.put("/exchangerPassword", async (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let old_password = put_data.old_password;
  let new_password = put_data.new_password;

  let enc_oldpass = await CONSTANTS.encrypt(old_password);
  let enc_newpass = await CONSTANTS.encrypt(new_password);

  db.collection("exchangers").findOne(
    { nick_name: nick_name },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result1) {
          if (result1.password == enc_oldpass) {
            db.collection("exchangers").updateOne(
              { nick_name: nick_name },
              { $set: { password: enc_newpass } },
              (err, result2) => {
                if (err) {
                  res.status(200);
                  res.json({
                    success: "false",
                    msg: "query 2 error",
                  });
                } else {
                  res.status(200);
                  res.json({
                    success: "true",
                    msg: "تم تغيير الباسوورد",
                  });
                }
              }
            );
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "الباسوورد القديم خاطئ",
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "exchanger not exists",
          });
        }
      }
    }
  );
});

router.put("/exchangerPattern", (req, res, next) => {
  let put_data = req.body;

  let nick_name = put_data.nick_name;
  let new_pattern = put_data.new_pattern;

  db.collection("exchangers").updateOne(
    { nick_name: nick_name },
    { $set: { pattern: new_pattern } },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "updated",
        });
      }
    }
  );
});

router.put("/exchangerBlock", (req, res, next) => {
  let put_data = req.body;
  let nick_name = put_data.nick_name;

  db.collection("exchangers").updateOne(
    { nick_name: nick_name },
    { $set: { blocked: true } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "blocked",
        });
      }
    }
  );
});
router.put("/exchangerUnBlock", (req, res, next) => {
  let put_data = req.body;
  let nick_name = put_data.nick_name;

  db.collection("exchangers").updateOne(
    { nick_name: nick_name },
    { $set: { blocked: false } },
    (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(200);
        res.json({
          success: "true",
          msg: "unblocked",
        });
      }
    }
  );
});

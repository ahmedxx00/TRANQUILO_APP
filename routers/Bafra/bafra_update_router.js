const express = require("express");
const router = express.Router();
const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil
const ObjectId = require("mongodb").ObjectId;

const CONSTANTS = require("../../CONSTANTS");

module.exports = router;

//##################################[ bafra APP ]###################################

router.put("/userGiftAddWalletNumber", (req, res, next) => {
  let put_data = req.body;

  let giftId = put_data.giftId;
  let wallet_number = put_data.wallet_number;

  db.collection("bafra_gifts").updateOne(
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
//#########################################[ OWNER ]############################

//-------------------------------- polygons ---------------------------------

router.put("/start_time", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let start_time = put_data.start_time;

  db.collection("bafra_polygons").updateOne(
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

  db.collection("bafra_polygons").updateOne(
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

  db.collection("bafra_polygons").updateOne(
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

  db.collection("bafra_polygons").updateOne(
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

router.put("/wallet_number", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let wallet_number = put_data.wallet_number;

  let payment_method = {
    name: "WALLET",
    value: wallet_number,
  };

  db.collection("bafra_polygons").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { payment_method: payment_method } },
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

router.put("/binance_id", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let binance_id = put_data.binance_id;

  let payment_method = {
    name: "BINANCE",
    value: binance_id,
  };

  db.collection("bafra_polygons").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { payment_method: payment_method } },
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

router.put("/usdt_rate", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let usdt_rate = parseInt(put_data.usdt_rate);


  db.collection("bafra_polygons").updateOne(
    { _id: new ObjectId(_id) },
    { $set: { usdt_rate: usdt_rate } },
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

router.put("/admin_handler", (req, res, next) => {
  let put_data = req.body;

  let _id = put_data._id;
  let admin_handler = put_data.admin_handler;

  db.collection("bafra_polygons").updateOne(
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

router.put("/pointLat", (req, res, next) => {
  let put_data = req.body; // get post body

  let polygonId = put_data.polygonId;
  let groupPosition = parseInt(put_data.groupPosition);
  let pointPosition = parseInt(put_data.pointPosition);
  let newLat = parseFloat(put_data.newLat);

  db.collection("bafra_polygons").findOne(
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

          db.collection("bafra_polygons").updateOne(
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

  db.collection("bafra_polygons").findOne(
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

          db.collection("bafra_polygons").updateOne(
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

//------------------------------- products ----------------------------------

router.put("/groupName", (req, res, next) => {
  let put_data = req.body;

  let groupName = put_data.groupName;
  let newValue = put_data.newValue;

  db.collection("bafra_products").updateOne(
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

router.put("/memTitle", (req, res, next) => {
  let put_data = req.body;

  let groupName = put_data.groupName;
  let memTitle = put_data.memTitle;
  let newValue = put_data.newValue;

  db.collection("bafra_products").findOne(
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

            db.collection("bafra_products").updateOne(
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

  db.collection("bafra_products").findOne(
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

            db.collection("bafra_products").updateOne(
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

  db.collection("bafra_products").findOne(
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

            db.collection("bafra_products").updateOne(
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
//------------------------------- admins ----------------------------------

router.put("/adminNick", (req, res, next) => {
  let put_data = req.body;
  let phone = put_data.phone;
  let nick_name = put_data.nick_name;

  db.collection("bafra_admins").updateOne(
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

  db.collection("bafra_admins").updateOne(
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

router.put("/feedbackRead", (req, res, next) => {
  let put_data = req.body;
  let feedbackId = put_data.feedbackId;

  db.collection("bafra_feedbacks").updateOne(
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

  db.collection("bafra_gifts").updateOne(
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

router.put("/adminBlock", (req, res, next) => {
  let put_data = req.body;
  let phone = put_data.phone;

  db.collection("bafra_admins").updateOne(
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

  db.collection("bafra_admins").updateOne(
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
router.put("/adminPassword", (req, res, next) => {
  let put_data = req.body;

  let phone = put_data.phone;
  let old_password = put_data.old_password;
  let new_password = put_data.new_password;

  let enc_oldpass = CONSTANTS.encrypt(old_password);
  let enc_newpass = CONSTANTS.encrypt(new_password);

  db.collection("bafra_admins").findOne({ phone: phone }, (err, result1) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result1) {
        if (result1.password == enc_oldpass) {
          db.collection("bafra_admins").updateOne(
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

//====================== user =======================

router.put("/userBlock", (req, res, next) => {
  let put_data = req.body;
  let phone = put_data.phone;

  db.collection("bafra_users").updateOne(
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

  db.collection("bafra_users").updateOne(
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
router.put("/userPassword", (req, res, next) => {
  let put_data = req.body;

  let phone = put_data.phone;
  let old_password = put_data.old_password;
  let new_password = put_data.new_password;

  let enc_oldpass = CONSTANTS.encrypt(old_password);
  let enc_newpass = CONSTANTS.encrypt(new_password);

  db.collection("bafra_users").findOne({ phone: phone }, (err, result1) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result1) {
        if (result1.password == enc_oldpass) {
          db.collection("bafra_users").updateOne(
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
          msg: "اليوزر غير موجود",
        });
      }
    }
  });
});

//=====================================================

router.put("/latestName", (req, res, next) => {
  let put_data = req.body;
  let _id = put_data._id;
  let newValue = put_data.newValue;

  db.collection("bafra_latest_version").updateOne(
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

  db.collection("bafra_latest_version").updateOne(
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

  db.collection("bafra_latest_version").updateOne(
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

//====================== user =======================
router.put("/userBlock", (req, res, next) => {
  let put_data = req.body;
  let phone = put_data.phone;

  db.collection("bafra_users").updateOne(
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

  db.collection("bafra_users").updateOne(
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

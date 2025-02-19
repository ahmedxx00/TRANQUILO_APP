const express = require("express");
const router = express.Router();
// const crypto = require("crypto");
const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil
const ObjectId = require("mongodb").ObjectId;

const CONSTANTS = require("../../CONSTANTS");

//#####################################################################################

module.exports = router;

//#################### [  Bafra APP  ] ###############################
router.post("/feedback", (req, res, next) => {
  let post_data = req.body; // get post body

  let phone = post_data.phone;
  let feedback = post_data.feedback;

  db.collection("bafra_feedbacks").insertOne(
    {
      phone: phone,
      feedback: feedback,
      read: false,
      created_at: new Date(), // UTC Date
    },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(201);
        res.json({
          success: "true",
          msg: "done",
        });
      }
    }
  );
});
//################################[OWNER APP]#####################################
router.post("/productMember", (req, res, next) => {
  let post_data = req.body; // get post body

  let groupName = post_data.groupName;
  let title = post_data.title;
  let price = post_data.price;
  let max_num = post_data.max_num;

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
        let x = []; // declare empty array is a must
        if (result1.products != null && result1.products != undefined) {
          x = result1.products;
        }

        let newP = {
          title: title,
          price: parseInt(price),
          max_num: parseInt(max_num),
        };

        x.push(newP);
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
                msg: "done",
              });
            }
          }
        );
      }
    }
  );
});

router.post("/productGroup", (req, res, next) => {
  let post_data = req.body; // get post body

  let groupName = post_data.groupName;

  db.collection("bafra_products").insertOne(
    {
      group_name: groupName,
    },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(201);
        res.json({
          success: "true",
          msg: "added",
        });
      }
    }
  );
});

router.post("/admin", (req, res, next) => {
  // --[ OAPP ]--

  let post_data = req.body; // get post body

  let phone = post_data.phone;
  let password = post_data.password;
  let nick_name = post_data.nick_name;

  let enc_pass = CONSTANTS.encrypt(password);

  db.collection("bafra_admins").findOne(
    {
      phone: phone,
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
          res.status(200);
          res.json({
            success: "false",
            msg: "admin exists",
          });
        } else {
          db.collection("bafra_admins").insertOne(
            {
              phone: phone,
              password: enc_pass,
              nick_name: nick_name,
              blocked: false,
              money: parseInt(0), // to save as int
              lat: parseFloat(0.0),
              lng: parseFloat(0.0),
              dateOfLocation: new Date(),
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
                res.status(201);
                res.json({
                  success: "true",
                  msg: "admin added",
                });
              }
            }
          );
        }
      }
    }
  );
});

router.post("/pointGroup", (req, res, next) => {
  let post_data = req.body; // get post body

  let polygonId = post_data.polygonId;

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
          let x = []; // new Array
          let coordinates = result1.geom.coordinates; // Array

          coordinates.push(x);

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

router.post("/polygonPoint", (req, res, next) => {
  let post_data = req.body; // get post body

  let polygonId = post_data.polygonId;
  let groupPosition = parseInt(post_data.groupPosition);
  let newLat = parseFloat(post_data.newLat);
  let newLng = parseFloat(post_data.newLng);

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
          let point = [newLng, newLat]; // new Array
          let coordinates = result1.geom.coordinates; // Array

          coordinates[groupPosition].push(point);

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

router.post("/polygonPoints", (req, res, next) => {
  let post_data = req.body; // get post body

  let polygonId = post_data.polygonId;
  let groupPosition = parseInt(post_data.groupPosition);
  let points = JSON.parse(post_data.points);

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
          coordinates[groupPosition].push(...points.pList); // merge two arrays
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

router.post("/polygon", (req, res, next) => {
  let post_data = req.body; // get post body

  let name = post_data.name;
  let code = post_data.code;

  db.collection("bafra_polygons").insertOne(
    {
      name: name,
      code: code,
      payment_method: {
        name: "",
        value: "",
      },
      usdt_rate: parseInt(0),
      admin_handler: "",
      geom: {
        type: "Polygon",
        coordinates: [],
      },
      start_time: new Date(),
      end_time: new Date(),
    },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(201);
        res.json({
          success: "true",
          msg: "added",
        });
      }
    }
  );
});

router.post("/latest", (req, res, next) => {
  let post_data = req.body; // get post body

  let name = post_data.name;
  let ver = post_data.ver;
  let url = post_data.url;

  db.collection("bafra_latest_version").insertOne(
    {
      app_name: name,
      latest_version: ver,
      version_url: url,
    },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(201);
        res.json({
          success: "true",
          msg: "added",
        });
      }
    }
  );
});

router.post("/userGift", (req, res, next) => {
  let post_data = req.body; // get post body

  let phone = post_data.phone;
  let amount = parseInt(post_data.amount); // gift amount
  let grand_total = parseInt(post_data.grand_total);

  db.collection("bafra_gifts").insertOne(
    {
      phone: phone,
      amount: amount,
      wallet_number: "",
      user_added_wallet_number: false,
      user_got_his_money: false,
      created_at: new Date(),
    },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        db.collection("our_bafra_clients").updateOne(
          { phone: phone },
          {
            $set: {
              next_gift_due: parseInt(0),
              total_at_last_gift: grand_total,
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
              res.status(201);
              res.json({
                success: "true",
                msg: "added",
              });
            }
          }
        );
      }
    }
  );
});

router.post("/review", (req, res, next) => {
  let post_data = req.body; // get post body

  let ph = post_data.ph; // String
  let msg = post_data.msg; // String
  let dt = post_data.dt; // the arabic String text for created_at Date
  let created_at = post_data.created_at;

  db.collection("reviews").insertOne(
    {
      ph: ph,
      msg: msg,
      dt: dt,
      created_at: new Date(created_at), // UTC Date
    },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(201);
        res.json({
          success: "true",
          msg: result1.insertedId,
        });
      }
    }
  );
});

router.post("/appliance", (req, res, next) => {
  let post_data = req.body; // get post body

  let lat = parseFloat(post_data.lat); // double
  let lng = parseFloat(post_data.lng); // double
  let desc = post_data.desc;
  let type = post_data.type;

  db.collection("appliances").insertOne(
    {
      lat: lat,
      lng: lng,
      desc: desc,
      type: type,
      created_at: new Date(),
    },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        res.status(201);
        res.json({
          success: "true",
          msg: "added",
        });
      }
    }
  );
});
//-------------------- generate registration codes ------------------
async function generateRegistrationCodes(num) {
  let y = [];
  for (let i = 0; i < num; i++) {
    let c = await genC();
    y.push({
      code: c,
      phone: "",
      printed: false,
      used: false,
    });
  }
  return y;
}
async function genC() {
  var r = "";
  var chars = CONSTANTS.chars;
  var len = CONSTANTS.regCodeLength; // code length 14
  for (var i = 0; i < len; i++) {
    r += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return r;
}
//-------------------------------------------------------------------

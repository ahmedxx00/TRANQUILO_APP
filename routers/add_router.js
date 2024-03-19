const express = require("express");
const router = express.Router();
// const crypto = require("crypto");
const mongodbutil = require("../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil
const ObjectId = require("mongodb").ObjectId;

const CONSTANTS = require("../CONSTANTS");

//#####################################################################################

module.exports = router;

//#################### [  tranquilo APP  ] ###############################
router.post("/userFeedback", (req, res, next) => {
  let post_data = req.body; // get post body

  let phone = post_data.phone;
  let feedback = post_data.feedback;

  db.collection("user_feedbacks").insertOne(
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
//################################[OO APP]#####################################
router.post("/productMember", (req, res, next) => {
  let post_data = req.body; // get post body

  let groupName = post_data.groupName;
  let title = post_data.title;
  let price = post_data.price;
  let max_num = post_data.max_num;

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

  db.collection("products").insertOne(
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

  db.collection("admins").findOne(
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
          db.collection("admins").insertOne(
            {
              phone: phone,
              password: enc_pass,
              nick_name: nick_name,
              blocked: false,
              money: +0, // to save as int
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
          let x = []; // new Array
          let coordinates = result1.geom.coordinates; // Array

          coordinates.push(x);

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

router.post("/polygonPoint", (req, res, next) => {
  let post_data = req.body; // get post body

  let polygonId = post_data.polygonId;
  let groupPosition = parseInt(post_data.groupPosition);
  let newLat = parseFloat(post_data.newLat);
  let newLng = parseFloat(post_data.newLng);

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
          let point = [newLng, newLat]; // new Array
          let coordinates = result1.geom.coordinates; // Array

          coordinates[groupPosition].push(point);

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

router.post("/polygonPoints", (req, res, next) => {
  let post_data = req.body; // get post body

  let polygonId = post_data.polygonId;
  let groupPosition = parseInt(post_data.groupPosition);
  let points = JSON.parse(post_data.points);

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
          coordinates[groupPosition].push(...points.pList); // merge two arrays
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

router.post("/polygon", (req, res, next) => {
  let post_data = req.body; // get post body

  let name = post_data.name;
  let code = post_data.code;

  db.collection("polygons").insertOne(
    {
      name: name,
      code: code,
      geom: {
        type: "Polygon",
        coordinates: [],
      },
      start_time: new Date(),
      end_time: new Date(),
      delivery_point: {
        lat: parseFloat(10.0),
        lng: parseFloat(10.0),
      },
      admin_handler: "",
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

  db.collection("latest_version").insertOne(
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

router.post("/registrationCodes", async (req, res, next) => {
  let post_data = req.body; // get post body

  let num = parseInt(post_data.num);

  let c_list = await generateRegistrationCodes(num); // array of documents

  db.collection("registration_codes").insertMany(c_list, (err, result1) => {
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
  });
});

router.post("/userGift", (req, res, next) => {
  let post_data = req.body; // get post body

  let phone = post_data.phone;
  let grand_total = parseInt(post_data.grand_total);
  let amount = parseInt(post_data.amount); // gift amount

  db.collection("user_gifts").insertOne(
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
        db.collection("our_clients").updateOne(
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

//#################### [  $-M-$ APP  ] ###############################
router.post("/merchant", (req, res, next) => {
  let post_data = req.body; // get post body

  let nick_name = post_data.nick_name;
  let password = post_data.password;
  let pattern = post_data.pattern;

  let enc_pass = CONSTANTS.encrypt(password);

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
          res.status(200);
          res.json({
            success: "false",
            msg: "merchant exists",
          });
        } else {
          db.collection("merchants").insertOne(
            {
              nick_name: nick_name,
              password: enc_pass,
              pattern: pattern,
              blocked: false,
              lat: parseFloat(0),
              lng: parseFloat(0),
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
                  msg: "merchant added",
                });
              }
            }
          );
        }
      }
    }
  );
});
//#################### [  $-T-$ APP  ] ###############################
router.post("/transporter", (req, res, next) => {
  let post_data = req.body; // get post body

  let nick_name = post_data.nick_name;
  let password = post_data.password;
  let pattern = post_data.pattern;

  let enc_pass = CONSTANTS.encrypt(password);

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
          res.status(200);
          res.json({
            success: "false",
            msg: "transporter exists",
          });
        } else {
          db.collection("transporters").insertOne(
            {
              nick_name: nick_name,
              password: enc_pass,
              pattern: pattern,
              blocked: false,
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
                  msg: "transporter added",
                });
              }
            }
          );
        }
      }
    }
  );
});
//#################### [  $-H-$ APP  ] ###############################
router.post("/hider", (req, res, next) => {
  let post_data = req.body; // get post body

  let nick_name = post_data.nick_name;
  let password = post_data.password;
  let pattern = post_data.pattern;

  let enc_pass = CONSTANTS.encrypt(password);

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
          res.status(200);
          res.json({
            success: "false",
            msg: "hider exists",
          });
        } else {
          db.collection("hiders").insertOne(
            {
              nick_name: nick_name,
              password: enc_pass,
              pattern: pattern,
              blocked: false,
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
                  msg: "hider added",
                });
              }
            }
          );
        }
      }
    }
  );
});
//#################### [  Bash APP  ] ###############################
router.post("/exClient", (req, res, next) => {
  let post_data = req.body; // get post body

  let nick_name = post_data.nick_name;
  let password = post_data.password;
  let his_exchanger = post_data.his_exchanger;

  let enc_pass = CONSTANTS.encrypt(password);

  db.collection("ex_clients").findOne(
    {
      nick_name: nick_name,
      his_exchanger: his_exchanger,
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
            msg: "هذا الاسم مستخدم بالفعل",
          });
        } else {
          db.collection("ex_clients").insertOne(
            {
              nick_name: nick_name,
              password: enc_pass,
              blocked: false,
              his_exchanger: his_exchanger,
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
                  msg: "تم اضافة العميل",
                });
              }
            }
          );
        }
      }
    }
  );
});

router.post("/exchanger", (req, res, next) => {
  let post_data = req.body; // get post body

  let nick_name = post_data.nick_name;
  let password = post_data.password;
  let pattern = post_data.pattern;

  let enc_pass = CONSTANTS.encrypt(password);

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
          res.status(200);
          res.json({
            success: "false",
            msg: "هذا الاسم مستخدم بالفعل",
          });
        } else {
          db.collection("exchangers").insertOne(
            {
              nick_name: nick_name,
              password: enc_pass,
              pattern: pattern,
              blocked: false,
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
                  msg: "تم اضافة التاجر",
                });
              }
            }
          );
        }
      }
    }
  );
});

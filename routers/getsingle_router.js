const express = require("express");
const router = express.Router();

const mongodbutil = require("../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil

const CONSTANTS = require("../CONSTANTS");
module.exports = router;
// const ObjectId = require("mongodb").ObjectId;


router.get("/userPassword", (req, res, next) => {
  let phone = req.query.phone;

  db.collection("users").findOne({ phone: phone }, async (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        let plain = await CONSTANTS.decrypt(result.password);
        res.status(200);
        res.json({
          success: "true",
          msg: plain,
        });
      } else {
        res.status(200);
        res.json({
          success: "false",
          msg: "no password for this user",
        });
      }
    }
  });
});

router.get("/adminPassword", (req, res, next) => {
  let phone = req.query.phone;

  db.collection("admins").findOne({ phone: phone }, async (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        let plain = await CONSTANTS.decrypt(result.password);
        res.status(200);
        res.json({
          success: "true",
          msg: plain,
        });
      } else {
        res.status(200);
        res.json({
          success: "false",
          msg: "no password for this admin",
        });
      }
    }
  });
});

//#################### [  tranquilo APP  ] ###############################
router.get("/userGift", (req, res, next) => {
  
  let phone = req.query.phone; // login_phone

  db.collection("user_gifts")
    .find({
      phone: phone,
    })
    .sort({ created_at: -1 })
    .limit(1)
    .toArray((err, items) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (items && items.length > 0) {
          let item = items[0]; // only one

          let x = item.user_added_wallet_number;
          let y = item.user_got_his_money;

          if (!x && !y) {
            // no wallet number && no transfer occured
            res.status(200);
            res.json({
              success: "true",
              msg: "user_has_gift_waiting_for_wallet_number",
              gift: item,
            });
          } else if (x && !y) {
            // wallet number added && no transfer occured
            res.status(200);
            res.json({
              success: "false",
              msg: "user_has_gift_waiting_for_money_transfer",
              gift: item,
            });
          } else if (x && y) {
            // wallet number added && transfer occured
            res.status(200);
            res.json({
              success: "false",
              msg: "user_has_no_gift",
            });
          }
        } else {// no gift inside db 
          res.status(200);
          res.json({
            success: "false",
            msg: "user_has_no_gift",
          });
        }
      }
    });
});
//#################### [  $-M-$ APP  ] ###############################
router.get("/merchantPassword", (req, res, next) => {
  let nick_name = req.query.nick_name;

  db.collection("merchants").findOne(
    { nick_name: nick_name },
    async (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result) {
          let plain = await CONSTANTS.decrypt(result.password);
          res.status(200);
          res.json({
            success: "true",
            msg: plain,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no password for this merchant",
          });
        }
      }
    }
  );
});
router.get("/merchantPattern", (req, res, next) => {
  let nick_name = req.query.nick_name;

  db.collection("merchants").findOne(
    { nick_name: nick_name },
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
            msg: result.pattern,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no pattern for this merchant",
          });
        }
      }
    }
  );
});
//#################### [  $-T-$ APP  ] ###############################
router.get("/transporterPassword", (req, res, next) => {
  let nick_name = req.query.nick_name;

  db.collection("transporters").findOne(
    { nick_name: nick_name },
    async (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result) {
          let plain = await CONSTANTS.decrypt(result.password);
          res.status(200);
          res.json({
            success: "true",
            msg: plain,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no password for this transporter",
          });
        }
      }
    }
  );
});
router.get("/transporterPattern", (req, res, next) => {
  let nick_name = req.query.nick_name;

  db.collection("transporters").findOne(
    { nick_name: nick_name },
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
            msg: result.pattern,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no pattern for this transporter",
          });
        }
      }
    }
  );
});
//#################### [  $-H-$ APP  ] ###############################
router.get("/hiderPassword", (req, res, next) => {
  let nick_name = req.query.nick_name;

  db.collection("hiders").findOne({ nick_name: nick_name }, async (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        let plain = await CONSTANTS.decrypt(result.password);
        res.status(200);
        res.json({
          success: "true",
          msg: plain,
        });
      } else {
        res.status(200);
        res.json({
          success: "false",
          msg: "no password for this hider",
        });
      }
    }
  });
});
router.get("/hiderPattern", (req, res, next) => {
  let nick_name = req.query.nick_name;

  db.collection("hiders").findOne({ nick_name: nick_name }, (err, result) => {
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
          msg: result.pattern,
        });
      } else {
        res.status(200);
        res.json({
          success: "false",
          msg: "no pattern for this hider",
        });
      }
    }
  });
});
//#################### [  Bash APP  ] ###############################
router.get("/exClientPassword", (req, res, next) => {
  let nick_name = req.query.nick_name;
  let his_exchanger = req.query.his_exchanger;

  db.collection("ex_clients").findOne(
    { nick_name: nick_name, his_exchanger: his_exchanger },
    async (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result) {
          let plain = await CONSTANTS.decrypt(result.password);
          res.status(200);
          res.json({
            success: "true",
            msg: plain,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no password for this client",
          });
        }
      }
    }
  );
});
router.get("/exchangerPassword", (req, res, next) => {
  let nick_name = req.query.nick_name;

  db.collection("exchangers").findOne(
    { nick_name: nick_name },
    async (err, result) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (result) {
          let plain = await CONSTANTS.decrypt(result.password);
          res.status(200);
          res.json({
            success: "true",
            msg: plain,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no password for this exchanger",
          });
        }
      }
    }
  );
});
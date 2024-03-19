const express = require("express");
const router = express.Router();

const mongodbutil = require("../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil

const CONSTANTS = require("../CONSTANTS");
// const ObjectId = require("mongodb").ObjectId;

module.exports = router;

//#################### [  tranquilo APP  ] ###############################
router.post("/user", (req, res, next) => {
  // --[ tranquilo ]--
  let post_data = req.body; // get post params
  let phone = post_data.phone; // get phone
  let plain_pass = post_data.password;
  let enc_pass = CONSTANTS.encrypt(plain_pass); // get encrypted password

  db.collection("users").findOne({ phone: phone }, (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        // if user matches
        if (result.blocked == false) {
          if (result.password == enc_pass) {
            //###################################
            res.status(200);
            res.json({
              success: "true",
              msg: result.phone,
            });
            //####################################
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "wrong_password",
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "blocked",
          });
        }
      } else {
        // no user matches
        res.status(200);
        res.json({
          success: "false",
          msg: "not_exists",
        });
      }
    }
  });
});

//#################### [  APY APP  ] ###############################
router.post("/admin", (req, res, next) => {
  // --[ APY ]--
  let post_data = req.body; // get post params
  let phone = post_data.phone; // get phone
  let plain_pass = post_data.password;
  let enc_pass = CONSTANTS.encrypt(plain_pass); // get encrypted password

  db.collection("admins").findOne({ phone: phone }, (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        // if user matches
        if (result.blocked == false) {
          if (result.password == enc_pass) {
            //###################################
            res.status(200);
            res.json({
              success: "true",
              msg: "login successful",
              phone: result.phone,
              nick_name: result.nick_name,
            });
            //####################################
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "باسوورد خاطئه",
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "blocked",
          });
        }
      } else {
        // no user matches
        res.status(200);
        res.json({
          success: "false",
          msg: "غير موجود",
        });
      }
    }
  });
});

//#################### [  $-M-$ APP  ] ###############################
router.post("/merchant", (req, res, next) => {
  // --[ $-M-$ ]--
  let post_data = req.body; // get post params
  let nick_name = post_data.nick_name; // get nick_name
  let plain_pass = post_data.password;
  let enc_pass = CONSTANTS.encrypt(plain_pass); // get encrypted password

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
          // if user matches
          if (result.blocked == false) {
            if (result.password == enc_pass) {
              //###################################
              res.status(200);
              res.json({
                success: "true",
                msg: "login successful",
                nick_name: result.nick_name,
                pattern: result.pattern,
              });
              //####################################
            } else {
              res.status(200);
              res.json({
                success: "false",
                msg: "باسوورد خاطئه",
              });
            }
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "blocked",
            });
          }
        } else {
          // no user matches
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
router.post("/transporter", (req, res, next) => {
  // --[ $-T-$ ]--
  let post_data = req.body; // get post params
  let nick_name = post_data.nick_name; // get nick_name
  let plain_pass = post_data.password;
  let enc_pass = CONSTANTS.encrypt(plain_pass); // get encrypted password

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
          // if user matches
          if (result.blocked == false) {
            if (result.password == enc_pass) {
              //###################################
              res.status(200);
              res.json({
                success: "true",
                msg: "login successful",
                nick_name: result.nick_name,
                pattern: result.pattern,
              });
              //####################################
            } else {
              res.status(200);
              res.json({
                success: "false",
                msg: "باسوورد خاطئه",
              });
            }
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "blocked",
            });
          }
        } else {
          // no user matches
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
router.post("/hider", (req, res, next) => {
  // --[ $-H-$ ]--
  let post_data = req.body; // get post params
  let nick_name = post_data.nick_name; // get nick_name
  let plain_pass = post_data.password;
  let enc_pass = CONSTANTS.encrypt(plain_pass); // get encrypted password

  db.collection("hiders").findOne({ nick_name: nick_name }, (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        // if user matches
        if (result.blocked == false) {
          if (result.password == enc_pass) {
            //###################################
            res.status(200);
            res.json({
              success: "true",
              msg: "login successful",
              nick_name: result.nick_name,
              pattern: result.pattern,
            });
            //####################################
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "باسوورد خاطئه",
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "blocked",
          });
        }
      } else {
        // no user matches
        res.status(200);
        res.json({
          success: "false",
          msg: "غير موجود",
        });
      }
    }
  });
});
//#################### [  Bash APP  ] ###############################
router.post("/exClient", (req, res, next) => {
  let post_data = req.body; // get post params
  let nick_name = post_data.nick_name; // get nick_name
  let plain_pass = post_data.password;
  let enc_pass = CONSTANTS.encrypt(plain_pass); // get encrypted password

  db.collection("ex_clients").findOne({ nick_name: nick_name }, (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        // if user matches
        if (result.blocked == false) {
          if (result.password == enc_pass) {
            //###################################
            res.status(200);
            res.json({
              success: "true",
              msg: "login successful",
              client: result,
            });
            //####################################
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "باسوورد خاطئه",
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "blocked",
          });
        }
      } else {
        // no user matches
        res.status(200);
        res.json({
          success: "false",
          msg: "غير موجود",
        });
      }
    }
  });
});
router.post("/exchanger", (req, res, next) => {
  let post_data = req.body; // get post params
  let nick_name = post_data.nick_name; // get nick_name
  let plain_pass = post_data.password;
  let enc_pass = CONSTANTS.encrypt(plain_pass); // get encrypted password

  db.collection("exchangers").findOne({ nick_name: nick_name }, (err, result) => {
    if (err) {
      res.status(200);
      res.json({
        success: "false",
        msg: "query 1 error",
      });
    } else {
      if (result) {
        // if user matches
        if (result.blocked == false) {
          if (result.password == enc_pass) {
            //###################################
            res.status(200);
            res.json({
              success: "true",
              msg: "login successful",
              exchanger: result,
            });
            //####################################
          } else {
            res.status(200);
            res.json({
              success: "false",
              msg: "باسوورد خاطئه",
            });
          }
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "blocked",
          });
        }
      } else {
        // no user matches
        res.status(200);
        res.json({
          success: "false",
          msg: "غير موجود",
        });
      }
    }
  });
});
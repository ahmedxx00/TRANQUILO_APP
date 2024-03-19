//=================== before ES6 syntax ======================
const express = require("express");
const router = express.Router();
const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil
module.exports = router;

// const ObjectId = require("mongodb").ObjectId;
// const CONSTANTS = require("../CONSTANTS");
// const pool = CONSTANTS.pool;

//#################### [  bafra APP  ] ###############################
router.get("/allProducts", (req, res, next) => {
  // --[ bafra ]--

  let city_code = req.query.city_code; // may be null if user hasn't login before  --> for future use if needed

  db.collection("bafra_products")
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
  // --[ bafra Owner]--

router.get("/allPolygons", (req, res, next) => {
  // --[ OO ]--
  db.collection("bafra_polygons")
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
            polygonList: items
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
  db.collection("bafra_admins")
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
  db.collection("bafra_users")
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
  db.collection("bafra_latest_version")
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
  db.collection("our_bafra_clients")
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

router.get("/feedbacks", (req, res, next) => {
  // --[ bafra Owner ]--
  db.collection("bafra_feedbacks")
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
            feedbackList: items,
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
  db.collection("bafra_gifts")
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

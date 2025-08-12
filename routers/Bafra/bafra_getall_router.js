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
            polygonList: items,
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
    .find({ user_got_his_money: false })
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

router.get("/reviews", (req, res, next) => {
  // -- [ bafra ] and [ bafra Owner ]--

  const resultsPerPage = 20;

  let previous_fetched_count = req.query.previous_fetched_count; // the count already there in the app

  db.collection("reviews")
    .find({})
    .sort({ created_at: -1 })
    .skip(!previous_fetched_count ? 0 : parseInt(previous_fetched_count))
    .limit(resultsPerPage + 1) // fetch one extra result
    .toArray((err, reviews) => {
      let hasNextPage = false;

      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (reviews.length > 0) {
          // if got an extra result 21
          if (reviews.length > resultsPerPage) {
            hasNextPage = true; // has a next page of results
            reviews.pop(); // remove extra result the 21th result
          }
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            reviews: reviews,
            hasNextPage: hasNextPage,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no reviews",
          });
        }
      }
    });
});
router.get("/appliances", (req, res, next) => {
  // -- [ bafra Owner ]--

  db.collection("appliances")
    .find({})
    .toArray((err, appliances) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (appliances.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            applianceList: appliances,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no appliances",
          });
        }
      }
    });
});

router.get("/no_area_matched_users", (req, res, next) => {
  // -- [ bafra Owner ]--

  db.collection("bafra_no_area_matched_users")
    .find({})
    .toArray((err, no_area_matched_users) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        if (no_area_matched_users.length > 0) {
          res.status(200);
          res.json({
            success: "true",
            msg: "done",
            noAreaUsersList: no_area_matched_users,
          });
        } else {
          res.status(200);
          res.json({
            success: "false",
            msg: "no no_area_matched_users",
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

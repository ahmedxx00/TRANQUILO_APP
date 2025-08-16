const express = require("express");
const router = express.Router();
// const crypto = require("crypto");
const mongodbutil = require("../../mongodbutil");
const db = mongodbutil.getDb(); // retrieved from mongodbutil

const ObjectId = require("mongodb").ObjectId;

// const CONSTANTS = require("../CONSTANTS");

//#####################################################################################

module.exports = router;

//#####################################################################

router.delete("/productMember", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let groupName = delete_data.groupName;
  let memTitle = delete_data.memTitle;

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
            x.splice(i, 1);

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
                    msg: "deleted",
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

router.delete("/productGroup", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let groupName = delete_data.groupName;

  db.collection("bafra_products").deleteOne(
    { group_name: groupName },
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
          msg: "deleted",
        });
      }
    }
  );
});

router.delete("/pointGroup", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let polygonId = delete_data.polygonId;
  let groupPosition = parseInt(delete_data.groupPosition);

  db.collection("bafra_polygons").findOne(
    { _id: new ObjectId(polygonId) },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        let coordinates = result1.geom.coordinates; // Array

        coordinates.splice(groupPosition, 1);

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
      }
    }
  );
});

router.delete("/polygonPoint", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let polygonId = delete_data.polygonId;
  let groupPosition = parseInt(delete_data.groupPosition);
  let pointPosition = parseInt(delete_data.pointPosition);

  db.collection("bafra_polygons").findOne(
    { _id: new ObjectId(polygonId) },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        let coordinates = result1.geom.coordinates; // Array

        coordinates[groupPosition].splice(pointPosition, 1);

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
      }
    }
  );
});

router.delete("/polygon", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let polygonId = delete_data.polygonId;

  db.collection("bafra_polygons").deleteOne(
    { _id: new ObjectId(polygonId) },
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
          msg: "deleted",
        });
      }
    }
  );
});

router.delete("/latestVersion", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let _id = delete_data._id;

  db.collection("bafra_latest_version").deleteOne(
    { _id: new ObjectId(_id) },
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
          msg: "deleted",
        });
      }
    }
  );
});

// not used
router.delete("/allOrders", (req, res, next) => {
  db.collection("bafra_orders").deleteMany({}, (err, result1) => {
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
        msg: "all orders deleted successfully",
      });
    }
  });
});

router.delete("/review", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let _id = delete_data._id;

  db.collection("reviews").deleteOne(
    { _id: new ObjectId(_id) },
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
          msg: "deleted",
        });
      }
    }
  );
});

router.delete("/appliance", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let _id = delete_data._id;

  db.collection("appliances").deleteOne(
    { _id: new ObjectId(_id) },
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
          msg: "deleted",
        });
      }
    }
  );
});

// not used
router.delete("/usedRegistrationCodes", (req, res, next) => {
  db.collection("registration_codes").deleteMany(
    {
      used: true,
    },
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
          msg: "used codes deleted",
        });
      }
    }
  );
});

router.delete("/admin", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let _id = delete_data._id;

  db.collection("bafra_admins").deleteOne(
    { _id: new ObjectId(_id) },
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
          msg: "deleted",
        });
      }
    }
  );
});

router.delete("/user", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let _id = delete_data._id;

  db.collection("bafra_users").deleteOne(
    { _id: new ObjectId(_id) },
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
          msg: "deleted",
        });
      }
    }
  );
});

router.delete("/feedback", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let _id = delete_data._id;

  db.collection("bafra_feedbacks").deleteOne(
    { _id: new ObjectId(_id) },
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
          msg: "deleted",
        });
      }
    }
  );
});

router.delete("/our_client", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let _id = delete_data._id;

  db.collection("our_bafra_clients").deleteOne(
    { _id: new ObjectId(_id) },
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
          msg: "deleted",
        });
      }
    }
  );
});
router.delete("/no_area_user", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let _id = delete_data._id;

  db.collection("bafra_no_area_matched_users").deleteOne(
    { _id: new ObjectId(_id) },
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
          msg: "deleted",
        });
      }
    }
  );
});

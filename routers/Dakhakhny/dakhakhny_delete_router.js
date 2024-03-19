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

  db.collection("dakhakhny_products").findOne(
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

            db.collection("dakhakhny_products").updateOne(
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

  db.collection("dakhakhny_products").deleteOne(
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

  db.collection("dakhakhny_polygons").findOne(
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

        db.collection("dakhakhny_polygons").updateOne(
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

router.delete("/polygonAdmin", (req, res, next) => {
  let delete_data = req.query; // get delete query

  let polygonId = delete_data.polygonId;
  let adminPosition = parseInt(delete_data.adminPosition);

  db.collection("dakhakhny_polygons").findOne(
    { _id: new ObjectId(polygonId) },
    (err, result1) => {
      if (err) {
        res.status(200);
        res.json({
          success: "false",
          msg: "query 1 error",
        });
      } else {
        let admins = result1.admins; // Array

        admins.splice(adminPosition, 1);

        db.collection("dakhakhny_polygons").updateOne(
          {
            _id: new ObjectId(polygonId),
          },
          { $set: { admins: admins } },
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

  db.collection("dakhakhny_polygons").findOne(
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

        db.collection("dakhakhny_polygons").updateOne(
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

  db.collection("dakhakhny_polygons").deleteOne(
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

  db.collection("dakhakhny_latest_version").deleteOne(
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

router.delete("/allOrders", (req, res, next) => {
  db.collection("dakhakhny_orders").deleteMany({}, (err, result1) => {
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

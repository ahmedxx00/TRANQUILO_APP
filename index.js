/**
 * Restful Services By Node JS
 * Auther : tranquilo
 *
 */

const express = require("express");
const basicAuth = require("./auth");

const app = express(); // create express app

// const server = require("http").createServer(app); // merge http with express then use it in socket io

// const io = require("socket.io")(server); // old syntax

// const ioServer = require("socket.io").Server; // io Server with capital S
// const io = new ioServer(server); // socket io needs basic http server to work not express

//-------- dividing io server into categories using [custom name spaces] --------
// const Deliveries_IO_NS = io.of("/deliveries");
//------------------------------------------------------------------------------

// const bodyParser = require("body-parser");
// const CONSTANTS = require("./CONSTANTS");
// const fs = require("fs");

//------------------------------------------------------------------------------

// app.use(bodyParser.json({ type: "application/json" }));
// app.use(bodyParser.urlencoded({ extended: true }));
//------------------------------------------------------------------------------

app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use("/car_makes_icons", express.static(__dirname + "/car_makes_icons"));
// app.use("/user_images", express.static(__dirname + "/user_images"));
// app.use("/admin_images", express.static(__dirname + "/admin_images"));

app.use(
  "/dakhakhny_products_images",
  express.static(__dirname + "/dakhakhny_products_images")
);

app.use(
  "/bafra_orders_images",
  express.static(__dirname + "/bafra_orders_images")
);

// app.use(express.static(__dirname + "/images"));// not used

//------------------------------------------------------------------------------

app.use(basicAuth);

var mongodbutil = require("./mongodbutil");

mongodbutil.connectToServer(function (err) {
  // connect to DB server once

  if (err) {
    console.log(err);
    return;
  }

  const registerRouter = require("./routers/register_router");
  app.use("/register", registerRouter);

  const loginRouter = require("./routers/login_router");
  app.use("/login", loginRouter);

  const getAllRouter = require("./routers/getall_router");
  app.use("/getall", getAllRouter);

  const getSingleRouter = require("./routers/getsingle_router");
  app.use("/getsingle", getSingleRouter);

  const orderRouter = require("./routers/order_router");
  app.use("/order", orderRouter);

  const checkRouter = require("./routers/check_router");
  app.use("/check", checkRouter);

  const updateRouter = require("./routers/update_router");
  app.use("/update", updateRouter);

  const addRouter = require("./routers/add_router");
  app.use("/add", addRouter);

  const deleteRouter = require("./routers/delete_router");
  app.use("/delete", deleteRouter);

  const fcmNotificationRouter = require("./routers/fcm_notification_router");
  app.use("/fcm_notification", fcmNotificationRouter);

  //########################### Dakhakhny ##############################
  
  const dakhakhnyRegisterRouter = require("./routers/Dakhakhny/dakhakhny_register_router");
  app.use("/dakhakhnyRegister", dakhakhnyRegisterRouter);

  const dakhakhnyLoginRouter = require("./routers/Dakhakhny/dakhakhny_login_router");
  app.use("/dakhakhnyLogin", dakhakhnyLoginRouter);

  const dakhakhnyGetAllRouter = require("./routers/Dakhakhny/dakhakhny_getall_router");
  app.use("/dakhakhnyGetall", dakhakhnyGetAllRouter);

  const dakhakhnyGetSingleRouter = require("./routers/Dakhakhny/dakhakhny_getsingle_router");
  app.use("/dakhakhnyGetsingle", dakhakhnyGetSingleRouter);

  const dakhakhnyOrderRouter = require("./routers/Dakhakhny/dakhakhny_order_router");
  app.use("/dakhakhnyOrder", dakhakhnyOrderRouter);

  const dakhakhnyCheckRouter = require("./routers/Dakhakhny/dakhakhny_check_router");
  app.use("/dakhakhnyCheck", dakhakhnyCheckRouter);

  const dakhakhnyUpdateRouter = require("./routers/Dakhakhny/dakhakhny_update_router");
  app.use("/dakhakhnyUpdate", dakhakhnyUpdateRouter);

  const dakhakhnyAddRouter = require("./routers/Dakhakhny/dakhakhny_add_router");
  app.use("/dakhakhnyAdd", dakhakhnyAddRouter);

  const dakhakhnyDeleteRouter = require("./routers/Dakhakhny/dakhakhny_delete_router");
  app.use("/dakhakhnyDelete", dakhakhnyDeleteRouter);

  const dakhakhnyFcmNotificationRouter = require("./routers/Dakhakhny/dakhakhny_fcm_notification_router");
  app.use("/dakhakhny_fcm_notification", dakhakhnyFcmNotificationRouter);

  //####################################################################
  //########################### Bafra ##############################

  const bafraRegisterRouter = require("./routers/Bafra/bafra_register_router");
  app.use("/bafraRegister", bafraRegisterRouter);

  const bafraLoginRouter = require("./routers/Bafra/bafra_login_router");
  app.use("/bafraLogin", bafraLoginRouter);

  const bafraGetAllRouter = require("./routers/Bafra/bafra_getall_router");
  app.use("/bafraGetall", bafraGetAllRouter);

  const bafraGetSingleRouter = require("./routers/Bafra/bafra_getsingle_router");
  app.use("/bafraGetsingle", bafraGetSingleRouter);

  const bafraOrderRouter = require("./routers/Bafra/bafra_order_router");
  app.use("/bafraOrder", bafraOrderRouter);

  const bafraCheckRouter = require("./routers/Bafra/bafra_check_router");
  app.use("/bafraCheck", bafraCheckRouter);

  const bafraUpdateRouter = require("./routers/Bafra/bafra_update_router");
  app.use("/bafraUpdate", bafraUpdateRouter);

  const bafraAddRouter = require("./routers/Bafra/bafra_add_router");
  app.use("/bafraAdd", bafraAddRouter);

  const bafraDeleteRouter = require("./routers/Bafra/bafra_delete_router");
  app.use("/bafraDelete", bafraDeleteRouter);

  const bafraFcmNotificationRouter = require("./routers/Bafra/bafra_fcm_notification_router");
  app.use("/bafra_fcm_notification", bafraFcmNotificationRouter);

  //####################################################################
  app.use((req, res) => {
    // if req for not found router
    res.json("404 not found");
  });

  app.listen(3000, () => {
    // start server
    console.log("Restful is listen on port 3000");
  });

});

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- [ Father SOCKET IO  Server] =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//_____------------_____[ 1 ]____ Deliveries IO Server __________---------__________

// let rooms = []; // [{}]

// Deliveries_IO_NS.on("connection", (socket) => {
//   let ROOM_ID;

//   socket.emit("connected"); // inform him then he sends his room_id

//   socket.on("room_id", (room_id) => {
//     ROOM_ID = room_id;
//     socket.join(room_id);
//   });

//   socket.on("disconnect", () => {
//     socket.leave(ROOM_ID);
//   });
// });

// function onDeliveryConnected(socket) {

//   socket.emit("connected");

//   socket.on("room_id", (room_id) => {
//     socket.joi

//   });

//   socket.on("disconnect",()=>{

//   });

// }

//_____------------_______________________________________________---------__________

//=-=-=-=-=--=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//####################################################################
// console.log(new Date());
// console.log(new Date().getUTCDate());
// let now = new Date();
// var nowDay = new Date (now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
// var nowDay = new Date().toISOString().split("T")[0];// today utc day
// console.log(nowDay);

// console.log("--------------------------------------");

// // let gotFromDb = ;
// let dbDay = new Date("2021-02-11T07:00:00.000+00:00").toISOString().split("T")[0];// 2021-02-11 utc day from db

// console.log(dbDay);
// console.log("=================================")
// console.log(nowDay > nowDay);
// console.log(dbDay > nowDay);
// console.log(dbDay >= nowDay);
// console.log(dbDay <= nowDay);

//-------------------------------------------------------------------

// let ordPs = {
//   سجاير: {
//     "marlboro_red.png": 2,
//     "lm_white.png": 1,
//   },

//   ولاعات: {
//     "djeep_red.png": 2,
//     "djeep_classic.png": 1,
//     "djeep_class.png": 5,
//   },
// };

// Object.keys(ordPs).forEach(function (key1) {
//   // console.log(key1 + " first")
//   // console.log(Object.keys(ordPs).length)

//   Object.keys(ordPs[key1]).forEach(function (key2) {

//     // console.log(key2)
//     // console.log(typeof(key2))
//     // console.log(ordPs[key1][key2])
//     // console.log(typeof(ordPs[key1][key2]))
//     // console.log(Object.keys(ordPs[key1]).length)

//   });
// });

// let x = "makmakma.png";
// console.log(typeof x);

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  arr.map() + promise.all() &&&&&&&&&&&&&&&&&&&&&&&&&&&&


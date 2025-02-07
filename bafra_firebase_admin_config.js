const admin = require("firebase-admin");
const serviceAccount = require("./bafra-24bea-531f241fecdf.json");

admin.initializeApp({credential : admin.credential.cert(serviceAccount)});
const messaging = admin.messaging();

module.exports = messaging;
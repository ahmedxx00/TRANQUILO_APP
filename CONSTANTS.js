const BASIC_AUTH_NAME = "vegasnerva";
const BASIC_AUTH_PASS = "@l#i$f%e";

// const mysql = require("mysql");

const crypto = require("crypto");
const encrypt_decrypt_key = "25lkoiy251lkojiu25lkoiy251lkojiu";
const encrypt_decrypt_iv = "25lkoiy251lkojiu";

//======== port ========
const PORT = 3000;
//======================

const encrypt = function encrypt(text) {
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    encrypt_decrypt_key,
    encrypt_decrypt_iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted.toString();
};

const decrypt = function decrypt(encryptedText) {
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    encrypt_decrypt_key,
    encrypt_decrypt_iv
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted.toString();
};

const timeOptions = {
  timeZone: "Africa/Cairo",
  hour12: true,
  hour: "numeric",
  minute: "numeric",
  seconds: "numeric",
};

const dateOptions = {
  timeZone: "Africa/Cairo",
  year: "numeric",
  month: "numeric",
  day: "2-digit",
};

const openTime = "16:00:00"; // not used
const closeTime = "22:00:00"; // not used

// const pool = mysql.createPool({
//     connectionLimit: 10,// by default 10
//     connectTimeout: 5000,
//     host: "localhost", // replace your HOST IP
//     user: "root",
//     password: "",
//     database: "firstdb"
//   });

//------------ generate registration codes -----------
const regCodeLength = 14;
const chars = "abcdefghkmnprtuvwxyz23456789#@$";
//---------------------------------------------------

const VONAGE_API_KEY = "fb40114c";
const VONAGE_API_SECRET = "ms9wKHJj8RbTEmoq";

const BAFRA_PAYMENT_METHODS = {
  WALLET: "WALLET",
  CRYPTO: "CRYPTO",
};

// module.exports
module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  timeOptions: timeOptions,
  dateOptions: dateOptions,
  openTime: openTime,
  closeTime: closeTime,
  BASIC_AUTH_NAME: BASIC_AUTH_NAME,
  BASIC_AUTH_PASS: BASIC_AUTH_PASS,

  BAFRA_PAYMENT_METHODS: BAFRA_PAYMENT_METHODS,

  regCodeLength: regCodeLength,
  chars: chars,

  VONAGE_API_KEY: VONAGE_API_KEY,
  VONAGE_API_SECRET: VONAGE_API_SECRET,
  PORT: PORT,
  // pool : pool
};

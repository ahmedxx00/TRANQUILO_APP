
const auth = require("basic-auth");
const compare = require("tsscmp");
const CONSTANTS = require("./CONSTANTS")

const check = (name, pass) => {
  let valid = true;
  // Simple method to prevent short-circuit and use timing-safe compare
  valid = compare(name,CONSTANTS.BASIC_AUTH_NAME) && valid;
  valid = compare(pass, CONSTANTS.BASIC_AUTH_PASS) && valid;
  return valid;
};

const basicAuth = (request, response, next) => {
  const credentials = auth(request);
  if (credentials && check(credentials.name, credentials.pass)) {
    return next();
  }
  return response.status(401).send("Error");
};

module.exports = basicAuth;

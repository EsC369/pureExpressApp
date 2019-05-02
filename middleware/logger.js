const moment = require("moment");

// // Creating middle ware: - Must have req, res, next: -------------
const logger = (req, res, next) => {
    // Show which exact route and directory that is being hit, while being time stamped:
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format()}`);
    next();
}
// //-----

module.exports = logger;
const path = require("path");

const ENV = process.env.NODE_ENV || "development";
const PATH = path.resolve(__dirname, "../.env." + ENV);

require("dotenv").config({ path: PATH });

console.log(`... found ${PATH}`);
console.log(`... setting up ${ENV} environment`);

module.exports = ENV;
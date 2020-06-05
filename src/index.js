console.log(`tinyTicket Server`);

const ENV = require("./environment");
const PORT = process.env.PORT || 8001;

const app = require("./application")(ENV);
const server = require("http").Server(app);

server.listen(PORT, () => {
  console.log(`... listening on port ${PORT}.`);
});
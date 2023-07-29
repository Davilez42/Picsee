const fs = require("fs/promises");
const { SERVER_CONFIG } = require("../../configs/config");
const logger = (req, res, next) => {
  const pet = ` IP: ${req.ip}  METHOD:${req.method}  ROUTE: ${req.url}`;
  const fecha = new Date().toISOString().split("T")[0];
  const hora = new Date().toLocaleTimeString().split(" ")[0];

  if (SERVER_CONFIG.Logger) {
    require("colors");
    fs.appendFile(
      `./logs/historyLogs_${fecha}.txt`,
      `- ${hora} - ${pet}\n`
    ).then((err) => {
      console.log(
        ` IP: ${req.ip.green}  METHOD:${req.method.red}  ROUTE: ${req.url.blue}`,
        "SAVE in log"
      );
    });
  } else {
    console.log(` IP: ${req.ip}  METHOD:${req.method}  ROUTE: ${req.url}`);
  }
  next();
};
module.exports = logger;

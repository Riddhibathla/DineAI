const { getMenu } = require("../controllers/menu.controller");

module.exports = [
  {
    method: "GET",
    path: "/api/menu",
    controller: getMenu,
  },
];

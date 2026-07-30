const { getDashboard } = require("../controllers/dashboard.controller");

module.exports = [
  {
    method: "GET",
    path: "/api/dashboard",
    controller: getDashboard,
  },
];

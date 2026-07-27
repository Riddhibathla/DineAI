const { getOperations } = require("../controllers/dashboard.controller");

module.exports = [
  {
    method: "GET",
    path: "/api/operations",
    controller: getOperations,
  },
];

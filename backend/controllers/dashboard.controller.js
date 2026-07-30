const { restaurant, orders, inventory, queue } = require("../data/demo-data");

function getDashboard() {
  return {
    restaurant,
    metrics: {
      tableTurnMinutes: 72,
      safePlateCompletion: 100,
      stockoutsAvoided: 8,
      activeOrders: orders.length,
      waitEstimateMinutes: restaurant.queueEstimate,
    },
    insights: [
      "Hearth station will peak at 7:45pm",
      "Miso glaze is the most disruptive ingredient",
      "Kitchen acknowledgements are at 100%",
    ],
  };
}

function getOperations() {
  return { orders, inventory, queue };
}

module.exports = { getDashboard, getOperations };

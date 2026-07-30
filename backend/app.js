const http = require("node:http");
const { URL } = require("node:url");
const dashboardRoutes = require("./routes/dashboard.routes");
const menuRoutes = require("./routes/menu.routes");
const operationsRoutes = require("./routes/operations.routes");

const PORT = Number(process.env.PORT || 4000);

const routeGroups = [dashboardRoutes, menuRoutes, operationsRoutes];

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  });
  res.end(body);
}

function handleRequest(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = routeGroups.flat().find((item) => item.method === req.method && item.path === url.pathname);

  if (!route) {
    sendJson(res, 404, { error: "Route not found" });
    return;
  }

  try {
    sendJson(res, 200, route.controller());
  } catch (error) {
    sendJson(res, 500, { error: error instanceof Error ? error.message : "Unexpected server error" });
  }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`DINE AI backend running at http://127.0.0.1:${PORT}`);
});

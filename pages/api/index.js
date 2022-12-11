export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const snakeInfo = {
    apiversion: "1",
    author: "Jay69", //Username for play.battlesnake
    color: "#006600",
    head: "tiger-king",
    tail: "tiger-tail",
  };

  res.json(snakeInfo);
}

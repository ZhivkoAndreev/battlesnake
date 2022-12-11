export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const snakeInfo = {
    apiversion: "1",
    author: "Jay", //Username for play.battlesnake
    color: "#006600",
    head: "default",
    tail: "default",
  };

  res.json(snakeInfo);
}
